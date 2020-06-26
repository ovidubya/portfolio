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
