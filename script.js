function addUser(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let confirmEmail = document.getElementById('confirm-email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (email !== confirmEmail) {
        document.getElementById('error').innerText = 'Os emails são diferentes';
        return;
    }
    if (password !== confirmPassword) {
        document.getElementById('error').innerText = 'As senhas são diferentes';
        return;
    }

    let usuarioExistente = usuarios.find(usuario => usuario.email === email);
    if (usuarioExistente) {
        document.getElementById('error').innerText = 'Usuário já cadastrado';
        return;
    }

    let novoUsuario = {
        id: Date.now(),
        nome: name,
        email: email,
        senha: btoa(password),
        playlists: []
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('error').innerText = 'Usuário cadastrado com sucesso';

    setTimeout(() => {
        window.location.href = 'Login.html';
    }, 3000);
}

function login(event) {
    event.preventDefault();

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let usuario = usuarios.find(usuario => usuario.email === email && atob(usuario.senha) === password);

    if (usuario) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        window.location.href = "inicio.html";
    } else {
        document.getElementById('mensagem').innerText = 'Usuário ou senha incorretos';
    }
}
