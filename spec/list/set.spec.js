var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#set", function() {
  it("sets item at given index", function() {
    var list = List([1,2,3]);

    expect(list.set(3, 4)).to.eql(list);
    expect(list.get(3)).to.eql(4);
  });
});
