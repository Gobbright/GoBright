(function () {
  if (!window.__gbInspectGuard) {
    window.__gbInspectGuard = true;
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    }, true);
    document.addEventListener("keydown", function (event) {
      var key = String(event.key || "").toUpperCase();
      var modifier = event.ctrlKey || event.metaKey;
      var blocked =
        key === "F12" ||
        (modifier && event.shiftKey && ["I", "J", "C", "K"].indexOf(key) !== -1) ||
        (modifier && key === "U");
      if (!blocked) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  }

  var form = document.getElementById("loginForm");
  if (!form) return;

  var adminId = document.getElementById("adminId");
  var adminPassword = document.getElementById("adminPassword");
  var notice = document.getElementById("loginNotice");
  var quickLogin = document.querySelector("[data-quick-admin-id][data-quick-admin-password]");
  var submitButton = form.querySelector('[type="submit"]');

  async function openDashboard(id, password, trigger) {
    notice.classList.remove("show");
    var originalText = trigger ? trigger.textContent : "";

    if (trigger) {
      trigger.disabled = true;
      trigger.textContent = "Opening Dashboard...";
    }

    try {
      var body = new FormData();
      body.set("csrf_token", window.GB_CSRF_TOKEN);
      body.set("id", id);
      body.set("password", password);

      var response = await fetch(window.GB_BASE_URL + "/api/admin-login", {
        method: "POST",
        body: body,
        headers: { Accept: "application/json" },
        credentials: "same-origin"
      });
      var data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Login failed.");

      sessionStorage.setItem("gobright_admin", "1");
      window.location.replace("overview");
    } catch (error) {
      notice.textContent = error.message;
      notice.classList.add("show");
      if (trigger) {
        trigger.disabled = false;
        trigger.textContent = originalText;
      }
    }
  }

  if (quickLogin) {
    quickLogin.addEventListener("click", function () {
      openDashboard(
        quickLogin.getAttribute("data-quick-admin-id") || "",
        quickLogin.getAttribute("data-quick-admin-password") || "",
        quickLogin
      );
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    openDashboard(adminId.value, adminPassword.value, submitButton);
  }, true);
}());
