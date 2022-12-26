<?php
session_start();
include_once("config/PDO.php");

if (isset($_POST['email-verify'])) {
    $_SESSION['email'] = $email = $_POST['email'];

    $stmt = $db->prepare("SELECT * FROM `users` WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() != 0) {
        $userexist = true;
        $uniqid = uniqid();
        $verif_table_recup = $db->prepare("SELECT * FROM `password_recovery` WHERE email = ?");
        $verif_table_recup->execute([$email]);

        if ($verif_table_recup->rowCount() == 0) {
            $insertcode = $db->prepare("INSERT INTO `password_recovery`(email, uniqid) VALUES (?, ?)");
            $insertcode->execute([$email, $uniqid]);
        }
    }else{
        $error = "Aucun compte lié à cette adresse mail";
    }

}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once('commons/head.php') ?>
    <title>Mot de passe oublié</title>
</head>
<body>
<section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Mot de passe oublié
                </h1>
                <span>Entrez l'adresse email associée à votre compte</span>
                <form class="space-y-4 md:space-y-6" action="" method="POST">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" name="email" id="email" value="<?php if (isset($email)) {echo $email;} ?>" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@email.com" required>
                    </div>

                    <?php if (isset($error)) : ?>
                        <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            <span class="font-medium"><?= $error ?></span>
                        </div>
                    <?php endif ?>
                    <?php if (isset($userexist)) : ?>
                        <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                            <span class="font-medium">Un lien de réinitialisation vous a été envoyé par mail</span>
                        </div>
                    <?php endif ?>

                    <button type="submit" name="email-verify" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Envoyer un lien de réinitialisation</button>
                </form>
            </div>
        </div>
    </div>
</section>
</body>
</html>
<script>
    <?php
    if(isset($userexist)):
    ?>
        var data = JSON.stringify({
        "personalizations": [
            {
            "to": [
                {
                "email": "<?=$email?>"
                }
            ],
            "subject": "Réinitialisation de mot de passe"
            }
        ],
        "from": {
            "email": "yannickcoulibaly220@gmail.com"
        },
        "content": [
            {
            "type": "text/plain",
            "value": "Voilà votre lien : password_change.php?uniqid=<?=$uniqid?>"
            }
        ]
        });

        var config = {
        method: 'post',
        url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
        headers: { 
            'X-RapidAPI-Key': `${RAPID_API_KEY}`, 
            'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com', 
            'content-type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {

        })
    <?php
    endif
    ?>
</script>