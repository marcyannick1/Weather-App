<nav class="sm-nav hidden bg-gray-100 fixed w-full z-50 bg-white bottom-0 flex items-center justify-evenly gap-5 h-16 max-lg:flex">
    <a
        href="index.php"
        class="text-xl flex flex-col items-center <?php if ($page == "/") {echo "text-blue-600";}else{echo "text-gray-400";}?> hover:text-blue-600"
    >
        <i class="<?php if ($page == "/") {echo "fa-regular";}else{echo "fa-light";}?> fa-house"></i>
        <span class="font-medium text-sm">Acceuil</span>
    </a>
    <a
        href="favoris.php"
        class="text-xl flex flex-col items-center <?php if ($page == "favoris") {echo "text-blue-600";}else{echo "text-gray-400";}?> hover:text-blue-600"
    >
        <i class="<?php if ($page == "favoris") {echo "fa-regular";}else{echo "fa-light";}?> fa-heart"></i>
        <span class="font-medium text-sm">Favoris</span>
    </a>
    <?php
    if (isset($_SESSION['user_id-logged'])):
    ?>
    <a
        href="logout.php"
        class="text-xl flex flex-col items-center text-gray-400 hover:text-blue-600"
    >
        <i
            class="fa-solid fa-right-from-bracket mr-2.5"
        ></i>
        <span class="font-medium text-sm">Déconnexion</span>
    </a>
    <?php
    else:
    ?>
    <a
        href="login.php"
        class="text-xl flex flex-col items-center text-gray-400 hover:text-blue-600"
    >
        <i
            class="fa-solid fa-right-from-bracket mr-2.5"
        ></i>
        <span class="font-medium text-sm">Connexion</span>
    </a>
    <?php
    endif
    ?>
</nav>
<style>
    nav.sm-nav{
        box-shadow: 0px 2px 10px -1px rgb(0 0 0 / 30%);
    }
</style>