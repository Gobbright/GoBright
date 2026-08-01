(function () {
  "use strict";

  function initHero() {
    var hero = document.querySelector("[data-hero]");
    if (!hero || hero.dataset.heroReady === "true") return;

    var slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
    var dots = Array.from(hero.querySelectorAll("[data-hero-dot]"));
    var previous = hero.querySelector("[data-hero-prev]");
    var next = hero.querySelector("[data-hero-next]");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var current = 0;
    var timer = null;
    var pointerStartX = null;
    var pointerStartY = null;
    var pausedByUser = false;
    var interval = 6500;

    if (slides.length < 2 || slides.length !== dots.length || !previous || !next) return;
    hero.dataset.heroReady = "true";

    function hydrateSlide(index) {
      var slide = slides[index];
      if (!slide || slide.dataset.loaded === "true") return;

      slide.querySelectorAll("[data-srcset]").forEach(function (source) {
        source.srcset = source.dataset.srcset;
        source.removeAttribute("data-srcset");
      });

      slide.querySelectorAll("img[data-src]").forEach(function (image) {
        image.src = image.dataset.src;
        image.removeAttribute("data-src");
      });

      slide.dataset.loaded = "true";
    }

    function setInteractiveState(slide, active) {
      slide.querySelectorAll("a, button, input, select, textarea").forEach(function (control) {
        if (active) {
          control.removeAttribute("tabindex");
        } else {
          control.setAttribute("tabindex", "-1");
        }
      });
    }

    function showSlide(index) {
      var total = slides.length;
      var target = (index + total) % total;
      hydrateSlide(target);
      current = target;

      slides.forEach(function (slide, slideIndex) {
        var active = slideIndex === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        setInteractiveState(slide, active);
      });

      dots.forEach(function (dot, dotIndex) {
        var active = dotIndex === current;
        dot.classList.toggle("is-active", active);
        if (active) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

    function stopAutoPlay() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startAutoPlay() {
      stopAutoPlay();
      if (pausedByUser || document.hidden || reduceMotion.matches) return;
      timer = window.setInterval(function () {
        showSlide(current + 1);
      }, interval);
    }

    function selectSlide(index) {
      showSlide(index);
      startAutoPlay();
    }

    previous.addEventListener("click", function () {
      selectSlide(current - 1);
    });

    next.addEventListener("click", function () {
      selectSlide(current + 1);
    });

    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        selectSlide(index);
      });
    });

    hero.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectSlide(current - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        selectSlide(current + 1);
      }
    });

    hero.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse") return;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
    }, { passive: true });

    hero.addEventListener("pointerup", function (event) {
      if (pointerStartX === null || pointerStartY === null) return;
      var distanceX = event.clientX - pointerStartX;
      var distanceY = event.clientY - pointerStartY;
      pointerStartX = null;
      pointerStartY = null;

      if (Math.abs(distanceX) < 45 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
      selectSlide(distanceX > 0 ? current - 1 : current + 1);
    }, { passive: true });

    hero.addEventListener("mouseenter", function () {
      pausedByUser = true;
      stopAutoPlay();
    });

    hero.addEventListener("mouseleave", function () {
      pausedByUser = false;
      startAutoPlay();
    });

    hero.addEventListener("focusin", function () {
      pausedByUser = true;
      stopAutoPlay();
    });

    hero.addEventListener("focusout", function (event) {
      if (hero.contains(event.relatedTarget)) return;
      pausedByUser = false;
      startAutoPlay();
    });

    document.addEventListener("visibilitychange", startAutoPlay);
    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", startAutoPlay);
    }

    showSlide(0);
    startAutoPlay();

    function preloadRemainingSlides() {
      slides.forEach(function (_, index) {
        if (index !== current) hydrateSlide(index);
      });
    }

    window.addEventListener("load", function () {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadRemainingSlides, { timeout: 2200 });
      } else {
        window.setTimeout(preloadRemainingSlides, 900);
      }
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHero, { once: true });
  } else {
    initHero();
  }
}());
