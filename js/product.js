function renderProduk(res) {
  if (!res || !res.data) return;

  STATE.produk.page = res.page;
  STATE.produk.limit = res.limit;

  const key = `${res.page}_${res.limit}_${STATE.produk.search}`;

  CACHE[key] = res;
  DATA = res.data;

  renderTable();
  renderPaginationProduk(res.total);
}

function renderTable() {
  const tbody = document.getElementById("tbody");

  let html = "";
  let total = 0;

  DATA.forEach(item => {
    const beli = Number(item.harga_beli || 0);
    const jual = Number(item.harga_jual || 0);
    const qty = Number(item.jumlah || 0);

    const profit = jual - beli;
    const totalProfit = profit * qty;

    total += totalProfit;

    html += `
      <tr>
        <td>${item.kode}</td>
        <td>${item.nama}</td>
        <td>${qty}</td>
        <td>Rp ${beli.toLocaleString()}</td>
        <td>Rp ${jual.toLocaleString()}</td>
        <td>Rp ${profit.toLocaleString()}</td>
        <td>Rp ${totalProfit.toLocaleString()}</td>
        <td>
          <input id="qty_${item.kode}" type="number" value="1" min="1">
          <button onclick="addToCart('${item.kode}')">+ Cart</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;

  document.getElementById("totalProfit").innerText =
    "💰 Total Profit: Rp " + total.toLocaleString();
}

function jualBarang(kode, qty) {

  const form = document.createElement("form");
  form.method = "POST";
  form.action = CONFIG.API_URL;
  form.target = "hidden_iframe";

  const data = {
    action: "jual",
    kode: kode,
    qty: qty
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

  setTimeout(() => form.remove(), 1000);

  alert("Penjualan terkirim 🚀");
}

function submitBarang() {

  const form = document.createElement("form");
  form.method = "POST";
  form.action = CONFIG.API_URL;
  form.target = "hidden_iframe";

  const data = {
    action: "tambah",
    kode: document.getElementById("kode").value,
    nama: document.getElementById("nama").value,
    harga_beli: document.getElementById("beli").value,
    harga_jual: document.getElementById("jual").value,
    jumlah_barang: document.getElementById("jumlah").value
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

  setTimeout(() => {
    form.remove();
    closeModal();
    alert("Barang berhasil ditambahkan 🚀");
  }, 1000);
}
