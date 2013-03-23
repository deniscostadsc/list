var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#uniq", function() {
  it("returns unique items", function() {
    var result = list([1,2,1,1,2,3]).uniq();
    expect(result.items).to.eql([1,2,3]);
  });

  it("filters unique items by function", function() {
    var people = [
        {name: "john", id: 1}
      , {name: "mary", id: 2}
      , {name: "mary", id: 3}
      , {name: "john", id: 4}
    ];

    var result = list(people).uniq(function(person){
      return person.name;
    });

    expect(result.items).to.eql([people[0], people[1]]);
  });

  it("defines alias", function() {
    expect(list.fn.unique).to.eql(list.fn.uniq);
  });
});
