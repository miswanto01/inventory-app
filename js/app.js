initFromURL();
loadProduk();
setTimeout(loadTransaksi, 1000);

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      STATE.produk.search = this.value;
      STATE.produk.page = 1;
      updateURL();
      loadProduk();
    });
  }
  // load awal
  loadProduk();
  loadTransaksi();

});

function quickFilter(type) {
    currentFilter = type;
    currentPageProduk = 1;
    loadData();
}

function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function safeFind(kode) {
    return DATA.find(i =>
        String(i.kode || "").trim() === String(kode || "").trim()
    );
}

function openSellModal(kode) {

    const item = safeFind(kode);

    if (!item) {
        alert("Barang tidak ditemukan ❌");
        return;
    }

    sellKode = kode;
    sellHarga = Number(item.harga_jual || 0);

    document.getElementById("sellKode").innerText = "Kode: " + kode;
    document.getElementById("sellQty").value = 1;

    updateTotal();

    document.getElementById("sellModal").style.display = "flex";
}

function closeSellModal() {
    document.getElementById("sellModal").style.display = "none";
}

function changeQty(val) {

    let input = document.getElementById("sellQty");

    let current = Number(input.value || 1);
    current += val;

    if (current < 1) current = 1;

    input.value = current;

    updateTotal(); // 🔥 refresh total
}

function updateTotal() {
    const qty = Number(document.getElementById("sellQty").value || 0);
    const total = qty * sellHarga;
    document.getElementById("totalHarga").innerText =
        "Total: " + total;
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
