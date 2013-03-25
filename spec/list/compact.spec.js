var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#compact", function() {
  it("filters out null and undefined elements", function() {
    var result = List([1,2,null,3,undefined,4]).compact();
    expect(result.items).to.eql([1,2,3,4]);
  });
});
