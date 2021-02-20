const note_html = document.getElementById("note_html");
const name_html = document.getElementById("name_html");
const phone_html = document.getElementById("phone_html");
const address_html = document.getElementById("address_html");
const payment_html = document.getElementById("payment_html");

note_html.innerHTML = sessionStorage.getItem("note");
window.onload = function() {
    updateTotal();
}

document.getElementById("total_checkout").innerHTML = sessionStorage.getItem("total");

sessionStorage.setItem("note", "");

function updateNote() {
    sessionStorage.setItem("note", note_html.value);
}

function updateName() {
    sessionStorage.setItem("name", name_html.value);
}

function updatePhone() {
    sessionStorage.setItem("phone", phone_html.value);
}

function updateAddress() {
    sessionStorage.setItem("address", address_html.value);
}

function updatePayment() {
    sessionStorage.setItem("payment", payment_html.value);
}

function updateTotal(){
    let total = 0;
    let total_cart = document.getElementById('total_checkout');
    var request = new XMLHttpRequest();
    let token = sessionStorage.getItem('token');
    
    request.open('GET', 'http://localhost:8000/api/keranjangs', true);
  
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    request.onload = function () {
        var data = JSON.parse(this.response);
        data.data.forEach(item => {
            total = total + (item.harga * item.qty);
        });
        total_cart.innerHTML = "Rp. " + number_format(total, 0, '.', '.');
    }

    request.send();
}

function number_format (number, decimals, decPoint, thousandsSep) { 
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    var s = ''

    var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec)
    return '' + (Math.round(n * k) / k)
    .toFixed(prec)
    }

    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)
}

  
