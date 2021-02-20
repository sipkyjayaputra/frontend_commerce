window.onload = function() {
    updateTotal();
}

function minusItem(id_produk){
    const qty = document.getElementById("qty-"+id_produk);
    if(qty.value > 1){
        qty_minus = (Number) (qty.value) - 1;
        qty.value = qty_minus;
        updateKeranjang(id_produk, qty_minus);
    } 
    updateTotal();
}

function plusItem(id_produk){
    const qty = document.getElementById("qty-"+id_produk);
    qty_plus = (Number) (qty.value) + 1;
    qty.value = qty_plus;
    updateKeranjang(id_produk, qty_plus);
    updateTotal();
}

function updateKeranjang(id_produk, qty) {
    let token = sessionStorage.getItem('token');
    const params = `id_produk=${id_produk}&qty=${qty}`;
    if(token === null){
        console.log("Login dahulu");
    }else{
        var request = new XMLHttpRequest()
    
        request.open('PUT', 'http://localhost:8000/api/keranjangs/'+id_produk, true);
    
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
        request.onload = function () {
            var data = JSON.parse(this.response);
        }
    
        request.send(params);
    }
    updateTotal();
}

function removeItem(id_produk) {
    let token = sessionStorage.getItem('token');
    const card = document.getElementById("card_product_"+id_produk);
    const params = `id_produk=${id_produk}`;
    if(token === null){
        console.log("Login dahulu");
    }else{
        var request = new XMLHttpRequest()
    
        request.open('DELETE', 'http://localhost:8000/api/keranjangs/'+id_produk, true);
    
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
        request.onload = function () {
            var data = JSON.parse(this.response);
            document.getElementById('cart-list').removeChild(card);
        }

        request.send(params);
    }
    updateTotal();
}

function updateTotal(){
    let total = 0;
    let total_cart = document.getElementById('total_cart');
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

  