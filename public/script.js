// GA
(function (w) {
  w.gaIdentifer =
    w.location.href.indexOf("qa") > -1 ||
    w.location.href.indexOf("localhost") > -1
      ? { ga: "UA-170794679-1", gtm: "GTM-MPXHPN4" }
      : { ga: "UA-170761872-1", gtm: "GTM-NLV4BVR" };
  w.ga =
    w.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga("create", w.gaIdentifer.ga, "auto");
  ga("send", "pageview");
  w.gaa = function (category, action, label) {
    ga("send", "event", category, action, label);
  };
})(window);

// GTM
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", window.gaIdentifer.gtm);
