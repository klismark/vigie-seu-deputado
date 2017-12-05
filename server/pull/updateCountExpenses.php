<?php
//Atualiza a contagem de despesas
//updateCountExpenses.php?leg=55&pag=1 - 7 Páginas
ini_set('max_execution_time', 0);
$page = $_GET["pag"];
function getCongressmenBase(){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"].".json?shalow=true");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return array_keys((array) $data) ;
}

function getYears($congressman){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/despesas/".$_GET["leg"]."/".$congressman.".json?shalow=true");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return array_keys((array) $data) ;
}

function getExpenses($congressman,$year){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/despesas/".$_GET["leg"]."/".$congressman."/".$year.".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    $total = 0;
    foreach($data as $exp){
        $total += $exp->valorLiquido;
    }
    return $total;
}

function updateCongressman($congressman,$resume){
    $status = json_encode($resume);
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"]."/".$congressman."/despesas.json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS,$status);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    $data = json_decode(curl_exec($ch));
    curl_close($ch);
}

$congressmen = getCongressmenBase();
$itemsByPage =  100;
$indexStart = ($page * $itemsByPage) - $itemsByPage;
$indexEnd = ($page * $itemsByPage) - 1;


$expenses = array();
foreach($congressmen as $index=>$c){
    if($indexStart > $index){
        continue;
    }
    $expenses[$c] = array();
    $exp = array("posicao"=>0,"posicaoMandato".$_GET["leg"]=> 0,"total"=> 0);
    $years = getYears($c);
    foreach($years as $y){
        $t = getExpenses($c,$y);
        $exp["total"] += $t;
        $exp[$y] = array("posicao"=>0,"total"=>$t);
        $expenses[$c][$y] = $t;
        $expenses[$c]["total"] = $exp["total"];
    }
    updateCongressman($c,$exp);
    if($indexEnd == $index){
        break;
    }
}
echo  "Atualizado o resumo de ".($indexEnd+1)." Deputados";
