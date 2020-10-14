<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

Console::log('Notificador...', 'red', true, 'black');


    //Sube archivo Log
    $curl_file = new CURLFile('zicandi.log','file/txt','zicandi.log');

    //Genera las Variables POST para enviar la Peticion CURL
    $vars = array('data' => $curl_file);
    
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, Param::$_BASE_PATH_API.'zicandi/public/repositorio/sistema/curl/upload_post.php');
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $vars);

    $result = curl_exec($curl);

    if($result!="FAIL"){
        $mail = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/notificador/batch_termino?log='.$result));
    }


Console::log('Envio de correo OK', 'red', true, 'black');
?>