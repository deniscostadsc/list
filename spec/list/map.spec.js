var expect = require("expect.js")
  , list = require("../../list").list
;

describe("list#map", function() {
  it("returns mapped list", function() {
    var result = list([1,2,3]).map(function(number, index){
      return [index, number];
    });

    expect(result.items).to.eql([[0,1], [1,2], [2,3]]);
  });

  it("returns mapped list from attribute", function() {
    var result = list([{name: "john"}, {name: "mary"}]).map("name");
    expect(result.items).to.eql(["john", "mary"]);
  });

  it("returns mapped list from method", function() {
    var users = [
        {name: function(){ return "john"; }}
      , {name: function(){ return "mary"; }}
    ];
    var result = list(users).map("name");
    expect(result.items).to.eql(["john", "mary"]);
  });
});
