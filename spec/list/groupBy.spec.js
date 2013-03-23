var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#groupBy", function() {
  it("groups by attribute", function() {
    var projects = [
        {tag: "javascript", name: "jQuery"}
      , {tag: "ruby", name: "Rails"}
      , {tag: "python", name: "Django"}
      , {tag: "javascript", name: "Node.js"}
    ];

    var result = list(projects).groupBy("tag");

    expect(result.javascript.items).to.eql([projects[0], projects[3]]);
  });

  it("groups by function", function() {
    var result = list([1,2,3,4,5,6]).groupBy(function(number){
      return number % 2 == 0 ? "even" : "odd";
    });

    expect(result.odd.items).to.eql([1,3,5]);
    expect(result.even.items).to.eql([2,4,6]);
  });
});
