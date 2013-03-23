var expect = require("expect.js")
  , sinon = require("sinon")
  , list = require("../../list").list
;

describe("list#each", function() {
  var callback;

  beforeEach(function() {
    callback = sinon.spy()
  });

  it("iterates each items", function() {
    var sum = list(["a", "b", "c"]).each(callback);

    expect(callback.args[0]).to.eql(["a", 0]);
    expect(callback.args[1]).to.eql(["b", 1]);
    expect(callback.args[2]).to.eql(["c", 2]);
  });

  it("returns self", function() {
    var numbers = list([1,2,3]);
    var result = numbers.each(callback)

    expect(result).to.eql(numbers);
  });
});
