function loginUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    var request = new XMLHttpRequest()
    params = `email=${email}&password=${password}`;

    request.open('POST', 'http://localhost:8000/api/login', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.onload = function () {
        let data = JSON.parse(this.response);
        console.log(data.data);
        sessionStorage.setItem('token', data.data.token);
        sessionStorage.setItem('fullname', data.data.name);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('telp', data.data.telp);
        window.location.href = "shop.html";
    }

    request.send(params);
}


  