<?php
session_start();
include_once("config/PDO.php");

if (isset($_POST['login'])) {
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    $stmt = $db->prepare("SELECT * FROM `users` WHERE email = ?");
    $stmt->execute([$email]);

    $data = $stmt->fetch();
    
    $user_id = $data['user_id'];
    $username = $data['username'];
    $password_hash = $data['password'];

    if (password_verify($password, $password_hash)) {
        $_SESSION['user_id-logged'] = $user_id;
        $_SESSION['email-logged'] = $email;
        $_SESSION['username-logged'] = $username;
        header("location: index.php");
    } else {
        $error = "Identifiant ou mot de passe incorrect";
    }
}

if(isset($_SESSION['email-logged'])){
    header('location: index.php');
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌥️🌤️🌦️🌧️</text></svg>">
    <!-- Tailwind -->
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Connexion</title>
</head>
<body class="bg-gray-50 dark:bg-gray-900">
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Connexion
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="" method="POST">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" value="<?php if (isset($email)) {echo $email;} ?>" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nom@email.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" value="<?php if (isset($password)) {echo $password;} ?>" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">

                        </div>
                        <div class="flex items-center justify-between">
                            <a href="password_forgot.php" class="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500">Mot de passe oublié?</a>
                        </div>
                        <?php if (isset($error)) : ?>
                            <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span class="font-medium"><?= $error ?></span>
                            </div>
                        <?php endif ?>
                        <button type="submit" name="login" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous n'avez pas de compte? <a href="register.php" class="font-medium text-blue-600 hover:underline dark:text-primary-500">Inscription</a>

                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
</body>
</html>