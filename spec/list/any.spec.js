var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#any", function() {
  it("returns true when at least one condition is met", function() {
    var result = List([1,2,3]).any(function(item){
      return item % 2 == 0;
    });

    expect(result).to.eql(true);
  });

  it("returns false when have no matches", function() {
    var result = List([1,2,3]).any(function(item){
      return item == 4;
    });

    expect(result).to.eql(false);
  });

  it("defines alias", function() {
    expect(List.fn.some).to.eql(List.fn.any);
  });
});
