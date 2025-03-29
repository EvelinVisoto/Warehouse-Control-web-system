const URI = '/login';

const numregistro = document.getElementById("username");
const txtsenha = document.getElementById("password");
const textmessage = document.getElementById("message");
const forgotPasswordLink = document.getElementById("forgotPassword");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.getElementsByClassName("close")[0];

function onclick_buttonLogin() {
    const registro = numregistro.value;
    const senha = txtsenha.value;

    if (!registro || !senha) {
        showNotification('Todos os campos devem ser preenchidos', 'error');
        return;
    }

    const dados = {
        registro: registro,
        senha: senha
    };

    fetch_post_verificarLogin(dados);
}


// Função para enviar recuperação de senha
function enviarRecuperacaoSenha() {
    const email = document.getElementById("email").value;
    console.log('Função de recuperação de senha foi chamada');

    if (!email) {
        showNotification('Por favor, insira um email', 'error');
        return;
    }

    const dados = { email: email };

    // Faz a requisição POST para o endpoint de recuperação de senha
    fetch('/recuperar-senha', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(resposta => {
        showNotification(resposta.msg, resposta.status ? 'success' : 'error');
        if (resposta.status) {
            forgotPasswordModal.style.display = "none"; // Fecha o modal
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showNotification('Erro ao tentar enviar a recuperação de senha', 'error');
    });
}


// Função para mostrar notificações flutuantes
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 600);
    }, 3000);
}


// Função para enviar os dados de login para o servidor
function fetch_post_verificarLogin(dados) {
    const txtJson = JSON.stringify(dados);

    fetch(URI, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: txtJson
    })
    .then(response => response.json())
    .then(resposta => {
        if (resposta.status) {
            localStorage.setItem("token", resposta.token);
            localStorage.setItem("jsonlogin", JSON.stringify(resposta));

            // Redireciona para a página Painel.html
            window.location.href = "painel.html";
        } else {
            showNotification(resposta.msg, 'error');
            // Limpa os campos de entrada
            numregistro.value = '';
            txtsenha.value = '';
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

