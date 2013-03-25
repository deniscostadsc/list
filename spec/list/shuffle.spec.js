var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#shuffle", function() {
  it("returns the same items", function() {
    var result = List([1,2,3,4]).shuffle();

    expect(result.contains(1)).to.eql(true);
    expect(result.contains(2)).to.eql(true);
    expect(result.contains(3)).to.eql(true);
    expect(result.contains(4)).to.eql(true);
  });
});
