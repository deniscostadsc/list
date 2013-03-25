var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#concat", function() {
  it("concats array", function() {
    var result = List([1,2,3]).concat([4,5,6]);
    expect(result.items).to.eql([1,2,3,4,5,6]);
  });

  it("concats list", function() {
    var result = List([1,2,3]).concat(List([4,5,6]));
    expect(result.items).to.eql([1,2,3,4,5,6]);
  });

  it("concats multiple collections", function() {
    var result = List([1,2,3]).concat(List([4]), [5]);
    expect(result.items).to.eql([1,2,3,4,5]);
  });
});
