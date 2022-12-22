<?php
session_start();
include_once("config/PDO.php");

if(isset($_POST['locationData'])){
    $post = json_decode($_POST['locationData'], true);
    $fav_check = $db->prepare("SELECT * FROM favoris WHERE latitude = ? AND longitude = ? AND users_user_id = ?");
    $fav_check->execute([$post['lat'], $post['lon'], $_SESSION['user_id-logged']]);

    if($fav_check->rowCount() == 0){
        $_SESSION['isFavoris'] = ['isFavoris' => false];
    }else{
        $_SESSION['isFavoris'] = ['isFavoris' => true];
    }
}

header("Content-Type: application/json");
echo json_encode($_SESSION['isFavoris']);
?>