var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#reject", function() {
  it("filters out based on criteria", function() {
    var result = list([1,2,3,4]).reject(function(number){
      return number % 2 == 1;
    });

    expect(result.items).to.eql([2,4]);
  });

  it("defines alias", function() {
    expect(list.fn.filter).to.eql(list.fn.reject);
  });
});
