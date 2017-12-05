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

usort($congressmen, "sortExpensesTotal");
for($i = 0; $i < count($congressmen);$i++){
    $congressmen[$i]->despesas->posicao = $i;
}

usort($congressmen, "sortExpenses2015");
for($i = 0; $i < count($congressmen);$i++){
    foreach ($congressmen[$i]->despesas as $name => $value) {
        if($name == "2015"){
            $value->posicao = $i;
        }
    }
}

usort($congressmen, "sortExpenses2016");
for($i = 0; $i < count($congressmen);$i++){
    foreach ($congressmen[$i]->despesas as $name => $value) {
        if($name == "2016"){
            $value->posicao = $i;
        }
    }
}

usort($congressmen, "sortExpenses2017");
for($i = 0; $i < count($congressmen);$i++){
    foreach ($congressmen[$i]->despesas as $name => $value) {
        if($name == "2017"){
            $value->posicao = $i;
        }
    }
    
    updateCongressman($congressmen[$i]->id,$congressmen[$i]->despesas);
}

echo "Posicionamento atualizado com sucesso.";