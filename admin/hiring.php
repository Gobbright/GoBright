<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GoBright Admin | Hiring</title>
  <link rel="icon" type="image/png" href="../website_favicon.png">
  <link rel="stylesheet" href="../assets/css/admin.css">
  <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body>
  <div class="admin-layout">

    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="../assets/img/logo.png" alt="GoBright">
      </div>
      <p class="sidebar-label">ADMIN PANEL</p>
      <nav class="sidebar-nav">
        <a href="overview" class="nav-item" data-page="overview">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Overview
        </a>
        <a href="clients" class="nav-item" data-page="clients">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20M9 21V9"/></svg>
          Clients
        </a>
        <a href="reviews" class="nav-item" data-page="reviews">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Google Reviews
        </a>
        <a href="employees" class="nav-item" data-page="employees">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Employees
        </a>
        <a href="hiring" class="nav-item" data-page="hiring">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          Hiring
        </a>
        <a href="careers" class="nav-item" data-page="careers">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Careers Data
        </a>
        <a href="leads" class="nav-item" data-page="leads">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Lead Form Data
        </a>
      </nav>
      <div class="sidebar-footer">
        <button id="logoutBtn" class="sign-out-btn" type="button">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <div class="main-wrap">

      <header class="main-header">
        <button class="mobile-menu-btn" type="button">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>        <div>
          <h1 class="dashboard-title">Hiring</h1>
        </div>
        <div class="header-right">
          <span class="online-badge">&#9679; System Online</span>
          <div class="user-avatar">WA</div>
        </div>
      </header>

      <section class="section active" id="section-hiring">
        <div class="page-header">
          <div>
            <p class="page-header-label">ADMIN PANEL</p>
            <h2 class="page-header-title">Hiring</h2>
            <p class="page-header-sub">Manage job openings shown on the Careers page</p>
          </div>
          <button class="btn-add" id="addJobBtn" type="button">+ Add Job</button>
        </div>
        <div class="panel-box">
          <div class="sub-panel-head">
            <span class="sub-panel-title">Job Openings</span>
            <span class="item-count" id="jobsCount">0</span>
          </div>
          <div class="jobs-list" id="jobsList"></div>
        </div>
      </section>

    </div>
  </div>

  <!-- ── Add / Edit Job Modal ── -->
  <div class="modal-overlay hidden" id="jobModal">
    <div class="modal review-modal">
      <div class="modal-head">
        <h3 id="jobModalTitle">Add Job Opening</h3>
        <button class="modal-close-circle" id="closeJobModal" type="button">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="field">
          <label for="jobTitle">JOB TITLE <span class="req">*</span></label>
          <input id="jobTitle" type="text" placeholder="e.g. Graphic Designer">
        </div>
        <div class="form-row-2">
          <div class="field">
            <label for="jobType">JOB TYPE</label>
            <select id="jobType">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div class="field">
            <label for="jobExp">EXPERIENCE</label>
            <input id="jobExp" type="text" placeholder="e.g. 0-3 years">
          </div>
        </div>
        <div class="field">
          <label for="jobDesc">SUMMARY</label>
          <textarea id="jobDesc" rows="3" placeholder="Short job description..."></textarea>
        </div>
        <div class="field">
          <label>REQUIREMENTS</label>
          <div class="req-inputs">
            <input class="job-req-input" type="text" placeholder="Requirement 1">
            <input class="job-req-input" type="text" placeholder="Requirement 2">
            <input class="job-req-input" type="text" placeholder="Requirement 3">
            <input class="job-req-input" type="text" placeholder="Requirement 4">
            <input class="job-req-input" type="text" placeholder="Requirement 5">
          </div>
        </div>
        <label class="job-active-check">
          <input type="checkbox" id="jobActive" checked>
          <span class="check-box"></span>
          <span class="check-label">Active — visible on Careers page</span>
        </label>
      </div>
      <div class="modal-footer-review">
        <button class="btn-save-review" id="saveJobBtn" type="button">Add Job</button>
        <button class="btn-cancel-review" id="cancelJobBtn" type="button">Cancel</button>
      </div>
    </div>
  </div>

  <script>window.GB_BASE_URL=<?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>;window.GB_CSRF_TOKEN=<?= json_encode(csrf_token()) ?>;</script>
<script>window.GB_ADMIN_INITIAL=<?= json_encode(admin_payload(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;</script>
<script src="../assets/js/admin-backend-bridge.js"></script>
<script src="../assets/js/admin-common.js"></script>
  <script>
    var editingJobId = null;

    function jobExportRows(rows) {
      return rows.map(function (j) {
        var date = adminDateParts(j.created_at);
        return {
          ID: j.id || "",
          Title: j.title || "",
          Type: j.type || "",
          Experience: j.experience || "",
          Status: j.status || "Active",
          Description: j.description || "",
          Requirements: (j.requirements || []).filter(Boolean).join(", "),
          Date: date.date,
          Time: date.time
        };
      });
    }

    function openJobView(job) {
      var date = adminDateParts(job.created_at);
      openAdminViewModal(job.title || "Job Opening", [
        { label: "Title", value: job.title },
        { label: "Type", value: job.type },
        { label: "Experience", value: job.experience },
        { label: "Status", value: job.status || "Active" },
        { label: "Date", value: date.date },
        { label: "Time", value: date.time },
        { label: "Description", value: job.description, full: true },
        { label: "Requirements", value: (job.requirements || []).filter(Boolean).join(", "), full: true }
      ]);
    }

    function jobTypeCls(type) {
      var t = (type || "").toLowerCase().replace(/[^a-z]/g, "");
      if (t === "fulltime")   return "job-type-fulltime";
      if (t === "parttime")   return "job-type-parttime";
      if (t === "internship") return "job-type-internship";
      if (t === "contract")   return "job-type-contract";
      return "job-type-fulltime";
    }

    function renderJobs() {
      var jobs    = loadJobs();
      var list    = document.getElementById("jobsList");
      var countEl = document.getElementById("jobsCount");
      if (countEl) countEl.textContent = jobs.length;

      if (!jobs.length) {
        list.innerHTML = '<div class="empty-state">No job openings yet. Click <strong>+ Add Job</strong> to create one.</div>';
        return;
      }

      list.innerHTML =
        '<div class="admin-export-bar">' +
          '<button class="admin-export-btn csv" type="button" data-export-jobs="csv">' + adminIcon("csv") + 'CSV</button>' +
          '<button class="admin-export-btn pdf" type="button" data-export-jobs="pdf">' + adminIcon("pdf") + 'PDF</button>' +
        '</div>' +
        '<div class="admin-table-wrap"><table class="admin-data-table">' +
          '<thead><tr><th>Job</th><th>Type</th><th>Status</th><th>Date</th><th>Time</th><th>Actions</th></tr></thead><tbody>' +
          jobs.map(function (j) {
            var reqs = (j.requirements || []).filter(Boolean);
            var statusCls = j.status === "Inactive" ? "status-inactive" : "status-active";
            var date = adminDateParts(j.created_at);
            return (
              '<tr>' +
                '<td><strong class="admin-row-title">' + esc(j.title) + '</strong><span class="admin-row-sub">' + esc(j.description || "-") + '</span></td>' +
                '<td><span class="job-type-badge ' + jobTypeCls(j.type) + '">' + esc(j.type) + '</span>' + (j.experience ? '<span class="admin-row-sub">' + esc(j.experience) + '</span>' : '') + '</td>' +
                '<td><span class="emp-status ' + statusCls + '">' + esc(j.status) + '</span></td>' +
                '<td>' + esc(date.date) + '</td>' +
                '<td>' + esc(date.time) + '</td>' +
                '<td><div class="admin-table-actions">' +
                  '<button class="admin-icon-btn view" data-view-job="' + esc(j.id) + '" type="button" title="View">' + adminIcon("view") + '</button>' +
                  '<button class="admin-icon-btn edit job-edit-btn" data-edit="' + esc(j.id) + '" type="button" title="Edit">' + adminIcon("edit") + '</button>' +
                  '<button class="admin-icon-btn delete" data-jdel="' + esc(j.id) + '" type="button" title="Delete">' + adminIcon("trash") + '</button>' +
                '</div><span class="admin-row-sub">' + reqs.length + ' requirement' + (reqs.length !== 1 ? 's' : '') + '</span></td>' +
              '</tr>'
            );
          }).join("") +
          '</tbody></table></div>';

      list.querySelectorAll("[data-export-jobs]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var rows = jobExportRows(loadJobs());
          if (btn.dataset.exportJobs === "csv") adminExportCsv("gobright-jobs", rows);
          if (btn.dataset.exportJobs === "pdf") adminExportPdf("GoBright Job Openings", rows);
        });
      });

      list.querySelectorAll("[data-view-job]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var job = loadJobs().find(function (j) { return j.id === btn.dataset.viewJob; });
          if (job) openJobView(job);
        });
      });

      list.querySelectorAll(".job-edit-btn").forEach(function (btn) {
        btn.addEventListener("click", function () { openJobModal(btn.dataset.edit); });
      });

      list.querySelectorAll("[data-jdel]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var jobs = loadJobs();
          var j = jobs.find(function (x) { return x.id === btn.dataset.jdel; });
          openAdminConfirmModal({
            title: "Delete Job",
            message: 'Delete "' + (j ? j.title : "this job") + '" from database?',
            onConfirm: function () {
              saveJobs(jobs.filter(function (x) { return x.id !== btn.dataset.jdel; }));
              renderJobs();
            }
          });
        });
      });
      return;

      list.innerHTML = jobs.map(function (j) {
        var reqs      = (j.requirements || []).filter(Boolean);
        var statusCls = j.status === "Inactive" ? "status-inactive" : "status-active";
        return (
          '<div class="job-row">' +
            '<div class="job-row-top">' +
              '<span class="job-title">' + esc(j.title) + '</span>' +
              '<span class="job-type-badge ' + jobTypeCls(j.type) + '">' + esc(j.type) + '</span>' +
              (j.experience ? '<span class="job-exp-badge">' + esc(j.experience) + '</span>' : '') +
              '<span class="emp-status ' + statusCls + '">● ' + esc(j.status) + '</span>' +
            '</div>' +
            '<div class="job-row-meta">' +
              '<div class="job-body">' +
                '<div class="job-desc">' + esc(j.description) + '</div>' +
                (reqs.length ? '<div class="job-reqs-count">' + reqs.length + ' requirement' + (reqs.length !== 1 ? 's' : '') + '</div>' : '') +
              '</div>' +
              '<div class="job-actions">' +
                '<button class="btn-edit job-edit-btn" data-edit="' + esc(j.id) + '" type="button">Edit</button>' +
                '<button class="btn-delete-red" data-jdel="' + esc(j.id) + '" type="button">Delete</button>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join("");

      list.querySelectorAll(".job-edit-btn").forEach(function (btn) {
        btn.addEventListener("click", function () { openJobModal(btn.dataset.edit); });
      });

      list.querySelectorAll("[data-jdel]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var jobs = loadJobs();
          var j    = jobs.find(function (x) { return x.id === btn.dataset.jdel; });
          openAdminConfirmModal({
            title: "Delete Job",
            message: 'Delete "' + (j ? j.title : "this job") + '" from database?',
            onConfirm: function () {
              saveJobs(jobs.filter(function (x) { return x.id !== btn.dataset.jdel; }));
              renderJobs();
            }
          });
        });
      });
    }

    function getReqInputs() {
      return Array.from(document.querySelectorAll(".job-req-input"));
    }

    function openJobModal(editId) {
      editingJobId = editId || null;
      var title   = document.getElementById("jobModalTitle");
      var saveBtn = document.getElementById("saveJobBtn");
      title.textContent   = editId ? "Edit Job Opening" : "Add Job Opening";
      saveBtn.textContent = editId ? "Save Changes"     : "Add Job";

      if (editId) {
        var j = loadJobs().find(function (x) { return x.id === editId; });
        if (j) {
          document.getElementById("jobTitle").value = j.title;
          document.getElementById("jobType").value  = j.type;
          document.getElementById("jobExp").value   = j.experience || "";
          document.getElementById("jobDesc").value  = j.description;
          document.getElementById("jobActive").checked = j.status !== "Inactive";
          getReqInputs().forEach(function (inp, i) {
            inp.value = (j.requirements || [])[i] || "";
          });
        }
      } else {
        document.getElementById("jobTitle").value = "";
        document.getElementById("jobType").value  = "Full-time";
        document.getElementById("jobExp").value   = "";
        document.getElementById("jobDesc").value  = "";
        document.getElementById("jobActive").checked = true;
        getReqInputs().forEach(function (inp) { inp.value = ""; });
      }
      document.getElementById("jobModal").classList.remove("hidden");
    }

    function closeJobModal() {
      document.getElementById("jobModal").classList.add("hidden");
      editingJobId = null;
    }

    document.getElementById("addJobBtn").addEventListener("click", function () { openJobModal(); });
    document.getElementById("closeJobModal").addEventListener("click", closeJobModal);
    document.getElementById("cancelJobBtn").addEventListener("click", closeJobModal);
    document.getElementById("jobModal").addEventListener("click", function (e) {
      if (e.target === this) closeJobModal();
    });

    document.getElementById("saveJobBtn").addEventListener("click", function () {
      var title  = document.getElementById("jobTitle").value.trim();
      var type   = document.getElementById("jobType").value;
      var exp    = document.getElementById("jobExp").value.trim();
      var desc   = document.getElementById("jobDesc").value.trim();
      var active = document.getElementById("jobActive").checked;
      var status = active ? "Active" : "Inactive";
      var reqs   = getReqInputs().map(function (inp) { return inp.value.trim(); }).filter(Boolean);

      if (!title) { alert("Please enter the job title."); return; }

      var jobs = loadJobs();
      if (editingJobId) {
        jobs = jobs.map(function (j) {
          return j.id === editingJobId
            ? { id: j.id, title: title, type: type, experience: exp, status: status, description: desc, requirements: reqs, created_at: j.created_at || adminNowDateTime() }
            : j;
        });
      } else {
        jobs.push({ id: uid(), title: title, type: type, experience: exp, status: status, description: desc, requirements: reqs, created_at: adminNowDateTime() });
      }
      saveJobs(jobs);
      closeJobModal();
      renderJobs();
    });

    renderJobs();
  </script>
</body>
</html>
