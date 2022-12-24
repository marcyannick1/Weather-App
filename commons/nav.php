<nav
    class="h-full flex flex-col items-start justify-between gap-5"
>
<div class="pages flex flex-col items-start gap-5">
        <span>Hello👋🏽, <span class="font-medium"><?=$_SESSION['username-logged']?></span></span>
        <a
            href="index.php"
            class="text-2xl <?php if ($page == "/") {echo "text-blue-600";}else{echo "text-gray-400";}?> hover:text-blue-600"
        >
            <i class="<?php if ($page == "/") {echo "fa-regular";}else{echo "fa-light";}?> fa-house mr-2.5"></i>
            <span class="font-medium text-sm">Acceuil</span>
        </a>
        <a
            href="favoris.php"
            class="text-2xl <?php if ($page == "favoris") {echo "text-blue-600";}else{echo "text-gray-400";}?> hover:text-blue-600"
        >
            <i class="<?php if ($page == "favoris") {echo "fa-regular";}else{echo "fa-light";}?> fa-heart mr-2.5"></i>
            <span class="font-medium text-sm">Favoris</span>
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