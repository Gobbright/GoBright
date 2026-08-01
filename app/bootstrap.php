<?php
declare(strict_types=1);

define('APP_ROOT', dirname(__DIR__));
define('APP_NAME', 'GoBright');

if (session_status() !== PHP_SESSION_ACTIVE) {
    $sessionPath = APP_ROOT . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'sessions';
    if (!is_dir($sessionPath)) {
        mkdir($sessionPath, 0775, true);
    }
    session_save_path($sessionPath);
    session_start();
}

require_once __DIR__ . '/database.php';
require_once APP_ROOT . '/includes/seo.php';
start_site_seo_output();

function db(): PDO
{
    return Database::connection();
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function app_base_url(): string
{
    $script = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
    $marker = '/admin/';
    if (($pos = strpos($script, $marker)) !== false) {
        return rtrim(substr($script, 0, $pos), '/');
    }
    $marker = '/api/';
    if (($pos = strpos($script, $marker)) !== false) {
        return rtrim(substr($script, 0, $pos), '/');
    }
    $directory = rtrim(str_replace('\\', '/', dirname($script)), '/.');
    if ($directory === '') {
        return '';
    }
    $base = preg_replace(
        '#/(about|careers|contact|industries|privacy-policy|refund-policy|services|team|terms-and-conditions)(?:/.*)?$#',
        '',
        $directory
    );

    return is_string($base) ? rtrim($base, '/') : $directory;
}

function url(string $path = ''): string
{
    $path = preg_replace('~\.php(?=([?#]|$))~i', '', $path) ?? $path;
    return app_base_url() . '/' . ltrim($path, '/');
}

function media_url(string $path): string
{
    return preg_match('#^(?:https?:)?//#i', $path) || str_starts_with($path, 'data:') || str_starts_with($path, '/') ? $path : url($path);
}

function normalize_media_path(string $path): string
{
    $base = rtrim(app_base_url(), '/') . '/';
    if ($base !== '/' && str_starts_with($path, $base)) {
        return ltrim(substr($path, strlen($base)), '/');
    }
    $assetPosition = strpos($path, '/assets/');
    return $assetPosition !== false && !preg_match('#^(?:https?:)?//#i', $path)
        ? ltrim(substr($path, $assetPosition), '/')
        : $path;
}

function store_data_url_image(string $dataUrl, string $folder): string
{
    if (!preg_match('#^data:image/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+/=\s]+)$#i', $dataUrl, $matches)) {
        return $dataUrl;
    }

    $extension = strtolower($matches[1]) === 'jpeg' ? 'jpg' : strtolower($matches[1]);
    $binary = base64_decode(preg_replace('/\s+/', '', $matches[2]), true);
    if ($binary === false) {
        return '';
    }

    $folder = trim(preg_replace('/[^a-z0-9_-]+/i', '-', $folder), '-');
    $relativeDir = 'storage/uploads/' . ($folder !== '' ? $folder : 'media');
    $absoluteDir = APP_ROOT . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relativeDir);
    if (!is_dir($absoluteDir) && !mkdir($absoluteDir, 0775, true) && !is_dir($absoluteDir)) {
        throw new RuntimeException('Unable to create upload directory.');
    }

    $filename = date('YmdHis') . '-' . bin2hex(random_bytes(6)) . '.' . $extension;
    $absolutePath = $absoluteDir . DIRECTORY_SEPARATOR . $filename;
    if (file_put_contents($absolutePath, $binary) === false) {
        throw new RuntimeException('Unable to save uploaded image.');
    }

    return $relativeDir . '/' . $filename;
}

function store_uploaded_file(array $file, string $folder, array $allowedExtensions, int $maxBytes): array
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return ['', ''];
    }
    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Unable to upload the file. Please try again.');
    }

    $originalName = trim((string) ($file['name'] ?? ''));
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    if ($extension === '' || !in_array($extension, array_map('strtolower', $allowedExtensions), true)) {
        throw new RuntimeException('Upload PDF, DOC, or DOCX resume only.');
    }
    if ((int) ($file['size'] ?? 0) > $maxBytes) {
        throw new RuntimeException('Resume file must be 5 MB or smaller.');
    }

    $folder = trim(preg_replace('/[^a-z0-9_-]+/i', '-', $folder), '-');
    $relativeDir = 'storage/uploads/' . ($folder !== '' ? $folder : 'files');
    $absoluteDir = APP_ROOT . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relativeDir);
    if (!is_dir($absoluteDir) && !mkdir($absoluteDir, 0775, true) && !is_dir($absoluteDir)) {
        throw new RuntimeException('Unable to create upload directory.');
    }

    $filename = date('YmdHis') . '-' . bin2hex(random_bytes(6)) . '.' . $extension;
    $absolutePath = $absoluteDir . DIRECTORY_SEPARATOR . $filename;
    $tmpName = (string) ($file['tmp_name'] ?? '');
    $moved = is_uploaded_file($tmpName)
        ? move_uploaded_file($tmpName, $absolutePath)
        : rename($tmpName, $absolutePath);

    if (!$moved) {
        throw new RuntimeException('Unable to save uploaded resume.');
    }

    return [$relativeDir . '/' . $filename, $originalName];
}

function normalize_admin_media_path(string $path, string $folder): string
{
    $path = trim($path);
    if (str_starts_with($path, 'data:image/')) {
        return store_data_url_image($path, $folder);
    }

    return normalize_media_path($path);
}

function admin_payload(): array
{
    $clients = array_map(static fn(array $row): array => [
        'id' => (string) $row['id'], 'name' => $row['name'], 'img' => media_url($row['image']),
        'created_at' => $row['created_at'] ?? '',
    ], db()->query('SELECT * FROM clients ORDER BY id')->fetchAll());
    $reviews = array_map(static fn(array $row): array => [
        'id' => (string) $row['id'], 'name' => $row['name'], 'role' => $row['role'], 'photo' => $row['photo'] ? media_url($row['photo']) : '',
        'rating' => (int) $row['rating'], 'text' => $row['review_text'],
        'created_at' => $row['created_at'] ?? '',
    ], db()->query("SELECT * FROM reviews WHERE status = 'active' ORDER BY id DESC")->fetchAll());
    $employees = array_map(static fn(array $row): array => [
        'id' => (string) $row['id'], 'empId' => $row['employee_code'], 'name' => $row['name'], 'role' => $row['role'],
        'expertise' => $row['expertise'], 'photo' => $row['photo'] ? media_url($row['photo']) : '', 'status' => $row['status'], 'password' => '',
        'created_at' => $row['created_at'] ?? '',
    ], db()->query('SELECT * FROM employees ORDER BY employee_code, id')->fetchAll());
    $jobs = array_map(static fn(array $row): array => [
        'id' => (string) $row['id'], 'title' => $row['title'], 'type' => $row['employment_type'],
        'experience' => $row['experience'], 'description' => $row['description'],
        'requirements' => array_values(array_filter(explode('|', $row['requirements']))),
        'status' => $row['status'] === 'active' ? 'Active' : 'Inactive',
        'created_at' => $row['created_at'] ?? '',
    ], db()->query('SELECT * FROM jobs ORDER BY id')->fetchAll());
    $careerRows = array_map(static fn(array $row): array => [
        'id' => (string) $row['id'],
        'job_id' => $row['job_id'],
        'name' => $row['name'],
        'phone' => $row['phone'],
        'email' => $row['email'],
        'position' => $row['position'],
        'experience' => $row['experience'],
        'portfolio_url' => $row['portfolio_url'],
        'resume_path' => $row['resume_path'] ? media_url($row['resume_path']) : '',
        'resume_name' => $row['resume_name'] ?: basename((string) $row['resume_path']),
        'message' => $row['message'],
        'source_page' => $row['source_page'] ?? '',
        'extra_data' => $row['extra_data'] ?? '',
        'status' => $row['status'],
        'created_at' => $row['created_at'] ?? '',
    ], db()->query('SELECT * FROM career_applications ORDER BY id DESC')->fetchAll());
    return [
        'gobright_clients' => $clients,
        'gobright_reviews' => $reviews,
        'gobright_employees' => $employees,
        'gobright_jobs' => $jobs,
        'leads' => db()->query('SELECT * FROM leads ORDER BY id DESC')->fetchAll(),
        'careers' => $careerRows,
    ];
}

function redirect(string $path): void
{
    header('Location: ' . url($path));
    exit;
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf_token" value="' . e(csrf_token()) . '">';
}

function verify_csrf(): void
{
    $token = $_POST['csrf_token'] ?? ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
    if (!is_string($token) || !hash_equals(csrf_token(), $token)) {
        http_response_code(419);
        exit('Your session expired. Refresh the page and try again.');
    }
}

function admin_logged_in(): bool
{
    return !empty($_SESSION['admin_id']);
}

function require_admin(): void
{
    if (!admin_logged_in()) {
        redirect('admin/index.php');
    }
}

function flash(string $type, string $message): void
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function pull_flash(): ?array
{
    $flash = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $flash;
}

function json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

// Creating the connection also installs and seeds a new database automatically.
if (getenv('GB_SKIP_AUTO_DB') !== '1') {
    db();
}
