var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#countBy", function() {
  it("counts items by function", function() {
    var result = list([1,2,3,4,5]).countBy(function(number){
      return number % 2 == 0 ? "even" : "odd";
    });

    expect(result).to.eql({odd: 3, even: 2});
  });

  it("counts items by attribute", function() {
    var tags = [
        {tag: "javascript"}
      , {tag: "ruby"}
      , {tag: "javascript"}
      , {tag: "javascript"}
      , {tag: "python"}
      , {tag: "ruby"}
    ];

    var result = list(tags).countBy("tag");

    expect(result).to.eql({javascript: 3, ruby: 2, python: 1});
  });
});
