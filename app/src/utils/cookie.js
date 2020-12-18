const getCookie = (cookieName) => {
    const cookie = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');

    return cookie ? cookie[2] : null;
}

export default getCookie;
