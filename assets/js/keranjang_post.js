
function tambahKeranjang(id_produk) {
    var request = new XMLHttpRequest()

    request.open('POST', 'http://localhost:8000/api/keranjangs', true);

    request.setRequestHeader('Authorization', 'Bearer ' + `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzVkNWNiZjY2NzIzZjcwZGFlODRlOTUxOTAzODQ0ZWM2MDI5NjVlYjk5YmUzOTc5MTQyOGRiNjVhZTE3YTdkYzNmYjJjNzMwN2FmZDI5ZjYiLCJpYXQiOjE2MTM1NDQyMDAsIm5iZiI6MTYxMzU0NDIwMCwiZXhwIjoxNjQ1MDgwMjAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.PS3ZOtwcObxzfU2VwUmzrk7vg0pvNOEVCxqRBF-Mcsku22k6oABlaPkhzLtTXhUWErwqCovBOLICMuIxrHall-XOGcWP0LJkNt9M9nKxAUpyCoWoZum8POlFQwDdcO2GofbaHiz06mR-_TS-tnBQb6nmYGtseyyf18-lCdCmgSjfIW3knVOEa5MF7mpLmkroZPN5XB3mVXjERkXEdtDhzqEWVg-qmHWEQeEj-htGfx09sjwhFY86LNdzdx7J0aWGKOGeN0tgy7tqqBfKBtO2c8Plkeesc9Tb4aL-kKAa0yl3IK_7oFooH-YO6Lw6hjmwkYPtWQcES_VcahXMssis6O8l6PpGWl5V809tSzTuMuIbpEq-67VaVHIzsetd0mRN_02H0r2hEepjmHcIqnKg8iOmqZrlKRnGdICAVCh6sNfkk97CDm_FaHO9eW_6jrXzFdeYvZJkp_B_VVM8eEtpbF2VAMM0BU1OOB9GosSwysYR79xaJYqYT8jfItnneBM33EHHrZgYmZH9-Q_CZCzNCUBTL7qAPKPQJ1pBf9us0JxLqJDMWdQF8fgqN3ucEOc6BatGHKE_7eg9KnzVt-C7QERE1TkMHNaKYW5LVzt72OzwtTelTSqzNta27g5uKv0AqXoW6ibhtNsGIo3VR41BpJxjuPBOr0va18ZEX-klIkE`);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.onload = function () {
        var data = JSON.parse(this.response);
        const alert_container = document.getElementById("alert");
        const alert = document.createTextNode("Item Berhasil ditambahkan!");
        alert_container.setAttribute("class", "alert alert-success mt-3");
        alert_container.appendChild(alert);
    }

    request.send("id_produk="+id_produk);
}


  