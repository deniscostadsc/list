var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#concat", function() {
  it("concats array", function() {
    var result = list([1,2,3]).concat([4,5,6]);
    expect(result.items).to.eql([1,2,3,4,5,6]);
  });

  it("concats list", function() {
    var result = list([1,2,3]).concat(list([4,5,6]));
    expect(result.items).to.eql([1,2,3,4,5,6]);
  });

  it("concats multiple collections", function() {
    var result = list([1,2,3]).concat(list([4]), [5]);
    expect(result.items).to.eql([1,2,3,4,5]);
  });
});
