var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#fill", function() {
  it("fills items", function() {
    var result = list().fill(3, "*");

    expect(result.items).to.eql(["*", "*", "*"]);
  });
});
