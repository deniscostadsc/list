var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#reverse", function() {
  it("reverses list", function() {
    var result = list([1,2,3]).reverse();
    expect(result.items).to.eql([3,2,1]);
  });
});
