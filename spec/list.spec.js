var expect = require("expect.js")
  , List = require("../list").List
;

describe("List", function() {
  it("initializes list without new keyword", function() {
    var list = List([1,2,3]);

    expect(list).to.be.a(List);
    expect(list.items).to.eql([1,2,3]);
  });

  it("initializes list with new keyword", function() {
    var list = new List([1,2,3]);

    expect(list).to.be.a(List);
    expect(list.items).to.eql([1,2,3]);
  });

  it("initializes list with a list as argument", function() {
    var list = List(List([1,2,3]));

    expect(list).to.be.a(List);
    expect(list.items).not.to.be.a(List);
    expect(list.items).to.eql([1,2,3]);
  });
});
