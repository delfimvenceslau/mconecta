var baseurl = 'http://127.0.0.1:8000';
function register(){
    const form = document.getElementById('register-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        var userType = document.getElementById('user-type').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        const formData = new FormData(form);
        formData.append('user_type', userType);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch(`${baseurl}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Erro ao registrar usuário');
            }
            
            const result = await response.json();
            alert('Registro realizado com sucesso!');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao registrar. Tente novamente.');
        }
    });
}