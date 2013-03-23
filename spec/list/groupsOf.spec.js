var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#groupsOf", function() {
  it("returns groups of 3", function() {
    var result = list([1,2,3,4,5]).groupsOf(2);

    expect(result.items[0].items).to.eql([1,2]);
    expect(result.items[1].items).to.eql([3,4]);
    expect(result.items[2].items).to.eql([5]);
  });

  it("returns groups with fill", function() {
    var result = list([1,2,3,4]).groupsOf(3, "*");

    expect(result.items[0].items).to.eql([1,2,3]);
    expect(result.items[1].items).to.eql([4,"*","*"]);
  });
});
