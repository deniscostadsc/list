var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#includes", function() {
  it("returns true when includes item", function() {
    var result = List([1,2,3]).includes(2);
    expect(result).to.eql(true);
  });

  it("returns false when doesn't include item", function() {
    var result = List([1,2,3]).includes(4);
    expect(result).to.eql(false);
  });

  it("defines alias", function() {
    expect(List.fn.includes).to.eql(List.fn.contains);
  });
});
