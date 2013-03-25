var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#first", function() {
  it("returns first item", function() {
    var result = List([1,2,3,4]).first();

    expect(result).to.eql(1);
  });

  it("returns first two items", function() {
    var result = List([1,2,3,4]).first(2);

    expect(result.items).to.eql([1,2]);
  });
});
