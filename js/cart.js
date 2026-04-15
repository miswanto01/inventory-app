function addToCart(kode) {
    const item = DATA.find(i => i.kode == kode);
    if (!item) return;

    const qty = Number(document.getElementById("qty_" + kode).value || 1);

    const exist = CART.find(i => i.kode === kode);

    if (exist) {
        exist.qty += qty;
    } else {
        CART.push({
            kode: item.kode,
            nama: item.nama,
            harga: Number(item.harga_jual),
            qty
        });
    }

    renderCart();
}

function renderCart() {
    const tbody = document.getElementById("cartBody");

    let html = "";
    let total = 0;

    CART.forEach((item, i) => {
        const subtotal = item.harga * item.qty;
        total += subtotal;

        html += `
      <tr>
        <td>${item.nama}</td>
        <td>Rp ${item.harga.toLocaleString()}</td>
        <td>
          <input value="${item.qty}" onchange="updateQty(${i}, this.value)">
        </td>
        <td>Rp ${subtotal.toLocaleString()}</td>
        <td><button onclick="removeItem(${i})">❌</button></td>
      </tr>
    `;
    });

    tbody.innerHTML = html;
    document.getElementById("cartTotal").innerText =
        "Total: Rp " + total.toLocaleString();
}

function updateQty(i, val) {
    CART[i].qty = Number(val);
    renderCart();
}

function removeItem(i) {
    CART.splice(i, 1);
    renderCart();
}

function clearCart() {
    CART = [];
    renderCart();
}

function checkout() {

    if (CART.length === 0) {
        alert("Keranjang kosong ❌");
        return;
    }

    // 🔥 CETAK PDF
    cetakPDF();

    // 🔥 SIMPAN KE SERVER
    CART.forEach(item => {

        const form = document.createElement("form");
        form.method = "POST";
        form.action = CONFIG.API_URL;
        form.target = "hidden_iframe";

        const data = {
            action: "jual",
            kode: item.kode,
            qty: item.qty
        };

        for (let key in data) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => form.remove(), 500);
    });

    setTimeout(() => {
        alert("✔ Checkout berhasil 🚀");

        CART = [];
        renderCart();
        refreshData();
        loadTransaksi();
    }, 1000);
}
