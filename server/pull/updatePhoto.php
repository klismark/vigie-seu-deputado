<?php
function downloadImage($url){

    $url = $url;
    $img = 'img.jpg';
    file_put_contents($img, file_get_contents($url));
}
function compressImage($source_url, $destination_url, $quality) {
    $info = getimagesize($source_url);

    if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($source_url);
    elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($source_url);
    elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($source_url);

    //save file
    imagejpeg($image, $destination_url, $quality);

    //return destination file
    return $destination_url;
}
downloadImage("http://www.camara.leg.br/internet/deputado/bandep/178957.jpg");