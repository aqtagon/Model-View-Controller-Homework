async function loginFormHandler(event) {
    event.preventDefault();

    let endpoint, data;

    if (type === 'login') {
        const email = document.querySelector(`#${type}-email`).value.trim();
        const password = document.querySelector(`#${type}-password`).value.trim();