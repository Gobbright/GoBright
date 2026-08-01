<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
$adminHost = strtolower((string) ($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
$adminHost = preg_replace('/:\d+$/', '', $adminHost) ?? $adminHost;
$adminQuickLogin = null;
if (
    in_array($adminHost, ['localhost', '127.0.0.1', '::1'], true)
    || str_ends_with($adminHost, '.local')
    || preg_match('/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/', $adminHost)
) {
    $adminQuickLogin = ['id' => 'gobright_admin', 'password' => 'GoBright@2026'];
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GoBright Admin</title>
  <link rel="icon" type="image/png" href="../website_favicon.png">
  <link rel="stylesheet" href="../assets/css/admin.css">
  <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body>
  <section class="login-screen">
    <a class="login-back-btn" href="../">&larr; Back</a>
    <form id="loginForm" class="login-card">
      <div class="login-brand">
        <img src="../assets/img/logo.png" alt="GoBright">
        <div>
          <h1>Admin Panel</h1>
          <p>GoBright website management</p>
        </div>
      </div>
      <div class="field">
        <label for="adminId">Admin ID</label>
        <input id="adminId" name="id" autocomplete="username" required>
      </div>
      <div class="field">
        <label for="adminPassword">Password</label>
        <input id="adminPassword" name="password" type="password" autocomplete="current-password" required>
      </div>
      <button class="btn-primary" type="submit">Open Admin Panel</button>
      <?php if ($adminQuickLogin): ?>
        <button
          class="btn-quick-login"
          type="button"
          data-quick-admin-id="<?= e($adminQuickLogin['id']) ?>"
          data-quick-admin-password="<?= e($adminQuickLogin['password']) ?>"
        >Quick Login</button>
        <p class="quick-login-note">Local development shortcut</p>
      <?php endif; ?>
      <div id="loginNotice" class="notice"></div>
    </form>
  </section>
  <script>window.GB_BASE_URL=<?= json_encode(app_base_url(), JSON_UNESCAPED_SLASHES) ?>;window.GB_CSRF_TOKEN=<?= json_encode(csrf_token()) ?>;</script>
<script src="../assets/js/admin-login.js?v=20260801-quick-dashboard"></script>
<script>
    if (sessionStorage.getItem("gobright_admin") === "1") {
      window.location.replace("overview");
    }
  </script>
</body>
</html>
