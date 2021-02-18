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

request.setRequestHeader('Authorization', 'Bearer ' + `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzVkNWNiZjY2NzIzZjcwZGFlODRlOTUxOTAzODQ0ZWM2MDI5NjVlYjk5YmUzOTc5MTQyOGRiNjVhZTE3YTdkYzNmYjJjNzMwN2FmZDI5ZjYiLCJpYXQiOjE2MTM1NDQyMDAsIm5iZiI6MTYxMzU0NDIwMCwiZXhwIjoxNjQ1MDgwMjAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.PS3ZOtwcObxzfU2VwUmzrk7vg0pvNOEVCxqRBF-Mcsku22k6oABlaPkhzLtTXhUWErwqCovBOLICMuIxrHall-XOGcWP0LJkNt9M9nKxAUpyCoWoZum8POlFQwDdcO2GofbaHiz06mR-_TS-tnBQb6nmYGtseyyf18-lCdCmgSjfIW3knVOEa5MF7mpLmkroZPN5XB3mVXjERkXEdtDhzqEWVg-qmHWEQeEj-htGfx09sjwhFY86LNdzdx7J0aWGKOGeN0tgy7tqqBfKBtO2c8Plkeesc9Tb4aL-kKAa0yl3IK_7oFooH-YO6Lw6hjmwkYPtWQcES_VcahXMssis6O8l6PpGWl5V809tSzTuMuIbpEq-67VaVHIzsetd0mRN_02H0r2hEepjmHcIqnKg8iOmqZrlKRnGdICAVCh6sNfkk97CDm_FaHO9eW_6jrXzFdeYvZJkp_B_VVM8eEtpbF2VAMM0BU1OOB9GosSwysYR79xaJYqYT8jfItnneBM33EHHrZgYmZH9-Q_CZCzNCUBTL7qAPKPQJ1pBf9us0JxLqJDMWdQF8fgqN3ucEOc6BatGHKE_7eg9KnzVt-C7QERE1TkMHNaKYW5LVzt72OzwtTelTSqzNta27g5uKv0AqXoW6ibhtNsGIo3VR41BpJxjuPBOr0va18ZEX-klIkE`);

request.onload = function () {
    var data = JSON.parse(this.response);

    data.data.forEach(element => {
      const col_lg = document.createElement("div");
      col_lg.setAttribute("class", "col-lg-4 mt-3");
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
      const deskripsi = document.createTextNode(element.deskripsi);
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