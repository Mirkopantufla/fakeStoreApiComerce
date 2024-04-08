export function isAuthenticated() {

    //Trae el token desde el localStorage
    const access_token = localStorage.getItem('access_token');

    //Verifica si el token existe
    if (access_token) {
        return true;
    } else {
        return false;
    }

}

export function isAdministrator() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {

        if (user.role_id === 1) {
            return true
        } else {
            return false
        }

    } else {
        return false
    }

}

export function login(access_token) {
    //Guarda el token en el local storage
    localStorage.setItem("access_token", access_token)
}

export function logout() {
    //Quita el token de el local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
}