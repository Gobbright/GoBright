<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GoBright Admin | Overview</title>
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
          <p class="greeting-label" id="greetingText">GOOD MORNING</p>
          <h1 class="dashboard-title">Admin Dashboard</h1>
          <p class="header-date" id="headerDate"></p>
        </div>
        <div class="header-right">
          <span class="online-badge">&#9679; System Online</span>
          <div class="user-avatar">WA</div>
        </div>
      </header>

      <section class="section active" id="section-overview">
        <p class="section-label">OVERVIEW</p>
        <div class="stats-grid" id="statsGrid"></div>

        <p class="section-label" style="margin-top:40px">QUICK ACTIONS</p>
        <div class="quick-actions">
          <button class="action-btn action-blue"  onclick="location.href=''"   type="button">Add Client</button>
          <button class="action-btn action-olive" onclick="location.href=''"   type="button">Add Google Review</button>
          <button class="action-btn action-red"   onclick="location.href=''" type="button">Add Employee</button>
          <button class="action-btn action-purple" onclick="location.href=''" type="button">Add Job Opening</button>
          <button class="action-btn action-green" onclick="location.href=''" type="button">View Leads</button>
          <button class="action-btn action-slate" onclick="location.href=''" type="button">View Applications</button>
        </div>

        <p class="section-label" style="margin-top:40px">LIVE DATA</p>
        <div class="overview-data-grid" id="overviewDataGrid"></div>
      </section>

    </div>
  </div>

  <script>window.GB_BASE_URL=<?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>;window.GB_CSRF_TOKEN=<?= json_encode(csrf_token()) ?>;</script>
<script>window.GB_ADMIN_INITIAL=<?= json_encode(admin_payload(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;</script>
<script src="../assets/js/admin-backend-bridge.js"></script>
<script src="../assets/js/admin-common.js"></script>
  <script>
    /* ── greeting & date ── */
    (function () {
      var h = new Date().getHours();
      var greeting = h >= 5 && h < 12 ? "GOOD MORNING"
                   : h >= 12 && h < 17 ? "GOOD AFTERNOON"
                   : h >= 17 && h < 21 ? "GOOD EVENING"
                   : "GOOD NIGHT";
      document.getElementById("greetingText").textContent = greeting;
      document.getElementById("headerDate").textContent = new Date().toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      });
    }());

    /* ── stat card definitions ── */
    var ADMIN_DATA = window.GB_ADMIN_INITIAL || {};

    function rows(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) || fallback || []; }
      catch (e) { return fallback || []; }
    }

    function niceDate(value) {
      if (!value) return "-";
      var parsed = new Date(String(value).replace(" ", "T"));
      if (Number.isNaN(parsed.getTime())) return String(value);
      return parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function statusLabel(value) {
      return String(value || "new").replace(/_/g, " ").replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
    }

    function getCounts() {
      return {
        clients: rows("gobright_clients", ADMIN_DATA.gobright_clients).length,
        reviews: rows("gobright_reviews", ADMIN_DATA.gobright_reviews).length,
        employees: rows("gobright_employees", ADMIN_DATA.gobright_employees).length,
        jobs: rows("gobright_jobs", ADMIN_DATA.gobright_jobs).length,
        careers: (ADMIN_DATA.careers || []).length,
        leads: (ADMIN_DATA.leads || []).length
      };
    }

    var STATS = [
      { key:"clients",   label:"Total Clients",       sub:"Added to website",           color:"#3b82f6", iconBg:"rgba(59,130,246,.15)",  page:"clients",
        icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20M9 21V9"/></svg>' },
      { key:"reviews",   label:"Google Reviews",      sub:"Published on website",        color:"#f59e0b", iconBg:"rgba(245,158,11,.15)",  page:"reviews",
        icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
      { key:"employees", label:"Total Employees",     sub:"GoBright Team",              color:"#e32028", iconBg:"rgba(227,32,40,.15)",   page:"employees",
        icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { key:"jobs",      label:"Job Openings",        sub:"Careers page roles",          color:"#06b6d4", iconBg:"rgba(6,182,212,.15)",   page:"hiring",
        icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>' },
      { key:"careers",   label:"Career Applications", sub:"Submitted from careers page", color:"#a855f7", iconBg:"rgba(168,85,247,.15)",  page:"careers",
        icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' },
      { key:"leads",     label:"Lead Forms",          sub:"Website enquiries",           color:"#22c55e", iconBg:"rgba(34,197,94,.15)",   page:"leads",
        icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' }
    ];

    function renderStats() {
      var counts = getCounts();
      document.getElementById("statsGrid").innerHTML = STATS.map(function (s) {
        var val = counts[s.key] != null ? counts[s.key] : 0;
        return (
          '<div class="stat-card" onclick="window.location.href=\'' + s.page + '\'" style="cursor:pointer">' +
            '<div class="stat-card-top">' +
              '<div class="stat-icon" style="background:' + s.iconBg + ';color:' + s.color + '">' + s.icon + '</div>' +
              '<div class="stat-chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>' +
            '</div>' +
            '<div class="stat-number" style="color:' + s.color + '">' + val + '</div>' +
            '<div class="stat-title">' + s.label + '</div>' +
            '<div class="stat-sub">'   + s.sub   + '</div>' +
          '</div>'
        );
      }).join("");
    }

    function rowHtml(row, titleKey, metaKey) {
      return (
        '<div class="overview-row">' +
          '<div class="overview-row-main">' +
            '<strong>' + esc(row.name || "Unnamed") + '</strong>' +
            '<span>' + esc(row[titleKey] || "-") + '</span>' +
          '</div>' +
          '<div class="overview-row-side">' +
            '<span class="overview-status">' + esc(statusLabel(row.status)) + '</span>' +
            '<small>' + esc(row[metaKey] || niceDate(row.created_at)) + '</small>' +
          '</div>' +
        '</div>'
      );
    }

    function renderOverviewData() {
      var leads = (ADMIN_DATA.leads || []).slice(0, 4);
      var careers = (ADMIN_DATA.careers || []).slice(0, 4);
      var jobs = rows("gobright_jobs", ADMIN_DATA.gobright_jobs);
      var employees = rows("gobright_employees", ADMIN_DATA.gobright_employees);
      var reviews = rows("gobright_reviews", ADMIN_DATA.gobright_reviews);
      var averageRating = reviews.length
        ? (reviews.reduce(function (sum, r) { return sum + (parseInt(r.rating, 10) || 0); }, 0) / reviews.length).toFixed(1)
        : "0.0";
      var activeJobs = jobs.filter(function (job) { return job.status !== "Inactive"; }).length;
      var activeEmployees = employees.filter(function (emp) { return emp.status !== "inactive"; }).length;
      var newLeads = (ADMIN_DATA.leads || []).filter(function (lead) { return String(lead.status || "new").toLowerCase() === "new"; }).length;

      document.getElementById("overviewDataGrid").innerHTML =
        '<div class="panel-box overview-panel">' +
          '<div class="sub-panel-head"><span class="sub-panel-title">Latest Leads</span><span class="item-count">' + leads.length + '</span></div>' +
          '<div class="overview-list">' + (leads.length ? leads.map(function (row) { return rowHtml(row, "service", "phone"); }).join("") : '<div class="empty-state">No leads yet.</div>') + '</div>' +
        '</div>' +
        '<div class="panel-box overview-panel">' +
          '<div class="sub-panel-head"><span class="sub-panel-title">Latest Applications</span><span class="item-count">' + careers.length + '</span></div>' +
          '<div class="overview-list">' + (careers.length ? careers.map(function (row) { return rowHtml(row, "position", "experience"); }).join("") : '<div class="empty-state">No applications yet.</div>') + '</div>' +
        '</div>' +
        '<div class="panel-box overview-panel">' +
          '<div class="sub-panel-head"><span class="sub-panel-title">Content Health</span><span class="item-count">Live</span></div>' +
          '<div class="overview-mini-grid">' +
            '<div><span>Active Jobs</span><strong>' + activeJobs + '</strong></div>' +
            '<div><span>Active Team</span><strong>' + activeEmployees + '</strong></div>' +
            '<div><span>Avg Rating</span><strong>' + averageRating + '</strong></div>' +
            '<div><span>New Leads</span><strong>' + newLeads + '</strong></div>' +
          '</div>' +
        '</div>';
    }

    renderStats();
    renderOverviewData();
  </script>
</body>
</html>
