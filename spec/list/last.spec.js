var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#last", function() {
  it("returns last item", function() {
    var result = List([1,2,3,4]).last();

    expect(result).to.eql(4);
  });

  it("returns last two items", function() {
    var result = List([1,2,3,4]).last(2);

    expect(result.items).to.eql([3,4]);
  });
});
