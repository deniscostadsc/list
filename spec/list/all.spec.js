var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#all", function() {
  it("detects all items", function() {
    var result = List([1,2,3,4]).all(function(number){
      return number > 0;
    });

    expect(result).to.eql(true);
  });

  it("doesn't detect all items", function() {
    var result = List([1,2,3,4,5]).all(function(number){
      return number < 5;
    });

    expect(result).to.eql(false);
  });

  it("defines alias", function() {
    expect(List.fn.filter).to.eql(List.fn.reject);
  });
});
