var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#includes", function() {
  it("returns true when includes item", function() {
    var result = list([1,2,3]).includes(2);
    expect(result).to.eql(true);
  });

  it("returns false when doesn't include item", function() {
    var result = list([1,2,3]).includes(4);
    expect(result).to.eql(false);
  });

  it("defines alias", function() {
    expect(list.fn.includes).to.eql(list.fn.contains);
  });
});
