// Função para cadastrar um novo usuário
function addUser(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let confirmEmail = document.getElementById('confirm-email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificação de emails e senhas
    if (email !== confirmEmail) {
        document.getElementById('error').innerText = 'Os emails são diferentes';
        return;
    }
    if (password !== confirmPassword) {
        document.getElementById('error').innerText = 'As senhas são diferentes';
        return;
    }

    // Verificação se o usuário já existe
    let usuarioExistente = usuarios.find(usuario => usuario.email === email);
    if (usuarioExistente) {
        document.getElementById('error').innerText = 'Usuário já cadastrado';
        return;
    }

    // Criação do novo usuário
    let novoUsuario = {
        id: Date.now(),
        nome: name,
        email: email,
        senha: btoa(password), // Senha é armazenada em base64
        playlists: []
    };

    // Adicionando o usuário ao array
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    document.getElementById('error').innerText = 'Usuário cadastrado com sucesso';

    setTimeout(() => {
        window.location.href = 'index.html'; // Redireciona para a página de login após 3 segundos
    }, 3000);
}

// Função para realizar o login
function login(event) {
    event.preventDefault();

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    // Carregar usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se existe um usuário com o email e senha corretos
    let usuario = usuarios.find(usuario => usuario.email === email && atob(usuario.senha) === password);

    if (usuario) {
        // Armazenar o usuário logado na sessão
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        // Redirecionar para a página inicial
        window.location.href = "inicio.html"; // Ou qualquer outra página de destino após login
    } else {
        // Exibir mensagem de erro caso o email ou a senha estejam incorretos
        document.getElementById('mensagem').innerText = 'Usuário ou senha incorretos';
    }
}

// Adicionar o listener ao formulário de login
document.getElementById('login-form').addEventListener('submit', login);

function irParaMinhaArea(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    window.location.href = "minhaArea.html"; // Redireciona para a página de Minha Área
}
