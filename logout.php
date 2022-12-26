<?php
session_start();
session_destroy();

header('refresh:1; url=index.php')
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once('commons/head.php') ?>
    <title>Logout</title>
</head>
<body class="">
    <span class="text-center font-medium">👋🏽Au revoir...</span>
</body>
</html>