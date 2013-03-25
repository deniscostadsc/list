var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#reverse", function() {
  it("reverses list", function() {
    var result = List([1,2,3]).reverse();
    expect(result.items).to.eql([3,2,1]);
  });
});
