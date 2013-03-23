var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#all", function() {
  it("detects all items", function() {
    var result = list([1,2,3,4]).all(function(number){
      return number > 0;
    });

    expect(result).to.eql(true);
  });

  it("doesn't detect all items", function() {
    var result = list([1,2,3,4,5]).all(function(number){
      return number < 5;
    });

    expect(result).to.eql(false);
  });

  it("defines alias", function() {
    expect(list.fn.filter).to.eql(list.fn.reject);
  });
});
