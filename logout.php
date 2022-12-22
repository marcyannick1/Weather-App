<?php
session_start();
session_destroy();

echo "Déconnexion...";

header('refresh:1; url=login.php')

?>