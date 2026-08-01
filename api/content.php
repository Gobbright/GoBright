<?php
require_once dirname(__DIR__) . '/app/bootstrap.php';
$data=admin_payload();
json_response(['ok'=>true,'clients'=>$data['gobright_clients'],'reviews'=>$data['gobright_reviews'],'employees'=>$data['gobright_employees'],'jobs'=>$data['gobright_jobs']]);

