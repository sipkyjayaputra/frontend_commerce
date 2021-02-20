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
  
  request.open('GET', 'http://localhost:8000/api/keranjangs', true);

  request.setRequestHeader('Authorization', 'Bearer ' + token);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  request.onload = function () {
      var data = JSON.parse(this.response);
  
      if(data.data.length > 0){
        data.data.forEach(element => {
          const card = document.createElement("div");
          card.setAttribute("class", "card my-2");
          card.setAttribute("id", "card_product_"+element.id_produk);
          const card_body = document.createElement("div"); 
          card_body.setAttribute("class", "card-body");
          const row = document.createElement("div");
          row.setAttribute("class", "row");
          const img_container = document.createElement("div");
          img_container.setAttribute("class", "col-3");
          const img = document.createElement("img");
          img.setAttribute("src", "assets/images/products/"+element.gambar);
          img.setAttribute("width", "100px");
          img.setAttribute("class", "img-thumbnail");
          const desc_container = document.createElement("div");
          desc_container.setAttribute("class", "col-5 pt-2");
          const title = document.createTextNode(element.name);
          const title_container = document.createElement("strong");
          const price = document.createTextNode("Rp. " +number_format(element.harga, 0, '.', '.'));
          const price_container = document.createElement("p");
          price_container.setAttribute("class", "lead");
          const note = document.createTextNode("");
          const note_container = document.createElement("p");
          const qty_container = document.createElement("div");
          qty_container.setAttribute("class", "col-4 text-center");
          const strong = document.createElement("strong");
          const qty_title = document.createTextNode("Qantity");
          const br = document.createElement("br");
          const btn_container = document.createElement("div");
          btn_container.setAttribute("class", "mt-3");
          const btn_min = document.createElement("a");
          btn_min.setAttribute("onclick", "return minusItem("+element.id_produk+")");
          const icon_min = document.createElement("i");
          icon_min.setAttribute("class", " fa fa-minus-circle fa-lg");
          const input_qty = document.createElement("input");
          input_qty.setAttribute("type", "text");
          input_qty.setAttribute("value", element.qty);
          input_qty.setAttribute("size", "1");
          input_qty.setAttribute("id", "qty-"+element.id_produk)
          const btn_plus = document.createElement("a");
          btn_plus.setAttribute("onclick", "return plusItem("+element.id_produk+")");
          const icon_plus = document.createElement("i");
          icon_plus.setAttribute("class", " fa fa-plus-circle fa-lg");
          const remove_container = document.createElement("div");
          remove_container.setAttribute("class", "mt-2");
          const remove_btn = document.createElement("a");
          remove_btn.setAttribute("class", "text-danger");
          remove_btn.setAttribute("style", "text-decoration: undeline;");
          remove_btn.setAttribute("onclick", "return removeItem("+element.id_produk+")");
          const remove = document.createTextNode("Remove");

          remove_container.appendChild(remove_btn);
          remove_btn.appendChild(remove);
          btn_plus.appendChild(icon_plus);
          btn_min.appendChild(icon_min);
          btn_container.appendChild(btn_min);
          btn_container.appendChild(input_qty);
          btn_container.appendChild(btn_plus);
          strong.appendChild(qty_title);
          qty_container.appendChild(strong);
          qty_container.appendChild(br);
          qty_container.appendChild(btn_container);
          qty_container.appendChild(br);
          qty_container.appendChild(remove_container);
          note_container.appendChild(note);
          price_container.appendChild(price);
          title_container.appendChild(title);
          desc_container.appendChild(title_container);
          desc_container.appendChild(price_container);
          desc_container.appendChild(note_container);
          img_container.appendChild(img);
          row.appendChild(img_container);
          row.appendChild(desc_container);
          row.appendChild(qty_container);
          card_body.appendChild(row);
          card.appendChild(card_body);

          document.getElementById('cart-list').appendChild(card);
        });
      }else{
        document.getElementById('cart-list').innerHTML = `Keranjang anda masih kosong, beli beberapa barang`
      }
  }
  
  request.send();