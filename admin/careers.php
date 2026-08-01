<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GoBright Admin | Careers Data</title>
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
          <h1 class="dashboard-title">Careers Data</h1>
        </div>
        <div class="header-right">
          <span class="online-badge">&#9679; System Online</span>
          <div class="user-avatar">WA</div>
        </div>
      </header>

      <section class="section active" id="section-careers">
        <div class="panel-box">
          <div class="sub-panel-head"><span class="sub-panel-title">Applications</span><span class="item-count">0</span></div>
          <div class="empty-state" style="padding:48px 24px">Connect PHP backend to view career applications.</div>
        </div>
      </section>

    </div>
  </div>

  <script>window.GB_BASE_URL=<?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>;window.GB_CSRF_TOKEN=<?= json_encode(csrf_token()) ?>;</script>
<script>window.GB_ADMIN_INITIAL=<?= json_encode(admin_payload(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;</script>
<script src="../assets/js/admin-backend-bridge.js"></script>
<script src="../assets/js/admin-common.js"></script>
</body>
</html>
