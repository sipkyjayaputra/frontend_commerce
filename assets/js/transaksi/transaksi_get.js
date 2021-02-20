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
  
var request = new XMLHttpRequest();
let token = sessionStorage.getItem('token');

request.open('GET', 'http://localhost:8000/api/transaksis', true);

request.setRequestHeader('Authorization', 'Bearer ' + token);
request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

request.onload = function () {
    var data = JSON.parse(this.response);

    if(data.data[0].length > 0){
    data.data[0].forEach(element => {
        const tr = document.createElement("tr");
        const td_button = document.createElement("td");
        const td_date = document.createElement("td");
        const td_status = document.createElement("td");
        const td_total = document.createElement("td");
        const a = document.createElement("a");
        const strong = document.createElement("strong");
        let span_status = document.createElement("span");
        let status;
        if(element.status === 0){
            span_status.setAttribute("class", "badge badge-warning");
            status = document.createTextNode("Unfinished");
        }else{
            span_status.setAttribute("class", "badge badge-success");
            status = document.createTextNode("Finished");
        }
        a.setAttribute("href", "#");
        a.setAttribute("class", "text-dark");
        a.setAttribute("type", "button");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("data-target", "#exampleModal");
        a.setAttribute("onclick", "return transaksiDetail('"+element.kode_transaksi+"')");
        const kode_transaksi = document.createTextNode(element.kode_transaksi);
        const date = document.createTextNode(element.created_at);
        const total = document.createTextNode("Rp. " + number_format(element.total));
        span_status.appendChild(status);
        strong.appendChild(kode_transaksi);
        a.appendChild(strong);
        td_button.appendChild(a);
        td_date.appendChild(date);
        td_status.appendChild(span_status);
        td_total.appendChild(total);
        tr.appendChild(td_button);
        tr.appendChild(td_date);
        tr.appendChild(td_status);
        tr.appendChild(td_total);

        document.getElementById('transaksi-list').appendChild(tr);
    });
    }else{
        document.getElementById('transaksi-list').innerHTML = `Tidak ada daftar transaksi`;
    } 
}

request.send();