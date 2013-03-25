;(function(context){
  "use strict";
  // list.js
  // ======================================================
  //
  // The list.js library allows you to work os lists, with chainable functions.
  //
  // You can initialize a new List with or without the `new` keyword.
  //
  //     var list = List([1,2,3,4]);
  //     var list = new List([1,2,3,4]);
  //
  function List(items) {
    var self = this;
    items = items || [];

    if (self instanceof List === false) {
      self = new List(items);
    }

    self.items = items instanceof List ? items.items : items;
    self.length = items.length;

    return self;
  }

  List.fn = List.prototype;
  List.fn.length = 0;
  List.fn.items = [];

  // Stop loops.
  var stop = {};

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
    return new List(collection).map(function(item){
      return item instanceof List ? item.items : item;
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

  // List#uniq
  // ------------------------------------------------------
  //
  List.fn.uniq = function(criteria) {
    var seen = new List();

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

  List.fn.unique = List.fn.uniq;

  // List#includes
  // ------------------------------------------------------
  //
  List.fn.includes = function(item) {
    if (this.items.indexOf) {
      return this.items.indexOf(item) != -1;
    }

    return this.any(function(object){
      return object === item;
    });
  };

  List.fn.contains = List.fn.includes;

  // List#any
  // ------------------------------------------------------
  //
  List.fn.any = function(criteria) {
    var result = false;

    this.each(function(item, index){
      result = criteria(item, index);

      if (result) {
        return stop;
      }
    });

    return !!result;
  };

  List.fn.some = List.fn.any;

  // List#all
  // ------------------------------------------------------
  //
  List.fn.all = function(criteria) {
    return this.select(criteria).length === this.length;
  };

  List.fn.every = List.fn.all;

  // List#countBy
  // ------------------------------------------------------
  //
  List.fn.countBy = function(criteria) {
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

  // List#first
  // ------------------------------------------------------
  //
  // Return the list's first item.
  //
  //     List([1,2,3]).first();
  //     //=> 1
  //
  //     List([1,2,3]).first(2);
  //     //=> List([1,2])
  //
  List.fn.first = function(quantity) {
    return quantity ? this.slice(0, quantity) : this.items[0];
  };

  // List#last
  // ------------------------------------------------------
  //
  // Return the list's last item.
  //
  //     List([1,2,3]).last();
  //     //=> 3
  //
  //     List([1,2,3]).last(2);
  //     //=> List([2,3])
  //
  List.fn.last = function(quantity) {
    return quantity ? this.slice(-quantity) : this.items[this.length - 1];
  };

  // List#slice
  // ------------------------------------------------------
  //
  List.fn.slice = function(index, ending) {
    return new List(this.items.slice(index, ending));
  };

  // List#compact
  // ------------------------------------------------------
  //
  // Filter out `null` or `undefined` elements.
  //
  List.fn.compact = function() {
    return this.reject(function(item){
      return item === undefined || item === null;
    });
  };

  // List#reject
  // ------------------------------------------------------
  //
  List.fn.reject = function(criteria) {
    return this.select(function(item, index){
      return !criteria(item, index);
    });
  };

  List.fn.filter = List.fn.reject;

  // List#select
  // ------------------------------------------------------
  //
  List.fn.select = function(criteria) {
    return this.reduce(new List(), function(buffer, item, index){
      if (criteria(item, index)) {
        buffer.push(item);
      }

      return buffer;
    });
  };

  // List#find
  // ------------------------------------------------------
  //
  List.fn.find = function(criteria) {
    var result;

    this.any(function(item, index){
      result = item;

      if (criteria(item, index)) {
        return stop;
      }
    });

    return result;
  };

  // List#reduce
  // ------------------------------------------------------
  //
  List.fn.reduce = function(buffer, iterator) {
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

  // List#each
  // ------------------------------------------------------
  //
  List.fn.each = function(iterator) {
    var result;

    for (var index = 0; index < this.length; index++) {
      result = iterator(this.items[index], index);

      if (result === stop) {
        break;
      }
    }

    return this;
  };

  // List#map
  // ------------------------------------------------------
  //
  List.fn.map = function(iterator) {
    var attr;

    if (typeof(iterator) != "function") {
      attr = iterator;
      iterator = function(item) {
        return invoke(item, attr);
      };
    }

    return this.reduce(new List(), function(buffer, item, index){
      buffer.push(iterator(item, index));
      return buffer;
    });
  };

  // List#concat
  // ------------------------------------------------------
  //
  List.fn.concat = function() {
    this.items = this.items.concat.apply(this.items, mapLists(arguments));
    this.length = this.items.length;
    return this;
  };

  // List#push
  // ------------------------------------------------------
  //
  List.fn.push = function() {
    return stack(this, "push", arguments);
  };

  // List#pop
  // ------------------------------------------------------
  //
  List.fn.pop = function() {
    return stack(this, "pop", arguments);
  };

  // List#unshift
  // ------------------------------------------------------
  //
  List.fn.unshift = function() {
    return stack(this, "unshift", arguments);
  };

  // List#shift
  // ------------------------------------------------------
  //
  List.fn.shift = function() {
    return stack(this, "shift", arguments);
  };

  // List#sort
  // ------------------------------------------------------
  //
  List.fn.sort = function(sorter) {
    var sortable;

    if (sorter === undefined) {
      return new List(this.items.sort());
    } else if (typeof(sorter) == "function") {
      return new List(this.items.sort(sorter));
    }

    sortable = this.map(function(item, index){
      return {item: item, index: index, value: invoke(item, sorter)};
    });

    sortable.sort(sorting);

    return sortable.map("item");
  };

  // List#reverse
  // ------------------------------------------------------
  //
  List.fn.reverse = function() {
    return this.reduce(new List(), function(buffer, item){
      buffer.unshift(item);
      return buffer;
    });
  };

  // List#groupBy
  // ------------------------------------------------------
  //
  List.fn.groupBy = function(criteria) {
    var attr;

    if (typeof(criteria) != "function") {
      attr = criteria;

      criteria = function(item, index) {
        return invoke(item, attr);
      };
    }

    return this.reduce({}, function(buffer, item, index){
      var key = criteria(item, index);
      buffer[key] = buffer[key] || new List();
      buffer[key].push(item);

      return buffer;
    });
  };

  // List#groupsOf
  // ------------------------------------------------------
  //
  List.fn.groupsOf = function(number, fill) {
    var index = 0
      , result = new List()
      , fillItems = []
      , slice
    ;

    if (fill !== undefined) {
      fillItems = new List().fill(number, fill);
    }

    while (index < this.length) {
      slice = this.slice(index, index + number);
      result.push(slice.concat(fillItems).first(number));
      index = Math.min(index + number, this.length);
    }

    return result;
  };

  // List#fill
  // ------------------------------------------------------
  //
  List.fn.fill = function(number, fill) {
    return new List(new Array(number)).map(function(){
      return fill;
    });
  };

  // List#shuffle
  // ------------------------------------------------------
  //
  // Shuffle the array using the [Fisher-Yates](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm) algorithm.
  //
  List.fn.shuffle = function() {
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

  // List#sample
  // ------------------------------------------------------
  //
  //     List([1,2,3]).sample();
  //     //=> 3
  //
  //     List([1,2,3]).sample(1);
  //     //=> List([3])
  //
  //     List([1,2,3]).sample(2);
  //     //=> List([1,3])
  //
  List.fn.sample = function(quantity) {
    var shuffle = this.shuffle();

    if (!quantity) {
      return shuffle.first();
    } else {
      return shuffle.first(quantity);
    }
  };

  // List#where
  // ------------------------------------------------------
  //
  List.fn.where = function(conditions) {
    return this.select(function(item){
      for (var name in conditions) {
        if (conditions[name] !== item[name]) {
          return false;
        }
      }

      return true;
    });
  };

  // List#clear
  // ------------------------------------------------------
  //
  List.fn.clear = function() {
    this.items.length = 0;
    this.length = 0;
    return this;
  };

  // List#get
  // ------------------------------------------------------
  //
  List.fn.get = function(index) {
    return this.items[index];
  };

  // List#set
  // ------------------------------------------------------
  //
  List.fn.set = function(index, value) {
    this.items[index] = value;
    return this;
  };

  // Expose the list function to the world!
  context.List = List;
})(typeof(exports) === "undefined" ? this : exports);
