// Проверка входа на страницах и кнопка «Выйти».
// Сама авторизация находится в auth.js.

async function initSession() {
    var user = await getCurrentUser();
    var page = document.body.getAttribute("data-page");

    // В админку может войти только администратор
    if (page === "admin" && (!user || user.login !== "admin")) {
        window.location.href = "auth.html";
        return;
    }

    // На главной ссылка «Войти» превращается в «Кабинет»
    var loginLink = document.getElementById("loginLink");
    if (loginLink && user) {
        loginLink.textContent = "Кабинет";
        if (user.login === "admin") {
            loginLink.href = "admin.html";
        } else {
            loginLink.href = "profile.html";
        }
    }

    var logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
}

initSession();
