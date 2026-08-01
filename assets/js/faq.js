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

  ready(function () {
    var faqSection = document.querySelector("#faq");
    if (!faqSection) return;

    Array.from(faqSection.querySelectorAll("button")).forEach(function (button, index) {
      var answer = button.nextElementSibling;
      if (!answer || !answer.classList.contains("overflow-hidden")) return;
      var icon = button.querySelector("svg path");
      var questionId = "faq-question-" + (index + 1);
      var answerId = "faq-answer-" + (index + 1);
      var initiallyOpen = index === 0;

      button.type = "button";
      button.id = questionId;
      button.setAttribute("aria-controls", answerId);
      button.setAttribute("aria-expanded", String(initiallyOpen));
      answer.id = answerId;
      answer.setAttribute("role", "region");
      answer.setAttribute("aria-labelledby", questionId);

      if (initiallyOpen) {
        swapClasses(answer, ["max-h-0", "opacity-0"], ["max-h-[600px]", "opacity-100"]);
        if (icon) icon.setAttribute("d", "M2 6h8");
      }

      button.addEventListener("click", function () {
        var closed = answer.classList.contains("max-h-0");
        swapClasses(
          answer,
          closed ? ["max-h-0", "opacity-0"] : ["max-h-[600px]", "opacity-100"],
          closed ? ["max-h-[600px]", "opacity-100"] : ["max-h-0", "opacity-0"]
        );
        button.setAttribute("aria-expanded", String(closed));
        if (icon) icon.setAttribute("d", closed ? "M2 6h8" : "M6 2v8M2 6h8");
      });
    });
  });
}());
