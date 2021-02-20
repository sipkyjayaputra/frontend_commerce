const login_status = document.getElementById('login_status');
const dd_user = document.getElementById('dd_user');

if(sessionStorage.getItem('token') === null){
    login_status.removeAttribute("class", "badge badge-success");
    login_status.setAttribute("class", "badge badge-secondary");
    login_status.innerHTML = 'Not signed in';
    dd_user.innerHTML = `
        <a class="dropdown-item" href="index.html">Sign in first</a>
    `;
}else{
    login_status.removeAttribute("class", "badge badge-secondary");
    login_status.setAttribute("class", "badge badge-success");
    login_status.innerHTML = 'Signed in';
    dd_user.innerHTML = `
        <a href="cart.html" class="dropdown-item">Keranjang</a>
        <a class="dropdown-item" href="dashboard.html">Dashboard</a>
        <button class="dropdown-item" href="index.html" onclick="return logoutUser()">Logout</button>
    `;
}


