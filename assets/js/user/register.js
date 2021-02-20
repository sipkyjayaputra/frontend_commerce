function registerUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let c_password = document.getElementById('c_password').value;

    var request = new XMLHttpRequest()
    params = `name=${name}&email=${email}&password=${password}&c_password=${c_password}`;

    request.open('POST', 'http://localhost:8000/api/register/1', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.onload = function () {
        var data = JSON.parse(this.response);
        sessionStorage.setItem('token', data.data.token);
        window.location.href = 'shop.html';
    }

    request.send(params);
}


  