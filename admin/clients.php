<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GoBright Admin | Clients</title>
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
          <h1 class="dashboard-title">Clients</h1>
        </div>
        <div class="header-right">
          <span class="online-badge">&#9679; System Online</span>
          <div class="user-avatar">WA</div>
        </div>
      </header>

      <section class="section active" id="section-clients">
        <div class="page-header">
          <div>
            <p class="page-header-label">ADMIN PANEL</p>
            <h2 class="page-header-title">Clients</h2>
            <p class="page-header-sub">Manage client logos shown on the website</p>
          </div>
          <button class="btn-add" id="addClientBtn" type="button">+ Add Client</button>
        </div>
        <div class="panel-box">
          <div class="sub-panel-head">
            <span class="sub-panel-title">All Clients</span>
            <span class="item-count" id="clientsCount">0</span>
          </div>
          <div class="admin-collection-body" id="clientsGrid"></div>
        </div>
      </section>

    </div>
  </div>

  <!-- ── Add Client Modal ── -->
  <div class="modal-overlay hidden" id="addClientModal">
    <div class="modal">
      <div class="modal-head">
        <h3 id="clientModalTitle">Add New Client</h3>
        <button class="modal-close" id="closeClientModal" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="field">
          <label for="clientName">Client Name</label>
          <input id="clientName" type="text" placeholder="e.g. Jayaraj Industries">
        </div>
        <div class="field">
          <label>Client Logo</label>
          <label class="upload-area" id="uploadArea" for="clientImageInput">
            <input type="file" accept="image/*" id="clientImageInput" class="upload-input">
            <div id="uploadPlaceholder" class="upload-placeholder">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
              <p>Click to upload image</p>
              <p class="upload-hint">PNG, JPG, WebP supported</p>
            </div>
            <img id="imagePreview" class="image-preview hidden" alt="Preview">
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cancelClientBtn" type="button">Cancel</button>
        <button class="btn-save"   id="saveClientBtn"   type="button">Save Client</button>
      </div>
    </div>
  </div>

  <script>window.GB_BASE_URL=<?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>;window.GB_CSRF_TOKEN=<?= json_encode(csrf_token()) ?>;</script>
<script>window.GB_ADMIN_INITIAL=<?= json_encode(admin_payload(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;</script>
<script src="../assets/js/admin-backend-bridge.js"></script>
<script src="../assets/js/admin-common.js"></script>
  <script>
    var selectedImage = null;
    var editingClientId = null;

    function clientExportRows(rows) {
      return rows.map(function (c) {
        var date = adminDateParts(c.created_at);
        return {
          ID: c.id || "",
          Name: c.name || "",
          Logo: c.img || "",
          Date: date.date,
          Time: date.time
        };
      });
    }

    function openClientView(client) {
      var date = adminDateParts(client.created_at);
      openAdminViewModal(client.name || "Client", [
        { label: "Logo", html: client.img ? '<img class="admin-detail-image" src="' + esc(client.img) + '" alt="' + esc(client.name) + '">' : '<strong>-</strong>' },
        { label: "Client Name", value: client.name },
        { label: "Date", value: date.date },
        { label: "Time", value: date.time },
        { label: "Image URL", value: client.img, full: true }
      ]);
    }

    function renderClients() {
      var clients = loadClients();
      var grid    = document.getElementById("clientsGrid");
      var countEl = document.getElementById("clientsCount");
      if (countEl) countEl.textContent = clients.length;

      if (!clients.length) {
        grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">No clients yet. Click <strong>+ Add Client</strong> to add the first one.</div>';
        return;
      }

      grid.innerHTML =
        '<div class="admin-export-bar">' +
          '<button class="admin-export-btn csv" type="button" data-export-clients="csv">' + adminIcon("csv") + 'CSV</button>' +
          '<button class="admin-export-btn pdf" type="button" data-export-clients="pdf">' + adminIcon("pdf") + 'PDF</button>' +
        '</div>' +
        '<div class="admin-table-wrap"><table class="admin-data-table">' +
          '<thead><tr><th>Logo</th><th>Client</th><th>Date</th><th>Time</th><th>Actions</th></tr></thead><tbody>' +
          clients.map(function (c) {
            var date = adminDateParts(c.created_at);
            return (
              '<tr>' +
                '<td><img class="admin-table-thumb admin-table-logo" src="' + esc(c.img) + '" alt="' + esc(c.name) + '"></td>' +
                '<td><strong class="admin-row-title">' + esc(c.name) + '</strong><span class="admin-row-sub">' + esc(c.id) + '</span></td>' +
                '<td>' + esc(date.date) + '</td>' +
                '<td>' + esc(date.time) + '</td>' +
                '<td><div class="admin-table-actions">' +
                  '<button class="admin-icon-btn view" data-view="' + esc(c.id) + '" type="button" title="View">' + adminIcon("view") + '</button>' +
                  '<button class="admin-icon-btn edit" data-edit="' + esc(c.id) + '" type="button" title="Edit">' + adminIcon("edit") + '</button>' +
                  '<button class="admin-icon-btn delete" data-del="' + esc(c.id) + '" type="button" title="Delete">' + adminIcon("trash") + '</button>' +
                '</div></td>' +
              '</tr>'
            );
          }).join("") +
          '</tbody></table></div>';

      grid.querySelectorAll("[data-export-clients]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var rows = clientExportRows(loadClients());
          if (btn.dataset.exportClients === "csv") adminExportCsv("gobright-clients", rows);
          if (btn.dataset.exportClients === "pdf") adminExportPdf("GoBright Clients", rows);
        });
      });

      grid.querySelectorAll("[data-view]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var client = loadClients().find(function (x) { return x.id === btn.dataset.view; });
          if (client) openClientView(client);
        });
      });

      grid.querySelectorAll("[data-edit]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var client = loadClients().find(function (x) { return x.id === btn.dataset.edit; });
          if (client) openModal(client);
        });
      });

      grid.querySelectorAll("[data-del]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var clients = loadClients();
          var c = clients.find(function (x) { return x.id === btn.dataset.del; });
          openAdminConfirmModal({
            title: "Delete Client",
            message: 'Delete "' + (c ? c.name : "this client") + '" from database?',
            onConfirm: function () {
              saveClients(clients.filter(function (x) { return x.id !== btn.dataset.del; }));
              renderClients();
            }
          });
        });
      });
    }

    function openModal(client) {
      editingClientId = client ? client.id : null;
      selectedImage = client && client.img ? client.img : null;
      document.getElementById("clientModalTitle").textContent = client ? "Edit Client" : "Add New Client";
      document.getElementById("saveClientBtn").textContent = client ? "Save Changes" : "Save Client";
      document.getElementById("clientName").value = client ? client.name : "";
      document.getElementById("clientImageInput").value = "";
      var preview = document.getElementById("imagePreview");
      var placeholder = document.getElementById("uploadPlaceholder");
      if (selectedImage) {
        preview.src = selectedImage;
        preview.classList.remove("hidden");
        placeholder.classList.add("hidden");
      } else {
        preview.removeAttribute("src");
        preview.classList.add("hidden");
        placeholder.classList.remove("hidden");
      }
      document.getElementById("addClientModal").classList.remove("hidden");
      document.getElementById("clientName").focus();
    }

    function closeModal() {
      document.getElementById("addClientModal").classList.add("hidden");
      editingClientId = null;
      selectedImage = null;
    }

    document.getElementById("addClientBtn").addEventListener("click", function () { openModal(null); });
    document.getElementById("closeClientModal").addEventListener("click", closeModal);
    document.getElementById("cancelClientBtn").addEventListener("click", closeModal);
    document.getElementById("addClientModal").addEventListener("click", function (e) {
      if (e.target === this) closeModal();
    });

    document.getElementById("clientImageInput").addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (ev) {
        selectedImage = ev.target.result;
        var preview = document.getElementById("imagePreview");
        preview.src = selectedImage;
        preview.classList.remove("hidden");
        document.getElementById("uploadPlaceholder").classList.add("hidden");
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("saveClientBtn").addEventListener("click", function () {
      var name = document.getElementById("clientName").value.trim();
      if (!name)          { alert("Please enter the client name."); return; }
      if (!selectedImage) { alert("Please select a client logo.");  return; }
      var clients = loadClients();
      if (editingClientId) {
        var clientIndex = clients.findIndex(function (client) { return client.id === editingClientId; });
        if (clientIndex === -1) {
          alert("Client not found. Please refresh and try again.");
          return;
        }
        clients[clientIndex] = Object.assign({}, clients[clientIndex], {
          name: name,
          img: selectedImage
        });
      } else {
        clients.push({ id: uid(), name: name, img: selectedImage, created_at: adminNowDateTime() });
      }
      saveClients(clients);
      closeModal();
      renderClients();
    });

    renderClients();
  </script>
</body>
</html>
