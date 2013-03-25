var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#uniq", function() {
  it("returns unique items", function() {
    var result = List([1,2,1,1,2,3]).uniq();
    expect(result.items).to.eql([1,2,3]);
  });

  it("filters unique items by function", function() {
    var people = [
        {name: "john", id: 1}
      , {name: "mary", id: 2}
      , {name: "mary", id: 3}
      , {name: "john", id: 4}
    ];

    var result = List(people).uniq(function(person){
      return person.name;
    });

    expect(result.items).to.eql([people[0], people[1]]);
  });

  it("defines alias", function() {
    expect(List.fn.unique).to.eql(List.fn.uniq);
  });
});
