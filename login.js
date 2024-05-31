document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('inputEmail4');
    const passwordInput = document.getElementById('inputPassword4');
    const emailError = document.getElementById('emailError');
    const loginError = document.getElementById('loginError');

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        if (!validateEmail(email)) {
            emailInput.classList.add('is-invalid');
            emailError.style.display = 'block';
            return;
        } else {
            emailInput.classList.remove('is-invalid');
            emailError.style.display = 'none';
        }

        try {
            const login = await fetch('http://localhost:3100/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!login.ok) {
                throw new Error('E-mail ou senha incorretos');

            }

            const result = await login.json();
            console.log('Usuário autenticado com sucesso:', result);

            window.location.href = '../menuPage/menu.html';
        } catch (error) {
            console.error('Erro:', error);
            loginError.style.display = 'block';
            loginError.textContent = error.message;
        }
    });

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
});