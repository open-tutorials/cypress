export function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

export function setJwtToken(window, token) {
    window.localStorage.setItem('jwtToken', token);
}