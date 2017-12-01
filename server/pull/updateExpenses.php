<?php
ini_set('max_execution_time', 0);

$page = $_GET["page"];
$idLegislatura = $_GET["leg"];
$ano = $_GET["ano"];
$itemsByPage = 20;

function getCongressmenBase(){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"].".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return array_keys((array) $data) ;
}

function getExpenses($page,$ano,$idCongressman,$expenses,$lastPage){
    $ch = curl_init("https://dadosabertos.camara.leg.br/api/v2/deputados/".$idCongressman."/despesas?pagina=".$page."&itens=100&ano=".$ano);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return resultExpenses($page,$data,$ano,$idCongressman,$expenses,$lastPage);
}

function resultExpenses($page,$data,$ano,$idCongressman,$expenses,$lastPage){
    if($page == 1){
        $linkLast = $data->links[3]->href;
        $pos1 = (strpos($linkLast,"&pagina=")+8);
        $pos2 = (strpos($linkLast,"&itens")-11) - $pos1;
        $lastPage = substr($linkLast,$pos1,$pos2);
    }
    $exp = array_merge($data->dados,$expenses);
    if($page < $lastPage){
        $page++;
        return getExpenses($page,$ano,$idCongressman,$exp,$lastPage);
    }

    if($page == $lastPage){
        return $exp;
    }
}

//Lista dos IDs dos deputados
$congressmen = getCongressmenBase();

$limit = $page * $itemsByPage - $itemsByPage;
$max = ($limit+$itemsByPage)-1;
if($limit >  count($congressmen)){
    die("Captação Finalizada");
}else if(count($congressmen) < $max){
    $max = count($congressmen);
}
$expenses = array();
$total = 0;
for($i = $limit;$i<=$max;$i++){
    echo $congressmen[$i]."<br>";
    $expenses = getExpenses(1,$ano,$congressmen[$i],array(),1);
    $total += count($expenses);
}
echo "Captação de ".$total." despesas de ".$max." Deputados";

