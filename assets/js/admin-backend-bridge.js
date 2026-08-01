(function () {
  var initial = window.GB_ADMIN_INITIAL || {};
  var keys = ["gobright_clients", "gobright_reviews", "gobright_employees", "gobright_jobs"];
  var nativeSet = Storage.prototype.setItem;
  var timers = {};

  keys.forEach(function (key) {
    nativeSet.call(localStorage, key, JSON.stringify(initial[key] || []));
  });

  Storage.prototype.setItem = function (key, value) {
    nativeSet.call(this, key, value);
    if (this !== localStorage || keys.indexOf(key) < 0) return;

    clearTimeout(timers[key]);
    timers[key] = setTimeout(function () {
      var rows = [];
      try { rows = JSON.parse(value) || []; } catch (error) {}

      fetch(window.GB_BASE_URL + "/api/admin-sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": window.GB_CSRF_TOKEN
        },
        body: JSON.stringify({ key: key, rows: rows })
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data && data.ok && Array.isArray(data.rows)) {
            nativeSet.call(localStorage, key, JSON.stringify(data.rows));
            if (window.GB_UPDATE_ADMIN_NAV_COUNTS) window.GB_UPDATE_ADMIN_NAV_COUNTS();
          }
        })
        .catch(function () {});
    }, 120);
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c];
    });
  }

  var submissionState = {
    leads: Array.isArray(initial.leads) ? initial.leads.slice() : [],
    careers: Array.isArray(initial.careers) ? initial.careers.slice() : []
  };
  var submissionFilters = {
    leads: { q: "", status: "all" },
    careers: { q: "", status: "all" }
  };
  var submissionConfig = {
    leads: {
      title: "Lead Form Data",
      subtitle: "Website enquiries",
      empty: "No lead submissions yet.",
      statuses: ["all", "new", "viewed", "contacted", "qualified", "closed", "deleted"],
      fields: [
        ["Service", "service"],
        ["Name", "name"],
        ["Phone", "phone"],
        ["Email", "email"],
        ["Message", "message"],
        ["Source", "source_page"],
        ["Extra Data", "extra_data"]
      ]
    },
    careers: {
      title: "Careers Data",
      subtitle: "Career applications",
      empty: "No career applications yet.",
      statuses: ["all", "new", "reviewed", "shortlisted", "interviewed", "hired", "rejected", "deleted"],
      fields: [
        ["Position", "position"],
        ["Name", "name"],
        ["Phone", "phone"],
        ["Email", "email"],
        ["Experience", "experience"],
        ["Resume", "resume_path"],
        ["Message", "message"],
        ["Source", "source_page"],
        ["Extra Data", "extra_data"]
      ]
    }
  };

  function normalizeStatus(status) {
    return String(status || "new").trim().toLowerCase() || "new";
  }

  function statusText(status) {
    return normalizeStatus(status).replace(/_/g, " ").replace(/\b\w/g, function (letter) {
      return letter.toUpperCase();
    });
  }

  function getSubmissionRows(kind) {
    return submissionState[kind] || [];
  }

  function getRowById(kind, id) {
    return getSubmissionRows(kind).find(function (row) {
      return String(row.id) === String(id);
    });
  }

  function formatDateParts(value) {
    if (!value) return { date: "-", time: "-" };
    var parsed = new Date(String(value).replace(" ", "T"));
    if (Number.isNaN(parsed.getTime())) {
      return { date: String(value), time: "" };
    }
    return {
      date: parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      time: parsed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };
  }

  function getPrimaryTitle(kind, row) {
    return kind === "leads" ? (row.service || "Website enquiry") : (row.position || "Career application");
  }

  function extraDataText(value) {
    if (!value) return "";
    if (typeof value === "object") {
      return Object.keys(value).map(function (key) {
        return key + ": " + value[key];
      }).join("\n");
    }
    try {
      var parsed = JSON.parse(String(value));
      if (parsed && typeof parsed === "object") return extraDataText(parsed);
    } catch (error) {}
    return String(value);
  }

  function fieldValueText(row, key) {
    if (key === "extra_data") return extraDataText(row[key]);
    if (key === "resume_path") return row.resume_name || row.resume_path || "";
    return row[key] || "";
  }

  function fieldValueHtml(row, key) {
    var text = fieldValueText(row, key);
    if (!text) return "-";
    if ((key === "portfolio_url" || key === "resume_path") && row[key]) {
      var label = key === "resume_path" ? (row.resume_name || "View Resume") : row[key];
      return '<a href="' + escapeHtml(row[key]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + "</a>";
    }
    return escapeHtml(text).replace(/\n/g, "<br>");
  }

  function getSearchBlob(kind, row) {
    return submissionConfig[kind].fields.map(function (field) {
      return fieldValueText(row, field[1]);
    }).join(" ").toLowerCase();
  }

  function getFilteredRows(kind) {
    var rows = getSubmissionRows(kind);
    var filter = submissionFilters[kind];
    var q = filter.q.toLowerCase();
    return rows.filter(function (row) {
      var status = normalizeStatus(row.status);
      var statusOk = filter.status === "all" || status === filter.status;
      var searchOk = !q || getSearchBlob(kind, row).indexOf(q) >= 0;
      return statusOk && searchOk;
    });
  }

  function statusOptionsHtml(kind, selected) {
    return submissionConfig[kind].statuses.filter(function (status) {
      return status !== "all";
    }).map(function (status) {
      return '<option value="' + escapeHtml(status) + '"' + (normalizeStatus(selected) === status ? " selected" : "") + ">" +
        escapeHtml(statusText(status)) + "</option>";
    }).join("");
  }

  function statusFilterHtml(kind, selected) {
    return submissionConfig[kind].statuses.map(function (status) {
      return '<option value="' + escapeHtml(status) + '"' + (selected === status ? " selected" : "") + ">" +
        escapeHtml(status === "all" ? "All Status" : statusText(status)) + "</option>";
    }).join("");
  }

  function submissionIcon(name) {
    if (name === "view") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/></svg>';
    }
    if (name === "trash") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>';
    }
    if (name === "download") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
    }
    return "";
  }

  function renderSubmissionCard(kind, row) {
    var status = normalizeStatus(row.status);
    var date = formatDateParts(row.created_at);
    var isNew = status === "new";
    var fieldHtml = submissionConfig[kind].fields.map(function (field) {
      var value = fieldValueHtml(row, field[1]);
      return '<div class="submission-field"><span>' + escapeHtml(field[0]) + '</span><strong>' + value + "</strong></div>";
    }).join("");

    return '<article class="submission-card status-card-' + escapeHtml(status) + '" data-submission-id="' + escapeHtml(row.id) + '">' +
      '<div class="submission-card-head">' +
        '<div class="submission-title-wrap">' +
          '<div class="submission-avatar">' + escapeHtml(String(row.name || "?").trim().charAt(0).toUpperCase() || "?") + '</div>' +
          '<div><h3>' + escapeHtml(row.name || "Unnamed") + '</h3><p>' + escapeHtml(getPrimaryTitle(kind, row)) + '</p></div>' +
        '</div>' +
        '<div class="submission-badges">' +
          (isNew ? '<span class="submission-new-badge">New</span>' : "") +
          '<span class="submission-status-pill status-pill-' + escapeHtml(status) + '">' + escapeHtml(statusText(status)) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="submission-datetime"><span>Date: <b>' + escapeHtml(date.date) + '</b></span><span>Time: <b>' + escapeHtml(date.time) + '</b></span></div>' +
      '<div class="submission-fields">' + fieldHtml + '</div>' +
      '<div class="submission-actions">' +
        '<select class="submission-status-select" data-status-id="' + escapeHtml(row.id) + '">' + statusOptionsHtml(kind, status) + '</select>' +
        '<button class="submission-icon-btn view" type="button" data-action="view" data-id="' + escapeHtml(row.id) + '" title="View">' + submissionIcon("view") + '<span>View</span></button>' +
        '<button class="submission-icon-btn danger" type="button" data-action="delete" data-id="' + escapeHtml(row.id) + '" title="Delete">' + submissionIcon("trash") + '<span>Delete</span></button>' +
      '</div>' +
    '</article>';
  }

  function renderSubmissionRow(kind, row) {
    var status = normalizeStatus(row.status);
    var date = formatDateParts(row.created_at);
    var primary = getPrimaryTitle(kind, row);
    var contact = [
      row.phone ? '<span>' + escapeHtml(row.phone) + '</span>' : '',
      row.email ? '<span>' + escapeHtml(row.email) + '</span>' : ''
    ].filter(Boolean).join("");
    var extra = kind === "leads" ? (row.message || "-") : (row.experience || "-");
    return '<tr data-submission-id="' + escapeHtml(row.id) + '">' +
      '<td><strong>' + escapeHtml(date.date) + '</strong><span class="admin-row-sub">' + escapeHtml(date.time) + '</span></td>' +
      '<td><strong class="admin-row-title">' + escapeHtml(row.name || "Unnamed") + '</strong><span class="admin-row-sub">#' + escapeHtml(row.id || "-") + '</span></td>' +
      '<td><strong class="admin-row-title">' + escapeHtml(primary) + '</strong><span class="admin-row-sub">' + escapeHtml(extra) + '</span></td>' +
      '<td><div class="submission-contact-cell">' + (contact || '<span>-</span>') + '</div></td>' +
      '<td><span class="submission-status-pill status-pill-' + escapeHtml(status) + '">' + escapeHtml(statusText(status)) + '</span></td>' +
      '<td><div class="admin-table-actions submission-table-actions">' +
        '<select class="submission-status-select" data-status-id="' + escapeHtml(row.id) + '">' + statusOptionsHtml(kind, status) + '</select>' +
        '<button class="submission-icon-btn view" type="button" data-action="view" data-id="' + escapeHtml(row.id) + '" title="View">' + submissionIcon("view") + '</button>' +
        '<button class="submission-icon-btn danger" type="button" data-action="delete" data-id="' + escapeHtml(row.id) + '" title="Delete">' + submissionIcon("trash") + '</button>' +
      '</div></td>' +
    '</tr>';
  }

  function renderSubmissions(kind, keepSearchFocus) {
    var section = document.getElementById(kind === "leads" ? "section-leads" : "section-careers");
    if (!section) return;

    var config = submissionConfig[kind];
    var rows = getSubmissionRows(kind);
    var filtered = getFilteredRows(kind);
    var filter = submissionFilters[kind];
    var count = section.querySelector(".item-count");
    if (count) count.textContent = rows.length;

    var panel = section.querySelector(".panel-box");
    if (!panel) return;

    var newCount = rows.filter(function (row) {
      return normalizeStatus(row.status) === "new";
    }).length;

    panel.innerHTML =
      '<div class="submission-shell">' +
        '<div class="submission-toolbar">' +
          '<div class="submission-toolbar-title"><span class="submission-kicker">' + escapeHtml(config.subtitle) + '</span><strong>' + escapeHtml(config.title) + '</strong></div>' +
          '<div class="submission-toolbar-actions">' +
            '<input class="submission-search" type="search" placeholder="Search name, phone, email..." value="' + escapeHtml(filter.q) + '">' +
            '<select class="submission-filter">' + statusFilterHtml(kind, filter.status) + '</select>' +
            '<button class="submission-export csv" type="button" data-export="csv">' + submissionIcon("download") + 'CSV</button>' +
            '<button class="submission-export pdf" type="button" data-export="pdf">' + submissionIcon("download") + 'PDF</button>' +
          '</div>' +
        '</div>' +
        '<div class="submission-summary">' +
          '<span>Total <b>' + rows.length + '</b></span>' +
          '<span>New <b>' + newCount + '</b></span>' +
          '<span>Showing <b>' + filtered.length + '</b></span>' +
        '</div>' +
        (filtered.length
          ? '<div class="admin-table-wrap submission-table-wrap"><table class="admin-data-table submission-data-table">' +
              '<thead><tr><th>Date</th><th>Name</th><th>' + escapeHtml(kind === "leads" ? "Service" : "Position") + '</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
              filtered.map(function (row) { return renderSubmissionRow(kind, row); }).join("") +
            '</tbody></table></div>'
          : '<div class="submission-empty">' + escapeHtml(config.empty) + '</div>') +
      '</div>';

    attachSubmissionEvents(kind, section);
    if (keepSearchFocus) {
      var activeSearch = section.querySelector(".submission-search");
      if (activeSearch) {
        activeSearch.focus();
        activeSearch.setSelectionRange(activeSearch.value.length, activeSearch.value.length);
      }
    }
  }

  function attachSubmissionEvents(kind, section) {
    var search = section.querySelector(".submission-search");
    var filter = section.querySelector(".submission-filter");
    if (search) {
      search.addEventListener("input", function () {
        submissionFilters[kind].q = search.value.trim();
        renderSubmissions(kind, true);
      });
    }
    if (filter) {
      filter.addEventListener("change", function () {
        submissionFilters[kind].status = filter.value;
        renderSubmissions(kind);
      });
    }

    section.querySelectorAll("[data-export]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (button.dataset.export === "csv") exportSubmissionsCsv(kind);
        if (button.dataset.export === "pdf") exportSubmissionsPdf(kind);
      });
    });

    section.querySelectorAll("[data-status-id]").forEach(function (select) {
      select.addEventListener("change", function () {
        updateSubmissionStatus(kind, select.dataset.statusId, select.value);
      });
    });

    section.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.dataset.id;
        if (button.dataset.action === "view") openSubmissionModal(kind, id);
        if (button.dataset.action === "delete") deleteSubmission(kind, id);
      });
    });
  }

  function updateSubmissionStats() {
    window.GB_SUBMISSION_COUNTS = {
      leads: getSubmissionRows("leads").length,
      careers: getSubmissionRows("careers").length
    };
    document.querySelectorAll(".stat-card").forEach(function (card) {
      var title = card.querySelector(".stat-title");
      var number = card.querySelector(".stat-number");
      if (!title || !number) return;
      if (title.textContent.indexOf("Career") >= 0) number.textContent = getSubmissionRows("careers").length;
      if (title.textContent.indexOf("Lead") >= 0) number.textContent = getSubmissionRows("leads").length;
    });
    if (window.GB_UPDATE_ADMIN_NAV_COUNTS) window.GB_UPDATE_ADMIN_NAV_COUNTS();
  }

  function postSubmissionAction(kind, payload) {
    payload.type = kind;
    return fetch(window.GB_BASE_URL + "/api/admin-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": window.GB_CSRF_TOKEN
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok || !data || !data.ok) {
          throw new Error((data && data.message) || "Update failed.");
        }
        return data;
      });
    });
  }

  function updateSubmissionStatus(kind, id, status, quiet) {
    var row = getRowById(kind, id);
    if (!row) return Promise.resolve();
    var oldStatus = row.status;
    row.status = normalizeStatus(status);
    renderSubmissions(kind);
    updateSubmissionStats();
    return postSubmissionAction(kind, { action: "status", id: id, status: row.status }).catch(function (error) {
      row.status = oldStatus;
      renderSubmissions(kind);
      updateSubmissionStats();
      if (!quiet) alert(error.message || "Status update failed.");
    });
  }

  function markSubmissionViewed(kind, id) {
    var row = getRowById(kind, id);
    if (!row || normalizeStatus(row.status) !== "new") return Promise.resolve();
    row.status = kind === "careers" ? "reviewed" : "viewed";
    renderSubmissions(kind);
    updateSubmissionStats();
    return postSubmissionAction(kind, { action: "view", id: id }).catch(function () {});
  }

  function deleteSubmission(kind, id) {
    var row = getRowById(kind, id);
    if (!row) return;

    function runDelete() {
      var previous = getSubmissionRows(kind).slice();
      submissionState[kind] = getSubmissionRows(kind).filter(function (item) {
        return String(item.id) !== String(id);
      });
      renderSubmissions(kind);
      updateSubmissionStats();

      postSubmissionAction(kind, { action: "delete", id: id }).catch(function (error) {
        submissionState[kind] = previous;
        renderSubmissions(kind);
        updateSubmissionStats();
        alert(error.message || "Delete failed.");
      });
    }

    if (window.openAdminConfirmModal) {
      window.openAdminConfirmModal({
        title: "Delete Submission",
        message: 'Delete "' + (row.name || "this submission") + '" from database?',
        onConfirm: runDelete
      });
      return;
    }
    alert("Delete modal is still loading. Please refresh and try again.");
  }

  function ensureSubmissionModal() {
    var existing = document.getElementById("submissionViewModal");
    if (existing) return existing;
    var modal = document.createElement("div");
    modal.id = "submissionViewModal";
    modal.className = "submission-modal-overlay hidden";
    modal.innerHTML =
      '<div class="submission-modal" role="dialog" aria-modal="true">' +
        '<div class="submission-modal-head">' +
          '<div><span class="submission-kicker" id="submissionModalType"></span><h3 id="submissionModalTitle"></h3></div>' +
          '<button class="submission-modal-close" type="button" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="submission-modal-body" id="submissionModalBody"></div>' +
      '</div>';
    document.body.appendChild(modal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.closest(".submission-modal-close")) {
        modal.classList.add("hidden");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") modal.classList.add("hidden");
    });
    return modal;
  }

  function openSubmissionModal(kind, id) {
    var row = getRowById(kind, id);
    if (!row) return;
    markSubmissionViewed(kind, id);

    var modal = ensureSubmissionModal();
    var date = formatDateParts(row.created_at);
    document.getElementById("submissionModalType").textContent = submissionConfig[kind].subtitle;
    document.getElementById("submissionModalTitle").textContent = row.name || "Submission";
    document.getElementById("submissionModalBody").innerHTML =
      '<div class="submission-modal-status">' +
        '<span class="submission-status-pill status-pill-' + escapeHtml(normalizeStatus(row.status)) + '">' + escapeHtml(statusText(row.status)) + '</span>' +
        '<span>Date: <b>' + escapeHtml(date.date) + '</b></span>' +
        '<span>Time: <b>' + escapeHtml(date.time) + '</b></span>' +
      '</div>' +
      '<div class="submission-modal-grid">' + submissionConfig[kind].fields.map(function (field) {
        var value = fieldValueHtml(row, field[1]);
        return '<div><span>' + escapeHtml(field[0]) + '</span><strong>' + value + '</strong></div>';
      }).join("") + '</div>';
    modal.classList.remove("hidden");
  }

  function exportRows(kind) {
    return getFilteredRows(kind).map(function (row) {
      var date = formatDateParts(row.created_at);
      var base = {
        id: row.id || "",
        status: statusText(row.status),
        date: date.date,
        time: date.time
      };
      submissionConfig[kind].fields.forEach(function (field) {
        base[field[0]] = fieldValueText(row, field[1]);
      });
      return base;
    });
  }

  function csvValue(value) {
    return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"';
  }

  function exportSubmissionsCsv(kind) {
    var rows = exportRows(kind);
    if (!rows.length) {
      alert("No rows to export.");
      return;
    }
    var headers = Object.keys(rows[0]);
    var csv = [headers.map(csvValue).join(",")].concat(rows.map(function (row) {
      return headers.map(function (key) { return csvValue(row[key]); }).join(",");
    })).join("\r\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gobright-" + kind + "-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
  }

  function exportSubmissionsPdf(kind) {
    var rows = exportRows(kind);
    if (!rows.length) {
      alert("No rows to export.");
      return;
    }
    var headers = Object.keys(rows[0]);
    var win = window.open("", "_blank");
    if (!win) {
      alert("Allow popups to export PDF.");
      return;
    }
    var tableRows = rows.map(function (row) {
      return "<tr>" + headers.map(function (key) {
        return "<td>" + escapeHtml(row[key]) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    win.document.write('<!doctype html><html><head><title>GoBright ' + escapeHtml(submissionConfig[kind].title) + '</title>' +
      '<style>body{font-family:Arial,sans-serif;margin:0;background:#111827;color:#111}header{background:linear-gradient(135deg,#e32028,#111827);color:#fff;padding:28px}h1{margin:0;font-size:28px}.meta{opacity:.85;margin-top:6px}.wrap{padding:22px;background:#f8fafc}table{width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 12px 35px rgba(15,23,42,.16)}th{background:#111827;color:#fff;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.06em;padding:12px}td{padding:11px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;vertical-align:top}tr:nth-child(even) td{background:#fff5f5}tr:last-child td{border-bottom:0}@media print{body{background:#fff}.wrap{padding:0}header{print-color-adjust:exact;-webkit-print-color-adjust:exact}table{box-shadow:none}th{print-color-adjust:exact;-webkit-print-color-adjust:exact}}</style>' +
      '</head><body><header><h1>GoBright ' + escapeHtml(submissionConfig[kind].title) + '</h1><div class="meta">Exported ' + escapeHtml(new Date().toLocaleString("en-IN")) + ' | Rows: ' + rows.length + '</div></header><div class="wrap"><table><thead><tr>' +
      headers.map(function (key) { return "<th>" + escapeHtml(key) + "</th>"; }).join("") +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></body></html>');
    win.document.close();
    win.focus();
    setTimeout(function () { win.print(); }, 350);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSubmissions("leads");
    renderSubmissions("careers");
    updateSubmissionStats();

    var logout = document.getElementById("logoutBtn");
    if (logout) {
      logout.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var body = new FormData();
        body.set("csrf_token", window.GB_CSRF_TOKEN);
        fetch(window.GB_BASE_URL + "/admin/logout", { method: "POST", body: body })
          .finally(function () {
            sessionStorage.removeItem("gobright_admin");
            window.location.href = "index";
          });
      }, true);
    }
  });
}());
