

function tambahKeranjang(id_produk) {
    let token = sessionStorage.getItem('token');
    const alert_container = document.getElementById("alert");
    if(token === null){
        alert_container.innerHTML = "";
        const alert = document.createTextNode("Lakukan login terlebih dahulu!");
        alert_container.setAttribute("class", "alert alert-danger mt-3");
        alert_container.appendChild(alert);
    }else{
        var request = new XMLHttpRequest();
    
        request.open('POST', 'http://localhost:8000/api/keranjangs', true);
    
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
        request.onload = function () {
            var data = JSON.parse(this.response);
            const alert = document.createTextNode("Item Berhasil ditambahkan!");
            alert_container.setAttribute("class", "alert alert-success mt-3");
            alert_container.appendChild(alert);
        }
    
        request.send("id_produk="+id_produk);
    }
}


  