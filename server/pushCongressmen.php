<?php
set_time_limit(3000);
header("Content-Type: application/json; charset=UTF-8", true);
ob_start('ob_gzhandler');

$IDs = json_decode(file_get_contents("IDs.json"),true);
$congressmen = json_decode(file_get_contents("congressmen.json"),true);
if(!$congressmen){
    $congressmen = array();
}

$page = $_REQUEST["pg"];
$qt = 120;
$init = (($page-1) * $qt);
$final = ($page * $qt);

$congress = array();
foreach($IDs as $i => $id){

    if($i < $init || $i >= $final){
        continue;
    }
    $html = file_get_contents('https://dadosabertos.camara.leg.br/api/v2/deputados/'.$id);
    $res = json_decode($html,true);
    
    
    if(!isset($res["dados"])){
        continue;
    }
    $data = $res["dados"];
    $ref = $res["ultimoStatus"]["nome"];
    $ref = str_replace(" ","",$ref);
    $congressman = array(
        "id" => $data["id"],
        "email"=>$data["ultimoStatus"]["gabinete"]["email"],
        "name"=>$data["ultimoStatus"]["nome"],
        "party"=>$data["ultimoStatus"]["siglaPartido"],
        "photo"=>$data["ultimoStatus"]["urlFoto"],
        "reference"=>$ref,
        "uf"=>$data["ultimoStatus"]["siglaUf"]
    ); 
    $congressmen[$i] = $congressman;
}


$fw = fopen("congressmen.json", "w");
fwrite($fw, json_encode($congressmen) );
fclose($fw);