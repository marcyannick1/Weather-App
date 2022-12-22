function verif_strengh_password(mdp) {
    const points_total = 6
    const longueur = mdp.length
    let points_long = 0
    let points_comp = 0

    if (longueur >= 8) {
        points_long += 1
    }

    if(mdp.match("[a-z]")){
        points_comp += 1
    }
    if(mdp.match("[A-Z]")){
        points_comp += 2
    }
    if(mdp.match("[0-9]")){
        points_comp += 3
    }

    return points_total == (points_long * points_comp)
}

$("#password").keyup(function (e) { 
    if (!verif_strengh_password($("#password").val())) {
        $(".password-alert").remove();
        $("#password").after(
            `
            <div class="password-alert p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <span class="font-medium">Votre mot de passe doit contenir:<br>-Au moins 8 caractères<br>-Une lettre miniscule<br>-Une lettre majuscule<br>-Un chiffre</span>
            </div>
            `
        );
    }else{
        $(".password-alert").remove();
    }
});

$(".register").submit(function (e) { 
    if (!verif_strengh_password($("#password").val())) {
        e.preventDefault()
    }
});