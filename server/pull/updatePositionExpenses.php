<?php
//Atualiza o posicionamento de despesas
ini_set('max_execution_time', 0);

function getCongressmenBase(){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"].".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return $data;
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

$congressmen = (array) getCongressmenBase();

function sortExpensesTotal($a, $b){
    if($a->despesas->total > $b->despesas->total){
        return -1;
    }
    return 1;
}
function sortExpenses2015($a, $b){
    $aa = (array) $a->despesas;
    $bb = (array) $b->despesas;
    if($aa[2015]->total > $bb[2015]->total){
        return -1;
    }
    return 1;
}
function sortExpenses2016($a, $b){
    $aa = (array) $a->despesas;
    $bb = (array) $b->despesas;
    if($aa[2016]->total > $bb[2016]->total){
        return -1;
    }
    return 1;
}
function sortExpenses2017($a, $b){
    $aa = (array) $a->despesas;
    $bb = (array) $b->despesas;
    if($aa[2017]->total > $bb[2017]->total){
        return -1;
    }
    return 1;
}
function sortExpenses2018($a, $b){
    $aa = (array) $a->despesas;
    $bb = (array) $b->despesas;
    if($aa[2018]->total > $bb[2018]->total){
        return -1;
    }
    return 1;
}

usort($congressmen, "sortExpensesTotal");
for($i = 0; $i < count($congressmen);$i++){
    $congressmen[$i]->despesas->posicao = $i;
}

usort($congressmen, "sortExpenses2015");
for($j = 0; $j < count($congressmen);$j++){
    foreach ($congressmen[$j]->despesas as $name => $value) {
        if($name == "2015"){
            $value->posicao = $j;
        }
    }
    //updateCongressman($congressmen[$j]->id,$congressmen[$j]->despesas);
}

usort($congressmen, "sortExpenses2016");
for($k = 0; $k < count($congressmen);$k++){
    foreach ($congressmen[$k]->despesas as $name => $value) {
        if($name == "2016"){
            $value->posicao = $k;
        }
    }
    //updateCongressman($congressmen[$k]->id,$congressmen[$k]->despesas);
}

usort($congressmen, "sortExpenses2017");
for($l = 0; $l < count($congressmen);$l++){
    foreach ($congressmen[$l]->despesas as $name => $value) {
        if($name == "2017"){
            $value->posicao = $l;
        }
    }
    
    //updateCongressman($congressmen[$l]->id,$congressmen[$l]->despesas);
}

usort($congressmen, "sortExpenses2018");
for($m = 0; $m < count($congressmen);$m++){
    foreach ($congressmen[$m]->despesas as $name => $value) {
        if($name == "2018"){
            $value->posicao = $m;
        }
    }
    
    updateCongressman($congressmen[$m]->id,$congressmen[$m]->despesas);
}
echo "Posicionamento atualizado com sucesso.";