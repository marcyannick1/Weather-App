<?php
include_once("config/PDO.php");
session_start();

if(isset($_POST['password-change'])){
    $uniqid = $_GET['uniqid'];
    $newPassword = htmlspecialchars($_POST['password']);
    $stmt = $db->prepare("UPDATE users SET password = ? WHERE email = (SELECT email FROM password_recovery WHERE uniqid = ?)");
    $stmt->execute([password_hash($newPassword, PASSWORD_DEFAULT), $uniqid]);

    $delete = $db->query("DELETE FROM password_recovery WHERE uniqid = '$uniqid'");
    header('location: login.php');
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once('commons/head.php') ?>
    <script src="js/verif_password.js" defer></script>
    <title>Mot de passe oublié</title>
</head>
<body class="bg-gray-50 dark:bg-gray-900">
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <?php
            if(isset($_GET['uniqid'])):
                $uniqid = $_GET['uniqid'];
                $stmt = $db->prepare("SELECT * FROM password_recovery WHERE uniqid = ?");
                $stmt->execute([$uniqid]);
            
                if($stmt->rowCount() !== 0):
            ?>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Modification de mot de passe
                    </h1>
                    <span>Entrez votre nouveau mot de passe</span>
                    <form class="register space-y-4 md:space-y-6" action="" method="POST">
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </div>
                        <button type="submit" name="password-change" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Modifier mon mot de passe</button>
                    </form>
                </div>
            </div>
            <?php
            else:
            ?>
            <span>Le lien n'existe pas ou a expiré</span>
            <?php
                endif;
            endif
            ?>
        </div>
    </section>
</body>
</html>