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
        <!-- Script -->
        <script src="./js/app.js" type="module" defer></script>
        <title>Météo App</title>
    </head>
    <body class="h-screen">
        <div class="grid grid-cols-12 h-full app">
            <div class="left col-span-2 border-r-2 p-10 pt-24 bg-gray-100">
                <?php $page = "/"; include_once('commons/sidenav.php') ?>
            </div>
            <div class="center overflow-y-auto col-span-7 border-r-2 p-5 relative">
                <header>
                    <nav class="h-12">
                        <div
                            class="absolute right-5 search-container w-80 ml-auto shadow-md"
                        >
                            <form class="flex items-center">
                                <div class="relative w-full">
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                    >
                                        <i
                                            class="fa-solid fa-magnifying-glass"
                                        ></i>
                                    </div>
                                    <input
                                        type="text"
                                        id="search"
                                        class="bg-white border text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-ellipsis"
                                        placeholder="Entrez une ville"
                                        autocomplete="off"
                                    />
                                </div>
                            </form>
                            <div class="search-results bg-white w-50"></div>
                        </div>
                    </nav>
                </header>
                <div>
                    <div class="top weather-data grid grid-cols-2 gap-5 mb-10">
                        
                    </div>
                    <div class="bottom weather-data relative">
                        
                    </div>
                </div>
            </div>
            <div class="right overflow-y-auto col-span-3 weather-data text-center p-5">

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