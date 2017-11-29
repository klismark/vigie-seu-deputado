<?php
ini_set('max_execution_time', 0);
//header('Content-Type: application/json');

$page = $_GET["page"];
$idLegislatura = $_GET["leg"];
function getCongressmenBase(){
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"].".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    return $data;
}


function getCongressmen($page,$idLegislatura,$congressmen){
    $ch = curl_init("https://dadosabertos.camara.leg.br/api/v2/deputados?pagina=".$page."&itens=100&idLegislatura=".$idLegislatura);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    if(count($data->dados) == 0){
        echo "Total: 0 Deputados";
    }else{
        requestDetailsCongressmen(0,$data->dados);
    }
}

function insertCongressman($congressman){
    $id = $congressman->id;
    $depesas = array(
        "despesas"=>[
        "2015"=>[
            "posicao"=> 0,
            "total"=>0
        ],
        "2016"=> [
            "posicao"=> 0,
            "total"=>0
        ],
        "2017"=> [
            "posicao"=> 0,
            "total"=> 0
        ],
        "posicao"=>0,
        "posicaoMandato55"=> 0,
        "total"=> 0]
    );
    $c = array_merge($depesas,(array)$congressman);
    $congressman = (object) $c;
    $data_json = json_encode($congressman);
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"]."/".$id.".json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
}
function updateCongressman($congressman,$photo){
    $id = $congressman->id;
    $congressman->ultimoStatus->urlFoto = $photo;
    $status = json_encode($congressman->ultimoStatus);
    $ch = curl_init("https://vigieseudeputado.firebaseio.com/deputados/".$_GET["leg"]."/".$id."/ultimoStatus.json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS,$status);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    $data = json_decode(curl_exec($ch));
    curl_close($ch);
}

function requestDetailsCongressmen($index,$congressmen){
    $ch = curl_init("https://dadosabertos.camara.leg.br/api/v2/deputados/".$congressmen[$index]->id);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = json_decode(curl_exec($ch));
    curl_close($ch);
    $congressmen[$index] = $data->dados;

    $index++;
    if($index < count($congressmen)){
        requestDetailsCongressmen($index,$congressmen);
    }else{
        $content = (array) getCongressmenBase();
        $keys = array_keys($content);
        foreach($congressmen as $c){
            if(!in_array($c->id,$keys)){
                insertCongressman($c);
            }else{
                $photo = $c->ultimoStatus->urlFoto;
                foreach($content as $cont){
                    $cc = (array) $cont;
                    if($cc["id"] == $c->id){
                        $photo = $cc["ultimoStatus"]->urlFoto;
                    }
                }
                updateCongressman($c,$photo);
            }
        }
        echo "Total: ".count($congressmen)." Deputados - Página ".$_GET["page"];
    }
}

getCongressmen($page,$idLegislatura,array());