function tambahTransaksi() {
    let note_val = sessionStorage.getItem("note");
    let name_val = sessionStorage.getItem("name");
    let phone_val = sessionStorage.getItem("phone");
    let address_val = sessionStorage.getItem("address");
    let payment_val = sessionStorage.getItem("payment");
    let token = sessionStorage.getItem('token');

    const params = `name=${name_val}&phone=${phone_val}&address=${address_val}&payment=${payment_val}&note=${note_val}`;

    if(token === null){
        console.log("login terlebih dahulu");
    }else{
        var request = new XMLHttpRequest()
    
        request.open('POST', 'http://localhost:8000/api/transaksis', true);
    
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
        request.onload = function () {
            var data = JSON.parse(this.response);
            sessionStorage.removeItem("note");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("phone");
            sessionStorage.removeItem("address");
            sessionStorage.removeItem("payment");
            window.location.href = "dashboard.html";
        }
    
        request.send(params);
    }
}

  