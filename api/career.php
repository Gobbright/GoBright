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

function first_uploaded_file(array $names): array {
    foreach ($names as $name) {
        if (isset($_FILES[$name]) && is_array($_FILES[$name])) {
            return $_FILES[$name];
        }
    }
    return ['error' => UPLOAD_ERR_NO_FILE];
}

$name=first_post_value(['name','full_name','fullname','your_name','user_name']);
$phone=first_post_value(['phone','mobile','mobile_number','phone_number','contact','contact_number']);
$email=first_post_value(['email','email_id','mail','your_email']);
$position=first_post_value(['position','role','job','job_title','applied_for']);
if ($name==='' || $phone==='' || $position==='' || !filter_var($email,FILTER_VALIDATE_EMAIL)) json_response(['ok'=>false,'message'=>'Complete all required fields with a valid email.'],422);
$job=db()->prepare('SELECT id FROM jobs WHERE title=? AND status=? LIMIT 1');$job->execute([$position,'active']);$jobId=$job->fetchColumn()?:null;
$experience=first_post_value(['experience','work_experience','years_experience']);
$portfolio=first_post_value(['portfolio_url','portfolio']);
try {
    [$resumePath, $resumeName] = store_uploaded_file(first_uploaded_file(['resume_file','resume']), 'resumes', ['pdf','doc','docx'], 5 * 1024 * 1024);
} catch (RuntimeException $e) {
    json_response(['ok'=>false,'message'=>$e->getMessage()],422);
}
if ($resumePath === '') {
    json_response(['ok'=>false,'message'=>'Please upload your resume.'],422);
}
$message=first_post_value(['message','msg','comments','comment','description','details']);
$sourcePage=trim((string)($_POST['source_page']??($_SERVER['HTTP_REFERER']??'')));
$sourcePage=substr($sourcePage,0,255);
$extraData=form_extra_json(['csrf_token','name','full_name','fullname','your_name','user_name','phone','mobile','mobile_number','phone_number','contact','contact_number','email','email_id','mail','your_email','position','role','job','job_title','applied_for','experience','work_experience','years_experience','portfolio_url','portfolio','message','msg','comments','comment','description','details','source_page']);
$stmt=db()->prepare('INSERT INTO career_applications(job_id,name,phone,email,position,experience,portfolio_url,resume_path,resume_name,message,source_page,extra_data,status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)');
$stmt->execute([$jobId,$name,$phone,$email,$position,$experience,$portfolio,$resumePath,$resumeName,$message,$sourcePage,$extraData,'new']);
json_response(['ok'=>true,'message'=>'Completed'],201);
