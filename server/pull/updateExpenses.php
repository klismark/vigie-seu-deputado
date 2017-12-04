<?php
//pullExpenses.php?page=1&ano=2017&leg=55 -- 44 Páginas
ini_set('max_execution_time', 0);

$page = $_GET["page"];
$idLegislatura = $_GET["leg"];
$year = $_GET["ano"];
$mounth = $_GET["mes"];
$itemsByPage = 12;

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

function getCongressmenBase(){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"].".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return array_keys((array) $data) ;
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
$congressmen = getCongressmen($page,$idLegislatura);
$updates = array();
for($i=0;$i<count($congressmen);$i++){
    $updates = $expBase = getExpensesBase($idLegislatura,$year,$congressmen[$i]);
    $expNew = getExpenses(1,$year,$mounth,$congressmen[$i],array(),1);

    foreach($expNew as $expN){
        $find = false;
        foreach($expBase as $k=>$expB){
            if(compareObject($expB,$expN)){
                $updates[$k] = $expN;
                $find = true;
                break;
            }
        }
        if(!$find){
            $updates[] = $expN;
        }
    }
    updateExpenses($idLegislatura,$congressmen[$i],$updates,$year);
}
echo "Atualizada as despesas de ".$mounth."/".$year." de ".count($congressmen)." Deputados - Página ".$page;

