export function setJwtToken(window, token) {
    window.localStorage.setItem('jwtToken', token);
}
