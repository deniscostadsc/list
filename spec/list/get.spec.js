var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#get", function() {
  it("returns item at given index", function() {
    var list = List([1,2,3]);

    expect(list.get(2)).to.eql(3);
  });
});
