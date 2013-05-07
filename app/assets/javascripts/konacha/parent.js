window.onload = function () {
  // The iframe order is undefined, so we make it predictable.
  mocha.suite.suites.sort(function (a, b) {
    return a.path.localeCompare(b.path);
  });

  // Check that all iframes loaded successfully.
  var iframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; ++i) {
    if (!iframes[i].contentWindow.mocha) {
      (function (path) {
        mocha.suite.addTest(new Mocha.Test(path, function () {
          throw new Error("Failed to load " + path + ".\n" +
                          "Perhaps it failed to compile? Check the rake output for errors.");
        }));
      })(iframes[i].getAttribute("data-path"));
    }
  }

  // function getRoot(suite) {
  //   if (suite.root) {
  //     return suite;
  //   }
  //   return getRoot(suite.parent);
  // }

  // mocha._reporter.prototype.suiteURL = function(suite) {
  //   return '/' + getRoot(suite).path + '?grep=' + encodeURIComponent(suite.fullTitle());
  // }

  // mocha._reporter.prototype.testURL = function(test) {
  //   return '/' + getRoot(test).path + '?grep=' + encodeURIComponent(test.fullTitle());
  // }

  mocha.run();
};
