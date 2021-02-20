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

function transaksiDetail(kode_transaksi){
    var request = new XMLHttpRequest();
    let token = sessionStorage.getItem('token');
    
    request.open('GET', 'http://localhost:8000/api/transaksi_details/detail/'+kode_transaksi, true);
    
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    request.onload = function () {
        var data = JSON.parse(this.response);
    
        let total_val = 0;
        if(data.data.length > 0){
            let history_order_detail = '';
            data.data.forEach(element => {
                total_val = total_val + element.subtotal;
                history_order_detail = history_order_detail + `
                    <div class="row">
                        <div class="col-md-2">
                            <img src="assets/images/products/${element.gambar}" class="img-thumbnail" width="100px" alt="">
                        </div>
                        <div class="col-md-5">
                            <h5><strong>${element.name}</strong></h5>
                            <p class="text-muted">${element.deskripsi.substr(0,10)}...</p>
                            <p class="">Rp. ${number_format(element.harga, 0, '.', '.')}</p>
                        </div>
                        <div class="col-md-2">
                            <p><Strong>Quantity</Strong></p>
                            <p>${element.qty}</p>
                        </div>
                        <div class="col-md-2">
                            <p><Strong>Total</Strong></p>
                            <p>Rp. ${number_format(element.subtotal, '0', '.', '.')}</p>
                        </div>
                    </div>
                    <hr>
                `;
            });
            document.getElementById('history-order-detail').innerHTML = history_order_detail;
        }else{
            document.getElementById('history-order-detail').innerHTML = `Tidak ada daftar transaksi`;
        } 
        document.getElementById('total_detail').innerHTML = "Total: Rp. " + number_format(total_val, 0, '.', '.');
        document.getElementById('title-detail').innerHTML = "Order No - " + kode_transaksi;
    }
    
    request.send();
}
