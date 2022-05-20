const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();


//LOGAR NO SISTEMA.
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const conta = getConta(email);

    if(!conta){
        alert("Opps Verifique o usuário ou a senha.")
        return;
    }

    saveSession(email, checkSession);

    window.location.href = "home.html";


});

//CRIAR CONTA.
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const senha = document.getElementById("password-create-input").value;
    
    if(email.length < 5){
        alert("Insira um e-mail válido.");
    }

    if(senha.length < 8){
        alert("Preencha uma senha com no mínimo 8 digitos.");
        return;
    }

    salvarConta({
        login: email,
        senha: senha,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso.");
});

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function salvarConta(data) {
    localStorage.setItem(data.login,JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}


function getConta(key){
    const conta = localStorage.getItem(key);

    if(conta){
        return JSON.parse(conta);
    }

    return "";
}



