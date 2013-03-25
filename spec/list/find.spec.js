var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#find", function() {
  it("detects first item", function() {
    var result = List([1,2,3,4]).find(function(number){
      return number % 2 == 0;
    });

    expect(result).to.eql(2);
  });
});
