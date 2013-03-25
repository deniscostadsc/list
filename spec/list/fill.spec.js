var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#fill", function() {
  it("fills items", function() {
    var result = List().fill(3, "*");

    expect(result.items).to.eql(["*", "*", "*"]);
  });
});
