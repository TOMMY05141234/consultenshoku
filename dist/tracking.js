/* 計測設定（下層ページ用）。トップページ（index.html）には同じ内容がインラインで入っています。
   GA4とClarityのIDは、プロパティ／プロジェクトを作成したら入れてください。空の項目は読み込まれず、何も送信されません。 */
(function () {
  "use strict";

  var CONFIG = {
    awId: "AW-18146496318",  // Google広告のGoogleタグID
    ga4Id: "",               // GA4の測定ID（G-XXXXXXXXXX）
    clarityId: ""            // Microsoft ClarityのプロジェクトID
  };

  // A8リンクの a8mat 先頭部分で広告主を判別し、Google広告のクリックコンバージョンを送る。
  // MyVisionは、トップのリンク（2CJQ2Y）と下層ページのリンク（2CJLGA）で番号が違うため、どちらも同じ「MyVision」に割り当てている。
  var CONVERSIONS = [
    { match: "2CJQ2Y", sendTo: "AW-18146496318/8u1ZCLrp7LwdEL6e9sxD" }, // MyVision（トップ）
    { match: "2CJLGA", sendTo: "AW-18146496318/8u1ZCLrp7LwdEL6e9sxD" }, // MyVision（下層ページ）
    { match: "7Q1LOQ", sendTo: "AW-18146496318/I0C_CL3p7LwdEL6e9sxD" }, // ASSIGN
    { match: "7NNV9M", sendTo: "AW-18146496318/cn4YCLjq7LwdEL6e9sxD" }  // AXIS
  ];

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var baseId = CONFIG.ga4Id || CONFIG.awId;
  if (baseId) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(baseId);
    document.head.appendChild(s);
    gtag("js", new Date());
    if (CONFIG.ga4Id) gtag("config", CONFIG.ga4Id);
    if (CONFIG.awId) gtag("config", CONFIG.awId);
  }

  if (CONFIG.clarityId) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CONFIG.clarityId);
  }

  function onClick(e) {
    var a = e.target.closest ? e.target.closest('a[href*="px.a8.net"]') : null;
    if (!a || !CONFIG.awId) return;
    for (var i = 0; i < CONVERSIONS.length; i++) {
      if (a.href.indexOf(CONVERSIONS[i].match) > -1) {
        gtag("event", "conversion", { send_to: CONVERSIONS[i].sendTo });
        break;
      }
    }
  }

  document.addEventListener("click", onClick, true);
  document.addEventListener("auxclick", onClick, true);
})();
