var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#select", function() {
  it("selects items based on criteria", function() {
    var result = list([1,2,3,4]).select(function(number){
      return number % 2 == 0;
    });

    expect(result.items).to.eql([2,4]);
  });
});
