var expect = require("expect.js")
  , List = require("../../list").List
;

describe("List#where", function() {
  it("detects all items by conditions", function() {
    var numbers = [
        {number: 1, odd: true}
      , {number: 2, odd: false}
      , {number: 3, odd: true}
      , {number: 4, odd: false}
    ];

    var list = List(numbers);

    expect(list.where({odd: true}).items).to.eql([numbers[0], numbers[2]]);
    expect(list.where({number: 4, odd: false}).items).to.eql([numbers[3]]);
    expect(list.where({number: 2}).first()).to.eql(numbers[1]);
  });
});
