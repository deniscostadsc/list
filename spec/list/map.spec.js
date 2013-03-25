var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#map", function() {
  it("returns mapped list", function() {
    var result = List([1,2,3]).map(function(number, index){
      return [index, number];
    });

    expect(result.items).to.eql([[0,1], [1,2], [2,3]]);
  });

  it("returns mapped list from attribute", function() {
    var result = List([{name: "john"}, {name: "mary"}]).map("name");
    expect(result.items).to.eql(["john", "mary"]);
  });

  it("returns mapped list from method", function() {
    var users = [
        {name: function(){ return "john"; }}
      , {name: function(){ return "mary"; }}
    ];
    var result = List(users).map("name");
    expect(result.items).to.eql(["john", "mary"]);
  });
});
