function addToCart(kode) {

    const item = safeFind(kode);
    if (!item) return;

    // 🔥 ambil qty dari input
    const qtyInput = document.getElementById("qty_" + kode);
    let qty = Number(qtyInput.value || 1);

    if (qty < 1) qty = 1;

    const existing = CART.find(i => i.kode === kode);

    if (existing) {
        existing.qty += qty;
    } else {
        CART.push({
            kode: item.kode,
            nama: item.nama,
            harga: Number(item.harga_jual),
            qty: qty
        });
    }

    renderCart();

    // 🔥 reset input ke 1 biar enak
    qtyInput.value = 1;
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {

        const active = document.activeElement;

        if (active && active.id.startsWith("qty_")) {
            const kode = active.id.replace("qty_", "");
            addToCart(kode);
        }
    }
});

function renderCart() {

    const tbody = document.getElementById("cartBody");
    let html = "";
    let totalAll = 0;

    CART.forEach((item, index) => {

        const total = item.harga * item.qty;
        totalAll += total;

        html += `
      <tr>
        <td style="text-align:left;">${item.nama}</td>
        <td style="text-align:right;">Rp ${item.harga.toLocaleString("id-ID")}</td>
        <td style="text-align:center;">
          <input type="number" value="${item.qty}" min="1"
            onchange="updateQty(${index}, this.value)"
            style="width:60px;text-align:center;">
        </td>
        <td style="text-align:right;">Rp ${total.toLocaleString("id-ID")}</td>
        <td style="text-align:center;">
          <button onclick="removeItem(${index})">❌</button>
        </td>
      </tr>
    `;
    });

    tbody.innerHTML = html;

    document.getElementById("cartTotal").innerText =
        "Total: Rp " + totalAll.toLocaleString("id-ID");
}

function updateQty(index, value) {
    let qty = Number(value || 1);
    if (qty < 1) qty = 1;

    CART[index].qty = qty;
    renderCart();
}

function removeItem(index) {
    CART.splice(index, 1);
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
