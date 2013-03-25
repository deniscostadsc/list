var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#reject", function() {
  it("filters out based on criteria", function() {
    var result = List([1,2,3,4]).reject(function(number){
      return number % 2 == 1;
    });

    expect(result.items).to.eql([2,4]);
  });

  it("defines alias", function() {
    expect(List.fn.filter).to.eql(List.fn.reject);
  });
});
