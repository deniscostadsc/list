var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#any", function() {
  it("returns true when at least one condition is met", function() {
    var result = list([1,2,3]).any(function(item){
      return item % 2 == 0;
    });

    expect(result).to.eql(true);
  });

  it("returns false when have no matches", function() {
    var result = list([1,2,3]).any(function(item){
      return item == 4;
    });

    expect(result).to.eql(false);
  });

  it("defines alias", function() {
    expect(list.fn.some).to.eql(list.fn.any);
  });
});
