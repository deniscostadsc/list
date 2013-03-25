var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#sample", function() {
  it("returns the item", function() {
    var result = list([1,2,3,4]).sample();
    expect(result).to.be.a("number");
  });

  it("returns one-item array", function() {
    var result = list([1,2,3,4]).sample(1);

    expect(result).to.be.a(list);
    expect(result.length).to.eql(1);
  });

  it("returns two-items array", function() {
    var result = list([1,2,3,4]).sample(2);

    expect(result).to.be.a(list);
    expect(result.length).to.eql(2);
  });
});
