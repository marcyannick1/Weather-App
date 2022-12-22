<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌥️🌤️🌦️🌧️</text></svg>">
        <!-- Axios -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.2.1/dist/axios.min.js"></script>
        <!-- Jquery -->
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.2/dist/jquery.min.js"></script>
        <!-- Chart JS -->
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <!-- Moment JS -->
        <script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/locale/fr.js"></script>
        <!-- Tailwind -->
        <script src="https://cdn.tailwindcss.com"></script>
        <!-- FontAwesome -->
        <link
            rel="stylesheet"
            href="https://site-assets.fontawesome.com/releases/v6.2.1/css/all.css"
        />
        <!-- Script -->
        <script src="app.js" type="module" defer></script>
        <title>Météo App</title>
    </head>
    <body class="text-center h-screen">
        <div class="grid grid-cols-12 h-full app">
            <div class="left col-span-2 border-r-2 p-10 pt-24 bg-gray-100">
                <nav
                    class="h-full flex flex-col items-start justify-between gap-5"
                >
                    <div class="pages flex flex-col items-start gap-5">
                        <a
                            href="/"
                            class="text-2xl text-blue-600 hover:text-blue-600"
                        >
                            <i class="fa-regular fa-house mr-2.5"></i>
                            <span class="font-medium text-sm">Acceuil</span>
                        </a>
                        <a
                            href="favoris.php"
                            class="text-2xl text-gray-400 hover:text-blue-600"
                        >
                            <i class="fa-light fa-heart mr-2.5"></i>
                            <span class="font-medium text-sm">Favoris</span>
                        </a>
                        <a
                            href="profil.php"
                            class="text-2xl text-gray-400 hover:text-blue-600"
                        >
                            <i class="fa-light fa-user mr-2.5"></i>
                            <span class="font-medium text-sm">Profil</span>
                        </a>
                    </div>
                    <div class="logout">
                        <a
                            href="logout.php"
                            class="text-lg text-gray-400 hover:text-blue-600"
                        >
                            <i
                                class="fa-solid fa-right-from-bracket mr-2.5"
                            ></i>
                            <span class="font-medium text-sm">Déconnexion</span>
                        </a>
                    </div>
                </nav>
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