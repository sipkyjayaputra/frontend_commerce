function logoutUser(){
    sessionStorage.removeItem('token');

    window.location.href = 'index.html';
}