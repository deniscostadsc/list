module.exports = function(grunt) {
  var config = {};

  config.jshint = {
      all: ["list.js"]

    , options: {
          laxcomma: true
        , maxdepth: 4
        , maxcomplexity: 4
      }
  };

  config.uglify = {};

  config.uglify["list"] = {
    files: {
      "list.min.js": ["list.js"]
    }
  };

  config.docco = {
    debug: {
      src: ["list.js"],
      options: {output: "docs/"}
    }
  };

  grunt.initConfig(config);

  grunt.registerTask("test", "run mocha", function () {
    var done = this.async();
    require("child_process").exec("npm test", function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-docco");
  grunt.registerTask("default", ["test", "jshint", "uglify", "docco"]);
};
