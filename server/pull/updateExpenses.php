<?php
//Atualiza as despesas dos últimos 3 meses
//pullExpenses.php?page=1&ano=2017&leg=55 -- 7 Páginas
ini_set('max_execution_time', 0);

$page = $_GET["page"];
$idLegislatura = $_GET["leg"];
$year = operationWithDaysYear(Date("Y-m-d"),$_GET["mes"]);
$month = operationWithDays(Date("Y-m-d"),$_GET["mes"]);
$itemsByPage = 12;

function operationWithDaysYear($date, $num) {
    return date("Y", strtotime("-" . $num . " month", strtotime(str_replace("/", "-", $date))));
}

function operationWithDays($date, $num) {
    return date("m", strtotime("-" . $num . " month", strtotime(str_replace("/", "-", $date))));
}


function getCongressmen($page,$idLegislatura){
    $ch = curl_init("https://dadosabertos.camara.leg.br/api/v2/deputados?pagina=".$page."&itens=100&idLegislatura=".$idLegislatura);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    $IDs = array();
    foreach((array) $data->dados as $cong){
        $IDs[] = $cong->id;
    }
    return $IDs;
}


function getExpensesBase($leg,$year,$congressman){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/despesas/".$leg."/".$congressman."/".$year.".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return $data;
}

function compareObject($obj1,$obj2){
    $ob1 = (array) $obj1;
    $ob2 = (array) $obj2;
    $keys = array_keys($ob1);
    foreach($keys as $k){
        if (array_key_exists($k,$ob2)) {
            if($ob1[$k] != $ob2[$k]){
                return false;
            }
        }else{
            return false;
        }
    }
    return true;
}

function getExpenses($page,$year,$mounth,$idCongressman,$expenses,$lastPage){
    $ch = curl_init("https://dadosabertos.camara.leg.br/api/v2/deputados/".$idCongressman."/despesas?pagina=".$page."&itens=100&ano=".$year."&mes=".$mounth);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    if(count($data->dados) == 0){
        return $expenses;
    }
    return resultExpenses($page,$data,$year,$mounth,$idCongressman,$expenses,$lastPage);
}

function resultExpenses($page,$data,$year,$mounth,$idCongressman,$expenses,$lastPage){
    if($page == 1){
        $linkLast = is_null($data->links[3]->href)?$data->links[2]->href:$data->links[3]->href;

        $pos1 = (strpos($linkLast,"&pagina=")+8);
        $pos2 = (strpos($linkLast,"&itens")-11) - $pos1;
        $lastPage = substr($linkLast,$pos1,$pos2);
    }
    $exp = array_merge($data->dados,$expenses);
    if($page < $lastPage){
        $page++;
        return getExpenses($page,$year,$mounth,$idCongressman,$exp,$lastPage);
    }

    if($page == $lastPage){
        return $exp;
    }
}

function updateExpenses($leg,$congressman,$expenses,$year){
    $expenses = json_encode($expenses);
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/despesas/".$leg."/".$congressman."/".$year.".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS,$expenses);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
}



//$congressmen = getCongressmenBase();
//Pega a primeira página de deputados direto da câmara
$congressmen = getCongressmen($page,$idLegislatura);
$updates = array();
for($i=0;$i<count($congressmen);$i++){
    //Pega os gastos de cada deputado já cadastrado
    $updates = $expBase = getExpensesBase($idLegislatura,$year,$congressmen[$i]);
    //Pega os gastos de cada deputado direto da câmara
    $expNew = getExpenses(1,$year,$month,$congressmen[$i],array(),1);
    if (!is_array($expNew)) {
        continue;
    }
    //Compara se houve alterações nos gastos
    foreach($expNew as $expN){
        $find = false;
        if (!is_array($expBase)) {
            if(!$find){
                $updates[] = $expN;
            }
            continue;
        }
        foreach($expBase as $k=>$expB){
            if(compareObject($expB,$expN)){
                $updates[$k] = $expN;
                $find = true;
                break;
            }
        }
    }
    //Atualiza as depesas
    updateExpenses($idLegislatura,$congressmen[$i],$updates,$year);
}
echo "Atualizada as despesas de ".$month."/".$year." de ".count($congressmen)." Deputados - Página ".$page;

