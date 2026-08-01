<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Method not allowed.'], 405);
}

verify_csrf();

$body = json_decode((string) file_get_contents('php://input'), true);
$key = (string) ($body['key'] ?? '');
$rows = is_array($body['rows'] ?? null) ? $body['rows'] : [];
$allowed = ['gobright_clients', 'gobright_reviews', 'gobright_employees', 'gobright_jobs'];

if (!in_array($key, $allowed, true)) {
    json_response(['ok' => false, 'message' => 'Invalid data type.'], 422);
}

function admin_sync_created_at(array $row): string
{
    $value = trim((string) ($row['created_at'] ?? ''));
    if ($value !== '') {
        $timestamp = strtotime($value);
        if ($timestamp !== false) {
            return date('Y-m-d H:i:s', $timestamp);
        }
    }

    return date('Y-m-d H:i:s');
}

$pdo = db();
$pdo->beginTransaction();

try {
    if ($key === 'gobright_clients') {
        $pdo->exec('DELETE FROM clients');
        $stmt = $pdo->prepare('INSERT INTO clients(name,image,website,status,created_at) VALUES(?,?,?,?,?)');
        foreach ($rows as $row) {
            $stmt->execute([
                trim((string) ($row['name'] ?? '')),
                normalize_admin_media_path((string) ($row['img'] ?? ''), 'clients'),
                '',
                'active',
                admin_sync_created_at($row),
            ]);
        }
    }

    if ($key === 'gobright_reviews') {
        $pdo->exec('DELETE FROM reviews');
        $stmt = $pdo->prepare('INSERT INTO reviews(name,role,photo,rating,review_text,status,created_at) VALUES(?,?,?,?,?,?,?)');
        foreach ($rows as $row) {
            $stmt->execute([
                trim((string) ($row['name'] ?? '')),
                trim((string) ($row['role'] ?? '')),
                normalize_admin_media_path((string) ($row['photo'] ?? ''), 'reviews'),
                max(1, min(5, (int) ($row['rating'] ?? 5))),
                trim((string) ($row['text'] ?? '')),
                'active',
                admin_sync_created_at($row),
            ]);
        }
    }

    if ($key === 'gobright_employees') {
        $pdo->exec('DELETE FROM employees');
        $stmt = $pdo->prepare('INSERT INTO employees(employee_code,name,role,expertise,photo,status,created_at) VALUES(?,?,?,?,?,?,?)');
        foreach ($rows as $index => $row) {
            $code = trim((string) ($row['empId'] ?? ''));
            if ($code === '') {
                $code = 'GB' . date('Y') . str_pad((string) ($index + 1), 3, '0', STR_PAD_LEFT);
            }

            $stmt->execute([
                $code,
                trim((string) ($row['name'] ?? '')),
                trim((string) ($row['role'] ?? '')),
                trim((string) ($row['expertise'] ?? '')),
                normalize_admin_media_path((string) ($row['photo'] ?? ''), 'employees'),
                ($row['status'] ?? 'active') === 'inactive' ? 'inactive' : 'active',
                admin_sync_created_at($row),
            ]);
        }
    }

    if ($key === 'gobright_jobs') {
        $pdo->exec('DELETE FROM jobs');
        $stmt = $pdo->prepare('INSERT INTO jobs(title,employment_type,experience,description,requirements,status,created_at) VALUES(?,?,?,?,?,?,?)');
        foreach ($rows as $row) {
            $stmt->execute([
                trim((string) ($row['title'] ?? '')),
                trim((string) ($row['type'] ?? 'Full-time')),
                trim((string) ($row['experience'] ?? '')),
                trim((string) ($row['description'] ?? '')),
                implode('|', is_array($row['requirements'] ?? null) ? $row['requirements'] : []),
                ($row['status'] ?? 'Active') === 'Inactive' ? 'inactive' : 'active',
                admin_sync_created_at($row),
            ]);
        }
    }

    $pdo->commit();
    $payload = admin_payload();
    json_response(['ok' => true, 'rows' => $payload[$key] ?? []]);
} catch (Throwable $e) {
    $pdo->rollBack();
    json_response(['ok' => false, 'message' => 'Database sync failed.'], 500);
}
