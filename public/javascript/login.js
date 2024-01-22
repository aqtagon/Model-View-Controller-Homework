async function loginFormHandler(event) {
    event.preventDefault();

    let endpoint, data;

    if (type === 'login') {
        const email = document.querySelector(`#${type}-email`).value.trim();
        const password = document.querySelector(`#${type}-password`).value.trim();

        if (email && password) {
            endpoint = '/api/users/login';
            data = { email, password };
        }
    } else if (type === 'signup') {
        const username = document.querySelector(`#${type}-username`).value.trim();
        const email = document.querySelector(`#${type}-email`).value.trim();
        const password = document.querySelector(`#${type}-password`).value.trim();

        if (endpoint && data) {
            const response = await fetch(endpoint, {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard/');
            } else {
                alert(response.statusText);
            }
        }
    }

document.querySelector('.login-form').addEventListener('submit', (event) => handleFormSubmit(event, 'login'));
document.querySelector('.signup-form').addEventListener('submit', (event) => handleFormSubmit(event, 'signup'));