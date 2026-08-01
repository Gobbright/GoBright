<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Method not allowed.'], 405);
}

verify_csrf();

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    json_response(['ok' => false, 'message' => 'Invalid request body.'], 400);
}

$type = (string) ($body['type'] ?? '');
$action = (string) ($body['action'] ?? '');
$id = (int) ($body['id'] ?? 0);

$tables = [
    'leads' => 'leads',
    'careers' => 'career_applications',
];

$allowedStatuses = [
    'leads' => ['new', 'viewed', 'contacted', 'qualified', 'closed', 'deleted'],
    'careers' => ['new', 'reviewed', 'shortlisted', 'interviewed', 'hired', 'rejected', 'deleted'],
];

if (!isset($tables[$type]) || $id <= 0) {
    json_response(['ok' => false, 'message' => 'Invalid submission.'], 422);
}

$table = $tables[$type];

try {
    if ($action === 'delete') {
        $stmt = db()->prepare("DELETE FROM {$table} WHERE id = ?");
        $stmt->execute([$id]);
        json_response(['ok' => true]);
    }

    if ($action === 'view') {
        $viewStatus = $type === 'careers' ? 'reviewed' : 'viewed';
        $stmt = db()->prepare("UPDATE {$table} SET status = ? WHERE id = ? AND status = ?");
        $stmt->execute([$viewStatus, $id, 'new']);
        json_response(['ok' => true, 'status' => $viewStatus]);
    }

    if ($action === 'status') {
        $status = strtolower(trim((string) ($body['status'] ?? '')));
        if (!in_array($status, $allowedStatuses[$type], true)) {
            json_response(['ok' => false, 'message' => 'Invalid status.'], 422);
        }

        $stmt = db()->prepare("UPDATE {$table} SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        json_response(['ok' => true, 'status' => $status]);
    }

    json_response(['ok' => false, 'message' => 'Invalid action.'], 422);
} catch (Throwable $e) {
    json_response(['ok' => false, 'message' => 'Submission update failed.'], 500);
}
