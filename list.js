;(function(context){
  // list.js
  // ======================================================
  //
  // The list.js library allows you to work os lists, with chainable functions.
  //
  function list(items) {
    var self = this;
    items = items || [];

    if (self instanceof list === false) {
      self = new list(items);
    }

    self.items = items;
    self.length = items.length;

    return self;
  }

  list.fn = list.prototype;

  // Proxies the specified function to the target.
  var proxy = function(target, func, args) {
    return target[func].apply(target, args);
  };

  // Apply stack operation to the target, updating length accordingly.
  var stack = function(target, operation, args) {
    var result = proxy(target.items, operation, args);
    target.length = target.items.length;
    return result;
  };

  // Execute the function or return the attribute value.
  var invoke = function(target, attr) {
    var value = target[attr];
    return (typeof(value) == "function" ? value() : value);
  };

  // Map lists, returning the items.
  var mapLists = function(collection) {
    return list(collection).map(function(item){
      return item instanceof list ? item.items : item;
    }).items;
  };

  // Set the default sorting function.
  var sorting = function(left, right){
    var a = left.value;
    var b = right.value;

    if (a !== b) {
      if (a > b || a === void 0) { return 1; }
      if (a < b || b === void 0) { return -1; }
    }

    return left.index < right.index ? -1 : 1;
  };

  // list#uniq
  // ------------------------------------------------------
  //
  list.fn.uniq = function(criteria) {
    var seen = list([]);

    if (!criteria) {
      criteria = function(item) {
        return item;
      };
    }

    return this.select(function(item, index){
      var value = criteria(item, index);

      if (seen.includes(value)) {
        return false;
      } else {
        seen.push(value);
        return true;
      }
    });
  };

  list.fn.unique = list.fn.uniq;

  // list#includes
  // ------------------------------------------------------
  //
  list.fn.includes = function(item) {
    if (this.items.indexOf) {
      return this.items.indexOf(item) != -1;
    }

    return this.any(function(object){
      return object === item;
    });
  };

  list.fn.contains = list.fn.includes;

  // list#any
  // ------------------------------------------------------
  //
  list.fn.any = function(criteria) {
    return this.select(criteria).length > 0;
  };

  list.fn.some = list.fn.any;

  // list#all
  // ------------------------------------------------------
  //
  list.fn.all = function(criteria) {
    return this.select(criteria).length === this.length;
  };

  list.fn.every = list.fn.all;

  // list#countBy
  // ------------------------------------------------------
  //
  list.fn.countBy = function(criteria) {
    var attr;

    if (typeof(criteria) != "function") {
      attr = criteria;

      criteria = function(item) {
        return invoke(item, attr);
      };
    }

    return this.reduce({}, function(buffer, item, index){
      var key = criteria(item, index);
      buffer[key] = buffer[key] || 0;
      buffer[key] += 1;

      return buffer;
    });
  };

  // list#first
  // ------------------------------------------------------
  //
  // Return the list's first item.
  //
  //     list([1,2,3]).first();
  //     //=> 1
  //
  //     list([1,2,3]).first(2);
  //     //=> [1,2]
  //
  list.fn.first = function(quantity) {
    return quantity ? this.slice(0, quantity) : this.items[0];
  };

  // list#last
  // ------------------------------------------------------
  //
  // Return the list's last item.
  //
  //     list([1,2,3]).last();
  //     //=> 3
  //
  //     list([1,2,3]).last(2);
  //     //=> [2,3]
  //
  list.fn.last = function(quantity) {
    return quantity ? this.slice(-quantity) : this.items[this.length - 1];
  };

  // list#slice
  // ------------------------------------------------------
  //
  //
  list.fn.slice = function(index, ending) {
    return list(this.items.slice(index, ending));
  };

  // list#compact
  // ------------------------------------------------------
  //
  // Filter out `null` or `undefined` elements.
  //
  list.fn.compact = function() {
    return this.reject(function(item){
      return item === undefined || item === null;
    });
  };

  // list#reject
  // ------------------------------------------------------
  //
  list.fn.reject = function(criteria) {
    return this.select(function(item, index){
      return !criteria(item, index);
    });
  };

  list.fn.filter = list.fn.reject;

  // list#select
  // ------------------------------------------------------
  //
  list.fn.select = function(criteria) {
    return this.reduce(list([]), function(buffer, item, index){
      if (criteria(item, index)) {
        buffer.push(item);
      }

      return buffer;
    });
  };

  // list#reduce
  // ------------------------------------------------------
  //
  list.fn.reduce = function(buffer, iterator) {
    var collection = this;

    if (typeof(buffer) == "function") {
      collection = this.slice(1);
      iterator = buffer;
      buffer = this.first();
    }

    collection.each(function(item, index){
      buffer = iterator(buffer, item, index);
    });

    return buffer;
  };

  // list#each
  // ------------------------------------------------------
  //
  list.fn.each = function(iterator) {
    for (var index = 0; index < this.length; index++) {
      iterator(this.items[index], index);
    }

    return this;
  };

  // list#map
  // ------------------------------------------------------
  //
  list.fn.map = function(iterator) {
    var attr;

    if (typeof(iterator) != "function") {
      attr = iterator;
      iterator = function(item) {
        return invoke(item, attr);
      };
    }

    return this.reduce(list([]), function(buffer, item, index){
      buffer.push(iterator(item, index));
      return buffer;
    });
  };

  // list#concat
  // ------------------------------------------------------
  //
  list.fn.concat = function() {
    this.items = this.items.concat.apply(this.items, mapLists(arguments));
    this.length = this.items.length;
    return this;
  };

  // list#push
  // ------------------------------------------------------
  //
  list.fn.push = function() {
    return stack(this, "push", arguments);
  };

  // list#pop
  // ------------------------------------------------------
  //
  list.fn.pop = function() {
    return stack(this, "pop", arguments);
  };

  // list#unshift
  // ------------------------------------------------------
  //
  list.fn.unshift = function() {
    return stack(this, "unshift", arguments);
  };

  // list#shift
  // ------------------------------------------------------
  //
  list.fn.shift = function() {
    return stack(this, "shift", arguments);
  };

  // list#sort
  // ------------------------------------------------------
  //
  list.fn.sort = function(sorter) {
    var sortable;

    if (sorter === undefined) {
      return list(this.items.sort());
    } else if (typeof(sorter) == "function") {
      return list(this.items.sort(sorter));
    }

    sortable = this.map(function(item, index){
      return {item: item, index: index, value: invoke(item, sorter)};
    });

    sortable.sort(sorting);

    return sortable.map("item");
  };

  // list#reverse
  // ------------------------------------------------------
  //
  list.fn.reverse = function() {
    return this.reduce(list([]), function(buffer, item){
      buffer.unshift(item);
      return buffer;
    });
  };

  // list#groupBy
  // ------------------------------------------------------
  //
  list.fn.groupBy = function(criteria) {
    var attr;

    if (typeof(criteria) != "function") {
      attr = criteria;

      criteria = function(item, index) {
        return invoke(item, attr);
      };
    }

    return this.reduce({}, function(buffer, item, index){
      var key = criteria(item, index);
      buffer[key] = buffer[key] || list([]);
      buffer[key].push(item);

      return buffer;
    });
  };

  // list#groupsOf
  // ------------------------------------------------------
  //
  list.fn.groupsOf = function(number, fill) {
    var index = 0
      , result = list([])
      , fillItems = []
      , slice
    ;

    if (fill !== undefined) {
      fillItems = list().fill(number, fill);
    }

    while (index < this.length) {
      slice = this.slice(index, index + number);
      result.push(slice.concat(fillItems).first(number));
      index = Math.min(index + number, this.length);
    }

    return result;
  };

  // list#fill
  // ------------------------------------------------------
  //
  list.fn.fill = function(number, fill) {
    return list(Array(number)).map(function(){
      return fill;
    });
  };

  // list#shuffle
  // ------------------------------------------------------
  //
  // Shuffle the array using the [Fisher-Yates](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm) algorithm.
  //
  list.fn.shuffle = function() {
    var index, temp;
    var shuffle = this.slice();

    for (var i = shuffle.length - 1; i > 0; i--) {
      index = Math.floor(Math.random() * (i + 1));
      temp = shuffle.items[i];
      shuffle.items[i] = shuffle.items[index];
      shuffle.items[index] = temp;
    }

    return shuffle;
  };

  // list#sample
  // ------------------------------------------------------
  //
  list.fn.sample = function(quantity) {
    var shuffle = this.shuffle();

    if (!quantity) {
      return shuffle.first();
    } else {
      return shuffle.first(quantity);
    }
  };

  // Expose the list function to the world!
  context.list = list;
})(typeof(exports) === "undefined" ? this : exports);
