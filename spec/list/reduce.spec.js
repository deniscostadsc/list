var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#reduce", function() {
  it("handles optional buffer", function() {
    var sum = List([1,2,3,4]).reduce(function(sum, number){
      return sum + number;
    });

    expect(sum).to.eql(10);
  });

  it("handles initial buffer", function() {
    var sum = List([1,2,3,4]).reduce(10, function(sum, number){
      return sum + number;
    });

    expect(sum).to.eql(20);
  });
});
