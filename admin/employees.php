<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GoBright Admin | Employees</title>
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
          <h1 class="dashboard-title">Employees</h1>
        </div>
        <div class="header-right">
          <span class="online-badge">&#9679; System Online</span>
          <div class="user-avatar">WA</div>
        </div>
      </header>

      <section class="section active" id="section-employees">
        <div class="page-header">
          <div>
            <p class="page-header-label">ADMIN PANEL</p>
            <h2 class="page-header-title">Employees</h2>
            <p class="page-header-sub">Manage team members — photos show on website</p>
          </div>
          <button class="btn-add" id="addEmployeeBtn" type="button">+ Add Employee</button>
        </div>
        <input class="search-input" id="empSearch" type="text" placeholder="Search by name, role or ID...">
        <div class="panel-box" style="margin-top:16px">
          <div class="sub-panel-head">
            <span class="sub-panel-title">Team Members</span>
            <span class="item-count" id="employeesCount">0</span>
          </div>
          <div class="employees-list" id="employeesList"></div>
        </div>
      </section>

    </div>
  </div>

  <!-- ── Add / Edit Employee Modal ── -->
  <div class="modal-overlay hidden" id="employeeModal">
    <div class="modal review-modal">
      <div class="modal-head">
        <h3 id="empModalTitle">Add Employee</h3>
        <button class="modal-close-circle" id="closeEmployeeModal" type="button">&#10005;</button>
      </div>
      <div class="modal-body">
        <!-- profile photo -->
        <div class="field">
          <label>PROFILE PHOTO</label>
          <div class="emp-photo-row">
            <div class="emp-photo-thumb" id="empPhotoThumb">
              <img id="empImagePreview" class="hidden" alt="Preview">
              <svg id="empPhotoIcon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <label class="btn-choose-photo" for="empImageInput">Choose Photo</label>
            <input type="file" accept="image/*" id="empImageInput" style="display:none">
          </div>
        </div>
        <!-- employee id + full name -->
        <div class="form-row-2">
          <div class="field">
            <label for="empIdField">EMPLOYEE ID</label>
            <input id="empIdField" type="text" placeholder="GB2026010" readonly>
          </div>
          <div class="field">
            <label for="empName">FULL NAME <span class="req">*</span></label>
            <input id="empName" type="text" placeholder="Employee name">
          </div>
        </div>
        <!-- role + expertise -->
        <div class="form-row-2">
          <div class="field">
            <label for="empRole">ROLE / POSITION <span class="req">*</span></label>
            <input id="empRole" type="text" placeholder="e.g. Graphic Designer">
          </div>
          <div class="field">
            <label for="empExpertise">EXPERTISE</label>
            <input id="empExpertise" type="text" placeholder="e.g. Brand Strategy">
          </div>
        </div>
        <!-- password + status -->
        <div class="form-row-2">
          <div class="field">
            <label for="empPassword">LOGIN PASSWORD</label>
            <input id="empPassword" type="password" placeholder="Min 6 characters">
          </div>
          <div class="field">
            <label for="empStatus">STATUS</label>
            <select id="empStatus">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer-review">
        <button class="btn-save-review" id="saveEmployeeBtn" type="button">Add Employee</button>
        <button class="btn-cancel-review" id="cancelEmployeeBtn" type="button">Cancel</button>
      </div>
    </div>
  </div>

  <script>window.GB_BASE_URL=<?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>;window.GB_CSRF_TOKEN=<?= json_encode(csrf_token()) ?>;</script>
<script>window.GB_ADMIN_INITIAL=<?= json_encode(admin_payload(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;</script>
<script src="../assets/js/admin-backend-bridge.js"></script>
<script src="../assets/js/admin-common.js"></script>
  <script>
    var editingEmployeeId = null;
    var selectedEmpImage  = null;

    function employeeExportRows(rows) {
      return rows.map(function (e) {
        var date = adminDateParts(e.created_at);
        return {
          ID: e.id || "",
          "Employee ID": e.empId || "",
          Name: e.name || "",
          Role: e.role || "",
          Expertise: e.expertise || "",
          Status: e.status || "active",
          Photo: e.photo || "",
          Date: date.date,
          Time: date.time
        };
      });
    }

    function openEmployeeView(emp) {
      var date = adminDateParts(emp.created_at);
      openAdminViewModal(emp.name || "Employee", [
        { label: "Photo", html: emp.photo ? '<img class="admin-detail-image" src="' + esc(emp.photo) + '" alt="' + esc(emp.name) + '">' : '<strong>-</strong>' },
        { label: "Employee ID", value: emp.empId },
        { label: "Name", value: emp.name },
        { label: "Role", value: emp.role },
        { label: "Expertise", value: emp.expertise },
        { label: "Status", value: emp.status || "active" },
        { label: "Date", value: date.date },
        { label: "Time", value: date.time },
        { label: "Photo URL", value: emp.photo || "-", full: true }
      ]);
    }

    function setEmpPhotoThumb(src) {
      var prev = document.getElementById("empImagePreview");
      var icon = document.getElementById("empPhotoIcon");
      if (src) {
        prev.src = src;
        prev.classList.remove("hidden");
        if (icon) icon.style.display = "none";
      } else {
        prev.classList.add("hidden");
        if (icon) icon.style.display = "";
      }
    }

    function nextEmpId() {
      var emps = loadEmployees();
      if (!emps.length) return "GB2026001";
      var nums = emps.map(function (e) { return parseInt((e.empId || "GB2026000").slice(2)) || 0; });
      return "GB" + String(Math.max.apply(null, nums) + 1).padStart(7, "0");
    }

    function renderEmployees(filter) {
      var emps    = loadEmployees();
      var list    = document.getElementById("employeesList");
      var countEl = document.getElementById("employeesCount");
      if (countEl) countEl.textContent = emps.length;

      var q = (filter || "").toLowerCase();
      var filtered = q ? emps.filter(function (e) {
        return (e.name  || "").toLowerCase().indexOf(q) !== -1 ||
               (e.role  || "").toLowerCase().indexOf(q) !== -1 ||
               (e.empId || "").toLowerCase().indexOf(q) !== -1;
      }) : emps;

      if (!filtered.length) {
        list.innerHTML = '<div class="empty-state">' +
          (q ? 'No employees match "' + esc(q) + '"' :
               'No employees yet. Click <strong>+ Add Employee</strong> to add the first one.') +
          '</div>';
        return;
      }

      list.innerHTML =
        '<div class="admin-export-bar">' +
          '<button class="admin-export-btn csv" type="button" data-export-employees="csv">' + adminIcon("csv") + 'CSV</button>' +
          '<button class="admin-export-btn pdf" type="button" data-export-employees="pdf">' + adminIcon("pdf") + 'PDF</button>' +
        '</div>' +
        '<div class="admin-table-wrap"><table class="admin-data-table">' +
          '<thead><tr><th>Employee</th><th>Role</th><th>Status</th><th>Date</th><th>Time</th><th>Actions</th></tr></thead><tbody>' +
          filtered.map(function (e) {
            var initial = (e.name || "?").replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, "").charAt(0).toUpperCase();
            var color = avatarColor(e.name);
            var photoHtml = e.photo
              ? '<img src="' + esc(e.photo) + '" alt="' + esc(e.name) + '" class="admin-table-thumb">'
              : '<div class="admin-table-thumb emp-avatar" style="background:' + color + '">' + esc(initial) + '</div>';
            var statusCls = e.status === "inactive" ? "status-inactive" : "status-active";
            var statusLbl = e.status === "inactive" ? "inactive" : "active";
            var date = adminDateParts(e.created_at);
            return (
              '<tr>' +
                '<td><div class="admin-cell-main">' + photoHtml + '<div><strong class="admin-row-title">' + esc(e.name) + '</strong><span class="admin-row-sub">' + esc(e.empId) + '</span></div></div></td>' +
                '<td><strong class="admin-row-title">' + esc(e.role) + '</strong><span class="admin-row-sub">' + esc(e.expertise || "-") + '</span></td>' +
                '<td><span class="emp-status ' + statusCls + '">' + esc(statusLbl) + '</span></td>' +
                '<td>' + esc(date.date) + '</td>' +
                '<td>' + esc(date.time) + '</td>' +
                '<td><div class="admin-table-actions">' +
                  '<button class="admin-icon-btn view" data-view-emp="' + esc(e.id) + '" type="button" title="View">' + adminIcon("view") + '</button>' +
                  '<button class="admin-icon-btn edit emp-edit-btn" data-edit="' + esc(e.id) + '" type="button" title="Edit">' + adminIcon("edit") + '</button>' +
                  '<button class="admin-icon-btn delete" data-del="' + esc(e.id) + '" type="button" title="Delete">' + adminIcon("trash") + '</button>' +
                '</div></td>' +
              '</tr>'
            );
          }).join("") +
          '</tbody></table></div>';

      list.querySelectorAll("[data-export-employees]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var rows = employeeExportRows(filtered);
          if (btn.dataset.exportEmployees === "csv") adminExportCsv("gobright-employees", rows);
          if (btn.dataset.exportEmployees === "pdf") adminExportPdf("GoBright Employees", rows);
        });
      });

      list.querySelectorAll("[data-view-emp]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var emp = loadEmployees().find(function (e) { return e.id === btn.dataset.viewEmp; });
          if (emp) openEmployeeView(emp);
        });
      });

      list.querySelectorAll(".emp-edit-btn").forEach(function (btn) {
        btn.addEventListener("click", function () { openEmployeeModal(btn.dataset.edit); });
      });

      list.querySelectorAll("[data-del]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var emps = loadEmployees();
          var emp = emps.find(function (e) { return e.id === btn.dataset.del; });
          openAdminConfirmModal({
            title: "Delete Employee",
            message: 'Delete "' + (emp ? emp.name : "this employee") + '" from database?',
            onConfirm: function () {
              saveEmployees(emps.filter(function (e) { return e.id !== btn.dataset.del; }));
              renderEmployees(document.getElementById("empSearch").value);
            }
          });
        });
      });
      return;

      list.innerHTML = filtered.map(function (e) {
        var initial   = (e.name || "?").replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, "").charAt(0).toUpperCase();
        var color     = avatarColor(e.name);
        var photoHtml = e.photo
          ? '<img src="' + esc(e.photo) + '" alt="' + esc(e.name) + '" class="emp-photo">'
          : '<div class="emp-avatar" style="background:' + color + '">' + initial + '</div>';
        var statusCls = e.status === "inactive" ? "status-inactive" : "status-active";
        var statusLbl = e.status === "inactive" ? "inactive" : "active";
        return (
          '<div class="emp-row">' +
            '<div class="emp-photo-wrap">' + photoHtml + '</div>' +
            '<div class="emp-info">' +
              '<div class="emp-name">' + esc(e.name) + '</div>' +
              '<div class="emp-role">' + esc(e.role) + '</div>' +
            '</div>' +
            '<div class="emp-actions">' +
              '<span class="emp-id-text">' + esc(e.empId) + '</span>' +
              '<span class="emp-status ' + statusCls + '">● ' + statusLbl + '</span>' +
              (e.photo ? '<span class="emp-photo-badge">● Photo</span>' : '') +
              '<button class="btn-edit emp-edit-btn" data-edit="' + esc(e.id) + '" type="button">Edit</button>' +
              '<button class="btn-delete-red" data-del="' + esc(e.id) + '" type="button">Delete</button>' +
            '</div>' +
          '</div>'
        );
      }).join("");

      list.querySelectorAll(".emp-edit-btn").forEach(function (btn) {
        btn.addEventListener("click", function () { openEmployeeModal(btn.dataset.edit); });
      });

      list.querySelectorAll("[data-del]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var emps = loadEmployees();
          var emp  = emps.find(function (e) { return e.id === btn.dataset.del; });
          openAdminConfirmModal({
            title: "Delete Employee",
            message: 'Delete "' + (emp ? emp.name : "this employee") + '" from database?',
            onConfirm: function () {
              saveEmployees(emps.filter(function (e) { return e.id !== btn.dataset.del; }));
              renderEmployees(document.getElementById("empSearch").value);
            }
          });
        });
      });
    }

    function openEmployeeModal(editId) {
      editingEmployeeId = editId || null;
      selectedEmpImage  = null;
      var saveBtn = document.getElementById("saveEmployeeBtn");
      var title   = document.getElementById("empModalTitle");
      title.textContent   = editId ? "Edit Employee" : "Add Employee";
      saveBtn.textContent = editId ? "Save Changes"  : "Add Employee";

      document.getElementById("empImageInput").value = "";
      setEmpPhotoThumb(null);

      if (editId) {
        var emp = loadEmployees().find(function (e) { return e.id === editId; });
        if (emp) {
          document.getElementById("empIdField").value   = emp.empId;
          document.getElementById("empName").value      = emp.name;
          document.getElementById("empRole").value      = emp.role;
          document.getElementById("empExpertise").value = emp.expertise || "";
          document.getElementById("empPassword").value  = "";
          document.getElementById("empStatus").value    = emp.status || "active";
          if (emp.photo) { selectedEmpImage = emp.photo; setEmpPhotoThumb(emp.photo); }
        }
      } else {
        document.getElementById("empIdField").value   = nextEmpId();
        document.getElementById("empName").value      = "";
        document.getElementById("empRole").value      = "";
        document.getElementById("empExpertise").value = "";
        document.getElementById("empPassword").value  = "";
        document.getElementById("empStatus").value    = "active";
      }
      document.getElementById("employeeModal").classList.remove("hidden");
    }

    function closeEmployeeModal() {
      document.getElementById("employeeModal").classList.add("hidden");
      editingEmployeeId = null;
    }

    document.getElementById("addEmployeeBtn").addEventListener("click", function () { openEmployeeModal(); });
    document.getElementById("closeEmployeeModal").addEventListener("click", closeEmployeeModal);
    document.getElementById("cancelEmployeeBtn").addEventListener("click", closeEmployeeModal);
    document.getElementById("employeeModal").addEventListener("click", function (e) {
      if (e.target === this) closeEmployeeModal();
    });

    document.getElementById("empImageInput").addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (ev) {
        selectedEmpImage = ev.target.result;
        setEmpPhotoThumb(selectedEmpImage);
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("saveEmployeeBtn").addEventListener("click", function () {
      var empId     = document.getElementById("empIdField").value.trim();
      var name      = document.getElementById("empName").value.trim();
      var role      = document.getElementById("empRole").value.trim();
      var expertise = document.getElementById("empExpertise").value.trim();
      var password  = document.getElementById("empPassword").value.trim();
      var status    = document.getElementById("empStatus").value;
      if (!name) { alert("Please enter the employee name."); return; }
      if (!role) { alert("Please enter the role/position."); return; }

      var emps = loadEmployees();
      if (editingEmployeeId) {
        emps = emps.map(function (e) {
          if (e.id !== editingEmployeeId) return e;
          return {
            id: e.id, empId: empId, name: name, role: role,
            expertise: expertise, status: status,
            photo: selectedEmpImage || e.photo || "",
            password: password || e.password || "",
            created_at: e.created_at || adminNowDateTime()
          };
        });
      } else {
        emps.push({ id: uid(), empId: empId, name: name, role: role, expertise: expertise, status: status, photo: selectedEmpImage || "", password: password, created_at: adminNowDateTime() });
      }
      saveEmployees(emps);
      closeEmployeeModal();
      renderEmployees(document.getElementById("empSearch").value);
    });

    document.getElementById("empSearch").addEventListener("input", function () {
      renderEmployees(this.value);
    });

    renderEmployees();
  </script>
</body>
</html>
