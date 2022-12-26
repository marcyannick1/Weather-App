<?php
include_once("config/PDO.php");
session_start();

if (isset($_POST['register'])) {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    $emailchek = $db->prepare("SELECT * FROM users WHERE email = ?");
    $emailchek->execute([$email]);

    if ($emailchek->rowCount() == 0) {
        $stmt = $db->prepare("INSERT INTO `users`(`username`, `email`, `password`) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);

        header('location: login.php');
    } else {
        $error = "L'email existe déja";
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
    <!-- Jquery -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.2/dist/jquery.min.js"></script>
    <!-- Script -->
    <script src="js/verif_password.js" defer></script>
    <title>Inscription</title>
</head>
<body class="bg-gray-50">
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Inscription
                    </h1>
                    <form class="register space-y-4 md:space-y-6" action="" method="POST">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nom</label>
                            <input type="text" name="name" id="name" value="<?php if (isset($name)) {echo $name;} ?>" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="John Doe" required>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="email" name="email" id="email" value="<?php if (isset($email)) {echo $email;} ?>" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@email.com" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" value="<?php if (isset($password)) {echo $password;} ?>" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
                        </div>
                        <?php if (isset($error)) : ?>
                            <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                <span class="font-medium"><?= $error ?></span>
                            </div>
                        <?php endif ?>
                        <button type="submit" name="register" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">S'inscrire</button>
                        <p class="text-sm font-light text-gray-500">
                            Vous avez déja un compte? <a href="login.php" class="font-medium text-blue-600 hover:underline">Connexion</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
</body>
</html>