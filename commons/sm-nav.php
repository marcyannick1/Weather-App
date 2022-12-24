<nav class="hidden fixed w-full z-50 shadow-lg bg-white bottom-0 flex items-center justify-evenly gap-5 h-16 max-lg:flex">
    <a
        href="index.php"
        class="text-2xl flex flex-col items-center <?php if ($page == "/") {echo "text-blue-600";}else{echo "text-gray-400";}?> hover:text-blue-600"
    >
        <i class="<?php if ($page == "/") {echo "fa-regular";}else{echo "fa-light";}?> fa-house"></i>
        <span class="font-medium text-sm">Acceuil</span>
    </a>
    <a
        href="favoris.php"
        class="text-2xl flex flex-col items-center <?php if ($page == "favoris") {echo "text-blue-600";}else{echo "text-gray-400";}?> hover:text-blue-600"
    >
        <i class="<?php if ($page == "favoris") {echo "fa-regular";}else{echo "fa-light";}?> fa-heart"></i>
        <span class="font-medium text-sm">Favoris</span>
    </a>
    <a
        href="logout.php"
        class="text-2xl flex flex-col items-center text-gray-400 hover:text-blue-600"
    >
        <i
            class="fa-solid fa-right-from-bracket mr-2.5"
        ></i>
        <span class="font-medium text-sm">Déconnexion</span>
    </a>
</nav>