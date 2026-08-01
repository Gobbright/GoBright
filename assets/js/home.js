(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function swapClasses(el, remove, add) {
    if (!el) return;
    remove.forEach(function (name) { el.classList.remove(name); });
    add.forEach(function (name) { el.classList.add(name); });
  }

  function reviewsSection() {
    return Array.from(document.querySelectorAll("section")).find(function (section) {
      var heading = section.querySelector("h1,h2");
      return heading && heading.textContent.replace(/\s+/g, " ").trim().indexOf("What Our") !== -1;
    });
  }

  function reviewPerView() {
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function findReviewGrid(scope) {
    return Array.from(scope.querySelectorAll("div")).find(function (div) {
      return div.classList.contains("grid") &&
        div.classList.contains("grid-cols-1") &&
        div.classList.contains("sm:grid-cols-2") &&
        div.classList.contains("md:grid-cols-3") &&
        div.classList.contains("gap-6");
    });
  }

  function cardSignature(card) {
    return card.textContent.replace(/\s+/g, " ").trim().slice(0, 180);
  }

  function collectReviewCards(grid) {
    var raw = Array.from(grid.querySelectorAll("article, div")).filter(function (node) {
      return node.classList.contains("bg-[#161616]") &&
        node.classList.contains("rounded-2xl") &&
        node.classList.contains("p-6") &&
        node.querySelector("svg") &&
        node.querySelector("p");
    });
    var seen = {};
    return raw.filter(function (card) {
      var key = cardSignature(card);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    }).map(function (card) {
      var clone = card.cloneNode(true);
      clone.classList.remove("hidden", "sm:hidden", "sm:block", "md:hidden", "md:block");
      clone.removeAttribute("style");
      return clone;
    });
  }

  function ensureReviewControls(scope, grid) {
    var shell = grid.parentElement;
    var controls = shell ? shell.nextElementSibling : null;
    if (!controls || !controls.classList.contains("flex")) {
      controls = document.createElement("div");
      controls.className = "flex items-center justify-center gap-5 mt-10";
      shell.parentElement.insertBefore(controls, shell.nextSibling);
    }
    controls.classList.add("gb-review-controls");
    controls.innerHTML = [
      '<button type="button" class="gb-review-prev w-11 h-11 rounded-full border border-[#333] bg-[#111] flex items-center justify-center text-[#aaa] hover:border-[#e32028] hover:text-[#e32028] hover:shadow-[0_0_15px_rgba(227,32,40,0.3)] transition-all duration-200" aria-label="Previous review slide"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4l-5 5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '<div class="gb-review-dots flex gap-2" aria-label="Review slides"></div>',
      '<button type="button" class="gb-review-next w-11 h-11 rounded-full border border-[#333] bg-[#111] flex items-center justify-center text-[#aaa] hover:border-[#e32028] hover:text-[#e32028] hover:shadow-[0_0_15px_rgba(227,32,40,0.3)] transition-all duration-200" aria-label="Next review slide"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>'
    ].join("");
    return controls;
  }

  function initReviewSlider() {
    clearInterval(window.GBReviewSliderTimer);
    window.GBReviewSliderTimer = null;

    var scope = reviewsSection();
    if (!scope) return;
    var grid = findReviewGrid(scope);
    if (!grid) return;

    var cards = collectReviewCards(grid);
    if (!cards.length) return;
    cards.forEach(function (card, index) {
      if (!card.dataset.gbReviewIndex) card.dataset.gbReviewIndex = String(index);
    });
    cards.sort(function (a, b) {
      return Number(a.dataset.gbReviewIndex || 0) - Number(b.dataset.gbReviewIndex || 0);
    });

    grid.className = "gb-reviews-slider grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-300";
    grid.innerHTML = "";
    cards.forEach(function (card) {
      card.classList.add("gb-review-card");
      grid.appendChild(card);
    });

    var controls = ensureReviewControls(scope, grid);
    var prev = controls.querySelector(".gb-review-prev");
    var next = controls.querySelector(".gb-review-next");
    var dots = controls.querySelector(".gb-review-dots");
    var currentPage = Number(grid.dataset.reviewPage || 0);

    function render(page) {
      var perView = reviewPerView();
      var pages = Math.max(1, cards.length);
      currentPage = ((page % pages) + pages) % pages;
      grid.dataset.reviewPage = String(currentPage);

      grid.innerHTML = "";
      cards.forEach(function (card) { card.hidden = true; });
      for (var offset = 0; offset < cards.length; offset += 1) {
        var card = cards[(currentPage + offset) % cards.length];
        card.hidden = offset >= Math.min(perView, cards.length);
        grid.appendChild(card);
      }

      controls.style.display = cards.length > perView ? "" : "none";
      dots.innerHTML = "";
      for (var i = 0; i < pages; i += 1) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "gb-review-dot rounded-full transition-all duration-300 " + (i === currentPage ? "w-8 h-2 bg-[#e32028]" : "w-2 h-2 bg-[#333] hover:bg-[#555]");
        dot.setAttribute("aria-label", "Go to review slide " + (i + 1));
        dot.dataset.reviewPage = String(i);
        dots.appendChild(dot);
      }
    }

    function startAuto() {
      clearInterval(window.GBReviewSliderTimer);
      window.GBReviewSliderTimer = null;
      if (cards.length <= reviewPerView()) return;

      window.GBReviewSliderTimer = setInterval(function () {
        render(currentPage + 1);
      }, 3000);
    }

    function moveTo(page) {
      render(page);
      startAuto();
    }

    prev.onclick = function () { moveTo(currentPage - 1); };
    next.onclick = function () { moveTo(currentPage + 1); };
    dots.onclick = function (event) {
      var dot = event.target.closest("[data-review-page]");
      if (dot) moveTo(Number(dot.dataset.reviewPage || 0));
    };
    if (!window.GBReviewSliderResizeBound) {
      window.GBReviewSliderResizeBound = true;
      window.addEventListener("resize", function () {
        if (window.GBInitReviewSlider) window.GBInitReviewSlider();
      });
    }
    render(currentPage);
    startAuto();
  }

  window.GBInitReviewSlider = initReviewSlider;
  document.addEventListener("gb:reviews-updated", initReviewSlider);

  ready(function () {
    var heroPrev = document.querySelector('button[aria-label="Previous slide"]');
    var heroNext = document.querySelector('button[aria-label="Next slide"]');
    var heroDots = Array.from(document.querySelectorAll('button[aria-label^="Go to slide"]'));
    if (!heroPrev || !heroNext || !heroDots.length) {
      initReviewSlider();
      return;
    }

    var heroSection = heroPrev.closest("section");
    var allHeroImgs = Array.from(heroSection.querySelectorAll('img[class*="transition-opacity"]'));
    var desktopImages = allHeroImgs.filter(function (img) { return img.className.indexOf('md:block') !== -1; });
    var mobileImages = allHeroImgs.filter(function (img) { return img.className.indexOf('md:hidden') !== -1; });
    var mobileCopies = Array.from(heroSection.querySelectorAll(".home-hero-mobile-copy"));
    var heroPanels = Array.from(heroSection.querySelectorAll('div[class*="sm:transition-opacity"]'));
    var heroCurrent = 0;
    var heroTimer;

    var showHeroSlide = function (index) {
      heroCurrent = (index + heroDots.length) % heroDots.length;
      [desktopImages, mobileImages].forEach(function (images) {
        images.forEach(function (img, i) {
          var active = i === heroCurrent;
          swapClasses(img, active ? ["opacity-0"] : ["opacity-100"], active ? ["opacity-100"] : ["opacity-0"]);
        });
      });
      heroPanels.forEach(function (panel, i) {
        var active = i === heroCurrent;
        swapClasses(
          panel,
          active ? ["sm:opacity-0", "sm:pointer-events-none"] : ["sm:opacity-100", "sm:pointer-events-auto"],
          active ? ["sm:opacity-100", "sm:pointer-events-auto"] : ["sm:opacity-0", "sm:pointer-events-none"]
        );
      });
      mobileCopies.forEach(function (mobileCopy, i) {
        var showMobileCopy = i === heroCurrent;
        swapClasses(
          mobileCopy,
          showMobileCopy ? ["opacity-0"] : ["opacity-100"],
          showMobileCopy ? ["opacity-100"] : ["opacity-0"]
        );
      });
      heroDots.forEach(function (dot, i) {
        var active = i === heroCurrent;
        swapClasses(
          dot,
          active ? ["w-2", "bg-[#555]"] : ["w-7", "bg-[#e32028]"],
          active ? ["w-7", "bg-[#e32028]"] : ["w-2", "bg-[#555]"]
        );
      });
    };

    var restartHeroTimer = function () {
      clearInterval(heroTimer);
      heroTimer = setInterval(function () { showHeroSlide(heroCurrent + 1); }, 6000);
    };

    heroPrev.addEventListener("click", function () { showHeroSlide(heroCurrent - 1); restartHeroTimer(); });
    heroNext.addEventListener("click", function () { showHeroSlide(heroCurrent + 1); restartHeroTimer(); });
    heroDots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { showHeroSlide(i); restartHeroTimer(); });
    });

    restartHeroTimer();
    initReviewSlider();
  });
}());
