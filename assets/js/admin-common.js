/* Casual source-inspection deterrent (browser developer tools cannot be fully disabled). */
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

/* auth guard — redirect to login if not logged in */
if (sessionStorage.getItem("gobright_admin") !== "1") {
  window.location.replace("index");
}

/* ── utilities ── */
function esc(v) {
  return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c];
  });
}
function uid() { return "c" + Date.now() + Math.random().toString(36).slice(2,6); }

var AVATAR_COLORS = ["#e32028","#a855f7","#3b82f6","#22c55e","#f97316","#14b8a6","#f59e0b","#ec4899"];
function avatarColor(name) {
  var code = 0;
  for (var i = 0; i < (name||"").length; i++) code += name.charCodeAt(i);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function starsHtml(rating) {
  var s = "";
  for (var i = 1; i <= 5; i++) s += '<span class="'+(i<=rating?"":"star-off")+'">★</span>';
  return s;
}

/* ── localStorage helpers ── */
function loadClients()   { try { return JSON.parse(localStorage.getItem("gobright_clients"))   || []; } catch(e) { return []; } }
function loadReviews()   { try { return JSON.parse(localStorage.getItem("gobright_reviews"))   || []; } catch(e) { return []; } }
function loadEmployees() { try { return JSON.parse(localStorage.getItem("gobright_employees")) || []; } catch(e) { return []; } }
function loadJobs()      { try { return JSON.parse(localStorage.getItem("gobright_jobs"))      || []; } catch(e) { return []; } }
function saveClients(a)   { localStorage.setItem("gobright_clients",   JSON.stringify(a)); }
function saveReviews(a)   { localStorage.setItem("gobright_reviews",   JSON.stringify(a)); }
function saveEmployees(a) { localStorage.setItem("gobright_employees", JSON.stringify(a)); }
function saveJobs(a)      { localStorage.setItem("gobright_jobs",      JSON.stringify(a)); }

function adminDateParts(value) {
  if (!value) return { date: "-", time: "-", full: "-" };
  var raw = String(value).trim();
  var parsed = new Date(raw.replace(" ", "T"));
  if (Number.isNaN(parsed.getTime())) parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return { date: raw, time: "-", full: raw };
  var date = parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  var time = parsed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  return { date: date, time: time, full: date + " " + time };
}

function adminNowDateTime() {
  var d = new Date();
  function pad(n) { return String(n).padStart(2, "0"); }
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " +
    pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
}

function adminIcon(name) {
  var icons = {
    view: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>',
    csv: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>'
  };
  return icons[name] || "";
}

function adminCsvValue(value) {
  return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"';
}

function adminExportCsv(filename, rows) {
  if (!rows.length) {
    alert("No rows to export.");
    return;
  }
  var headers = Object.keys(rows[0]);
  var csv = [headers.map(adminCsvValue).join(",")].concat(rows.map(function (row) {
    return headers.map(function (key) { return adminCsvValue(row[key]); }).join(",");
  })).join("\r\n");
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename + "-" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  link.remove();
}

function adminExportPdf(title, rows) {
  if (!rows.length) {
    alert("No rows to export.");
    return;
  }
  var headers = Object.keys(rows[0]);
  var tableRows = rows.map(function (row) {
    return "<tr>" + headers.map(function (key) {
      return "<td>" + esc(row[key]) + "</td>";
    }).join("") + "</tr>";
  }).join("");
  var win = window.open("", "_blank");
  if (!win) {
    alert("Allow popups to export PDF.");
    return;
  }
  win.document.write('<!doctype html><html><head><title>' + esc(title) + '</title>' +
    '<style>body{font-family:Arial,sans-serif;margin:0;background:#f8fafc;color:#111827}header{background:#111;color:#fff;padding:26px 30px;border-bottom:5px solid #e32028}h1{margin:0;font-size:26px}.meta{margin-top:7px;color:#cbd5e1;font-size:13px}.wrap{padding:24px}table{width:100%;border-collapse:collapse;background:#fff}th{background:#e32028;color:#fff;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em;padding:11px}td{padding:10px 11px;border:1px solid #e5e7eb;font-size:12px;vertical-align:top}tr:nth-child(even) td{background:#fff7f7}@media print{header{print-color-adjust:exact;-webkit-print-color-adjust:exact}th{print-color-adjust:exact;-webkit-print-color-adjust:exact}.wrap{padding:0}}</style>' +
    '</head><body><header><h1>' + esc(title) + '</h1><div class="meta">Exported ' + esc(new Date().toLocaleString("en-IN")) + ' | Rows: ' + rows.length + '</div></header><div class="wrap"><table><thead><tr>' +
    headers.map(function (key) { return "<th>" + esc(key) + "</th>"; }).join("") +
    '</tr></thead><tbody>' + tableRows + '</tbody></table></div></body></html>');
  win.document.close();
  win.focus();
  setTimeout(function () { win.print(); }, 350);
}

function ensureAdminViewModal() {
  var modal = document.getElementById("adminViewModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "adminViewModal";
  modal.className = "admin-modal-overlay hidden";
  modal.innerHTML =
    '<div class="admin-detail-modal" role="dialog" aria-modal="true">' +
      '<div class="admin-detail-head">' +
        '<h3 id="adminViewTitle"></h3>' +
        '<button class="admin-modal-close" type="button" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="admin-detail-body" id="adminViewBody"></div>' +
    '</div>';
  document.body.appendChild(modal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal || event.target.closest(".admin-modal-close")) {
      modal.classList.add("hidden");
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") modal.classList.add("hidden");
  });
  return modal;
}

function openAdminViewModal(title, fields) {
  var modal = ensureAdminViewModal();
  document.getElementById("adminViewTitle").textContent = title;
  document.getElementById("adminViewBody").innerHTML = '<div class="admin-detail-grid">' + fields.map(function (field) {
    var cls = field.full ? " full" : "";
    var value = field.html != null ? field.html : '<strong>' + esc(field.value || "-") + '</strong>';
    return '<div class="admin-detail-field' + cls + '"><span>' + esc(field.label) + '</span>' + value + '</div>';
  }).join("") + '</div>';
  modal.classList.remove("hidden");
}

function ensureAdminConfirmModal() {
  var modal = document.getElementById("adminConfirmModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "adminConfirmModal";
  modal.className = "admin-modal-overlay hidden";
  modal.innerHTML =
    '<div class="admin-confirm-modal" role="dialog" aria-modal="true">' +
      '<div class="admin-confirm-icon">' + adminIcon("trash") + '</div>' +
      '<h3 id="adminConfirmTitle">Confirm Delete</h3>' +
      '<p id="adminConfirmMessage"></p>' +
      '<div class="admin-confirm-actions">' +
        '<button class="admin-confirm-cancel" type="button">Cancel</button>' +
        '<button class="admin-confirm-ok" type="button">Delete</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
  return modal;
}

function openAdminConfirmModal(options) {
  var modal = ensureAdminConfirmModal();
  var title = options && options.title ? options.title : "Confirm Delete";
  var message = options && options.message ? options.message : "Are you sure you want to delete this row?";
  var onConfirm = options && options.onConfirm ? options.onConfirm : function () {};
  document.getElementById("adminConfirmTitle").textContent = title;
  document.getElementById("adminConfirmMessage").textContent = message;
  modal.classList.remove("hidden");

  var cancel = modal.querySelector(".admin-confirm-cancel");
  var ok = modal.querySelector(".admin-confirm-ok");
  function close() { modal.classList.add("hidden"); }
  cancel.onclick = close;
  modal.onclick = function (event) {
    if (event.target === modal) close();
  };
  ok.onclick = function () {
    close();
    onConfirm();
  };
}

/* ── sidebar active state + sign out ── */
(function () {
  var page = location.pathname.split("/").pop() || "overview";

  function readRows(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback || []; }
    catch (e) { return fallback || []; }
  }

  function adminCounts() {
    var initial = window.GB_ADMIN_INITIAL || {};
    var submissions = window.GB_SUBMISSION_COUNTS || {};
    return {
      clients: readRows("gobright_clients", initial.gobright_clients).length,
      reviews: readRows("gobright_reviews", initial.gobright_reviews).length,
      employees: readRows("gobright_employees", initial.gobright_employees).length,
      hiring: readRows("gobright_jobs", initial.gobright_jobs).length,
      careers: submissions.careers == null ? (initial.careers || []).length : submissions.careers,
      leads: submissions.leads == null ? (initial.leads || []).length : submissions.leads
    };
  }

  function updateAdminNavCounts() {
    var counts = adminCounts();
    document.querySelectorAll(".nav-item[data-page]").forEach(function (el) {
      var key = el.dataset.page;
      if (key === "overview") return;
      var badge = el.querySelector(".nav-count");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "nav-count";
        el.appendChild(badge);
      }
      badge.textContent = counts[key] == null ? "0" : String(counts[key]);
    });
  }

  window.GB_UPDATE_ADMIN_NAV_COUNTS = updateAdminNavCounts;

  document.querySelectorAll(".nav-item[data-page]").forEach(function (el) {
    el.classList.toggle("active", el.dataset.page === page);
  });
  updateAdminNavCounts();

  var sidebar = document.querySelector(".sidebar");
  var header = document.querySelector(".main-header, .page-header");
  if (sidebar && header) {
    var menuBtn = header.querySelector(".mobile-menu-btn");
    if (!menuBtn) {
      menuBtn = document.createElement("button");
      menuBtn.className = "mobile-menu-btn";
      menuBtn.type = "button";
      menuBtn.innerHTML = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
      header.insertBefore(menuBtn, header.firstChild);
    }
    sidebar.id = sidebar.id || "adminSidebar";
    menuBtn.setAttribute("aria-label", "Open admin menu");
    menuBtn.setAttribute("aria-controls", "adminSidebar");
    menuBtn.setAttribute("aria-expanded", "false");

    var backdrop = document.createElement("button");
    backdrop.className = "sidebar-backdrop";
    backdrop.type = "button";
    backdrop.setAttribute("aria-label", "Close admin menu");
    document.body.appendChild(backdrop);

    function setSidebarOpen(open) {
      document.body.classList.toggle("sidebar-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close admin menu" : "Open admin menu");
    }

    menuBtn.addEventListener("click", function () {
      setSidebarOpen(!document.body.classList.contains("sidebar-open"));
    });
    backdrop.addEventListener("click", function () {
      setSidebarOpen(false);
    });
    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setSidebarOpen(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setSidebarOpen(false);
    });
  }

  var btn = document.getElementById("logoutBtn");
  if (btn) btn.addEventListener("click", function () {
    sessionStorage.removeItem("gobright_admin");
    window.location.href = "index";
  });
}());
