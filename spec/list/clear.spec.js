var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#clear", function() {
  it("removes all items", function() {
    var list = List([1,2,3]);
    var items = list.items;

    expect(list.clear()).to.be.a(List);
    expect(list.items === items).to.eql(true);
    expect(list.length).to.eql(0);
  });
});
