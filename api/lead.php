<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['ok'=>false,'message'=>'Method not allowed.'],405);
verify_csrf();

function first_post_value(array $names): string {
    foreach ($names as $name) {
        if (!array_key_exists($name, $_POST)) continue;
        $value = $_POST[$name];
        if (is_array($value)) {
            $value = implode(', ', array_map(static fn($item): string => trim((string) $item), $value));
        }
        $value = trim((string) $value);
        if ($value !== '') return $value;
    }
    return '';
}

function form_extra_json(array $skip): string {
    $extra = [];
    foreach ($_POST as $key => $value) {
        if (in_array((string) $key, $skip, true)) continue;
        if (is_array($value)) {
            $value = implode(', ', array_map(static fn($item): string => trim((string) $item), $value));
        }
        $value = trim((string) $value);
        if ($value === '') continue;
        $extra[(string) $key] = $value;
    }
    return $extra ? json_encode($extra, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : '';
}

$name=first_post_value(['name','full_name','fullname','your_name','user_name']);
$phone=first_post_value(['phone','mobile','mobile_number','phone_number','contact','contact_number']);
$email=first_post_value(['email','email_id','mail','your_email']);
if ($name==='' || $phone==='' || !filter_var($email,FILTER_VALIDATE_EMAIL)) json_response(['ok'=>false,'message'=>'Enter a valid name, phone number and email.'],422);
$service=first_post_value(['service','service_type','requirement','subject']);
$message=first_post_value(['message','msg','comments','comment','description','details']);
$sourcePage=trim((string)($_POST['source_page']??($_SERVER['HTTP_REFERER']??'')));
$sourcePage=substr($sourcePage,0,255);
$extraData=form_extra_json(['csrf_token','name','full_name','fullname','your_name','user_name','phone','mobile','mobile_number','phone_number','contact','contact_number','email','email_id','mail','your_email','service','service_type','requirement','subject','message','msg','comments','comment','description','details','source_page']);
$stmt=db()->prepare('INSERT INTO leads(name,phone,email,service,message,source_page,extra_data,status) VALUES(?,?,?,?,?,?,?,?)');
$stmt->execute([$name,$phone,$email,$service,$message,$sourcePage,$extraData,'new']);
json_response(['ok'=>true,'message'=>'Completed'],201);
