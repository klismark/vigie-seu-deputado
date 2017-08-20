<?php
set_time_limit(3000);
header("Content-Type: application/json; charset=UTF-8", true);
ob_start('ob_gzhandler');

$data = pushCongressmen(1);
$list = array();
foreach($data as $c){
    $list[] = $c["id"];
}
$fw = fopen("IDs.json", "w");
fwrite($fw, json_encode($list) );
fclose($fw);



function pushCongressmen($page){
    $html = file_get_contents('https://dadosabertos.camara.leg.br/api/v2/deputados?pagina='.$page.'&itens=100');
    $res = json_decode($html,true);
    if(isset($res["dados"])){
        if(count($res["dados"]) == 100){
            $page++;
            return array_merge(pushCongressmen($page),$res["dados"]);
        }
        return $res["dados"];
    }else{
        return array();
    }
}

function removeAccent($texto) {
    $trocarIsso = array('à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ü', 'ú', 'ÿ', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'O', 'Ù', 'Ü', 'Ú', 'Ÿ','`');
    $porIsso =    array('a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'y', 'A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'Y','');
    $titletext = str_replace($trocarIsso, $porIsso, $texto);
    return $titletext;
}
?>