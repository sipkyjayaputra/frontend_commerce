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

var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:8000/api/products/toko/1', true);

request.onload = function () {
    var data = JSON.parse(this.response);

    data.data.forEach(element => {
      const col_lg = document.createElement("div");
      col_lg.setAttribute("class", "col-lg-3 mt-3 col-md-4 col-sm-6");
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      const img = document.createElement("img");
      img.setAttribute("class", "card-img-top");
      img.setAttribute("src", "assets/images/products/"+element.gambar);
      img.setAttribute("alt", "Image thumbnail");
      const card_body = document.createElement("div");
      card_body.setAttribute("class", "card-body");
      const card_title = document.createElement("h5");
      card_title.setAttribute("class", "card-title");
      const p = document.createElement("p");
      p.setAttribute("class", "card-text");
      const title = document.createTextNode(element.name);
      const deskripsi = document.createTextNode(element.deskripsi.substr(0,50)+"...");
      const footer_container = document.createElement("div");
      footer_container.setAttribute("class", "row mt-5");
      const price_container = document.createElement("div");
      price_container.setAttribute("class", "col-md-6");
      const price = document.createTextNode("Rp. "+number_format(element.harga, 0, '.', '.'));
      const btn_container = document.createElement("div");
      btn_container.setAttribute("class", "col-md-6 text-right");
      const anchor = document.createElement("button");
      anchor.setAttribute("class", "btn btn-primary");
      anchor.setAttribute("onclick", "return tambahKeranjang("+element.id+")");
      const icon = document.createElement("i");
      icon.setAttribute("class", "fa fa-cart-plus");
  
      anchor.appendChild(icon);
      btn_container.appendChild(anchor);
      price_container.appendChild(price);
      footer_container.appendChild(price_container);
      footer_container.appendChild(btn_container);
      card_title.appendChild(title);
      card_body.appendChild(card_title);
      card_body.appendChild(deskripsi);
      card_body.appendChild(footer_container);
      card.appendChild(img);
      card.appendChild(card_body);
      col_lg.appendChild(card);
  
      document.getElementById('product-list').appendChild(col_lg);
    });
}

request.send();