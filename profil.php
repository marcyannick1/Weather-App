<?php
session_start();
include_once("config/PDO.php");

if (!isset($_SESSION['user_id-logged'])) {
    header('location: login.php');
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once('commons/head.php') ?>
    <title>Profil</title>
</head>
<body class="h-screen">
        <div class="grid grid-cols-12 h-full app">
            <div class="left col-span-2 border-r-2 p-10 pt-24 bg-gray-100">
                <?php $page = "profil"; include_once('commons/sidenav.php') ?>
            </div>
            <div class="center overflow-y-auto col-span-7 border-r-2 p-5 relative">

            </div>
            <div class="right overflow-y-auto col-span-3 weather-data text-center p-5">

            </div>
        </div>
    </body>
</html>