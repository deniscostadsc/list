var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#sort", function() {
  it("sorts items", function() {
    var result = list([3,2,1]).sort();
    expect(result.items).to.eql([1,2,3]);
  });

  it("sorts items by attribute", function() {
    var users = list([
      {name: "paul"},
      {name: "mary"},
      {name: "john"}
    ]);

    var result = users.sort("name");

    expect(result.items[0]).to.eql({name: "john"});
    expect(result.items[1]).to.eql({name: "mary"});
    expect(result.items[2]).to.eql({name: "paul"});
  });

  it("sorts items by function", function() {
    var result = list([1,2,3,4,5,6]).sort(function(left, right){
      if (left % 2 == 1 && right % 2 == 1) { return left > right ? 1 : -1; }
      if (left % 2 == 0 && right % 2 == 0) { return left > right ? 1 : -1; }
      if (left % 2 == 1) { return -1; }

      return 1;
    });

    expect(result.items).to.eql([1,3,5,2,4,6]);
  });
});
