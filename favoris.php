<?php
session_start();
include_once("config/PDO.php");

if (!isset($_SESSION['user_id-logged'])) {
    header('location: login.php');
}

$stmt = $db->prepare("SELECT * FROM favoris WHERE users_user_id = ? ORDER BY favoris_id DESC");
$stmt->execute([$_SESSION['user_id-logged']]);

$favoris = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php
    include_once('commons/head.php');
    $page = "favoris"
    ?>
    <script src="./js/favoris.js" type="module" defer></script>
    <title>Favoris</title>
</head>
<body class="h-screen">
    <?php include_once('commons/sm-nav.php') ?>
    <div class="grid grid-cols-12 h-full app max-md:flex flex-col-reverse max-md:h-auto">
        <div class="left col-span-2 border-r-2 p-8 pt-24 bg-gray-100 max-lg:hidden">
            <?php include_once('commons/nav.php') ?>
        </div>
        <div class="center overflow-y-auto col-span-7 border-r-2 p-5 relative max-lg:col-span-8">
            <div class="grid grid-cols-2 gap-5 mb-10">
                <h2 class="font-medium text-start col-span-full mt-12">
                    Vos favoris
                </h2>
                <?php foreach ($favoris as $city):?>
                <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1 gap-5 location cursor-pointer hover:bg-gray-100 max-lg:col-span-full max-md:col-span-full max-sm:col-span">
                    <div class="icon flex flex-col items-center text-blue-600">
                    </div>
                    <div class="text text-start">
                        <span class="text-gray-400 cityname"><?=$city['cityname']?></span><br>
                        <span class="text-xl capitalize font-medium desc max-sm:text-base"></span>
                        <input type="hidden" name="lat" value="<?=$city['latitude']?>">
                        <input type="hidden" name="lon" value="<?=$city['longitude']?>">
                    </div>
                    <div class="heart text-blue-600 ml-auto">
                        <i class="fa-solid fa-heart text-xl cursor-pointer hover:text-blue-500"></i>
                    </div>
                </div>
                <?php endforeach?>
            </div>
            <div class="top grid gap-5 mb-10">

            </div>
            <div class="bottom weather-data relative max-lg:mb-14">
                        
            </div>
        </div>
        <div class="right overflow-y-auto col-span-3 weather-data text-center p-5 max-lg:col-span-4">

        </div>
    </div>
</body>
<!-- Style -->
<style>
    .right {
        background: linear-gradient(
            176deg,
            rgb(54 75 103) 0%,
            rgb(32 59 98) 50%,
            rgb(26 55 109) 100%
        );
        color: white;
    }
    .sunrise,
    .sunset {
        background: #274372 !important;
    }
    input {
        outline: none;
    }
</style>
</html>