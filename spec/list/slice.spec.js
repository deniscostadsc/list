var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#slice", function() {
  it("returns all items from given index", function() {
    var result = list([1,2,3,4]).slice(2);

    expect(result).to.be.a(list);
    expect(result.items).to.eql([3,4]);
  });

  it("returns items from starting to ending index", function() {
    var result = list([1,2,3,4]).slice(2,3);

    expect(result).to.be.a(list);
    expect(result.items).to.eql([3]);
  });

  it("returns items for default arguments", function() {
    var result = list([1,2,3,4]).slice();

    expect(result).to.be.a(list);
    expect(result.items).to.eql([1,2,3,4]);
  });
});
