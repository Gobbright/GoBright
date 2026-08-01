<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['ok'=>false,'message'=>'Method not allowed.'],405);
verify_csrf();
$stmt=db()->prepare('SELECT * FROM admins WHERE username=? LIMIT 1');
$stmt->execute([trim((string)($_POST['id']??''))]);$admin=$stmt->fetch();
if(!$admin||!password_verify((string)($_POST['password']??''),$admin['password_hash'])) json_response(['ok'=>false,'message'=>'Invalid Admin ID or Password. Please try again.'],422);
session_regenerate_id(true);$_SESSION['admin_id']=$admin['id'];$_SESSION['admin_name']=$admin['display_name'];
json_response(['ok'=>true]);

