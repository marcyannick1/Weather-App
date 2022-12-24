<?php
session_start();
include_once("config/PDO.php");
if(isset($_POST['locationData'])){
    $data = json_decode($_POST['locationData'], true);
    var_dump($data);
    $lat = $data['lat'];
    $lon = $data['lon'];
    $cityname = $data['cityname'];

    $stmt = $db->prepare('SELECT * FROM favoris WHERE latitude = ? AND longitude = ? AND users_user_id = ?');
    $stmt->execute([$lat, $lon, $_SESSION['user_id-logged']]);

    if($stmt->rowCount() == 0){
        $insert = $db->prepare("INSERT INTO favoris(latitude, longitude, cityname, users_user_id) VALUES (?, ?, ?, ?)");
        $insert->execute([$lat, $lon, $cityname, $_SESSION['user_id-logged']]);
    }else{
        $delete = $db->prepare("DELETE FROM favoris WHERE latitude = ? AND longitude = ? AND users_user_id = ?");
        $delete->execute([$lat, $lon, $_SESSION['user_id-logged']]);
    }
}
?>