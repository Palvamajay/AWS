(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    btn.textContent = theme === "dark" ? "Light" : "Dark";
  }

  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved || (prefersDark ? "dark" : "light"));

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Highlight the menu link of the section currently on screen
  var links = document.querySelectorAll("nav a.l");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle("on", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { obs.observe(s); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
