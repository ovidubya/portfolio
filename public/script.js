// GA
(function (w) {
  w.gaIdentifer =
    w.location.href.indexOf("qa") > -1 ||
    w.location.href.indexOf("localhost") > -1
      ? "UA-170794679-1"
      : "UA-170761872-1";
  w.ga =
    w.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga("create", w.gaIdentifer, "auto");
  ga("send", "pageview");
  w.gaa = function (category, action, label) {
    ga("send", "event", category, action, label);
  };
})(window);

(function (w) {
  function sendToSlack(text) {
    return fetch(
      "https://hooks.slack.com/services/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",
      {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          text: text,
        }),
      }
    )
      .then((data) => data.text())
      .then((result) => result);
  }

  w.addEventListener("load", function () {
    var paintEntries = window.performance.getEntriesByName("first-paint");
    if (paintEntries && paintEntries.length > 0) {
      sendToSlack(`First paint is: ${paintEntries[0].startTime.toFixed(0)}ms`);
    }
  });
})(window);
