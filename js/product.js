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

  if (!Array.isArray(DATA)) return;

  const tbody = document.getElementById("tbody");
  let html = "";
  let totalSemua = 0;

  DATA.forEach(item => {

    const beli = Number(item.harga_beli || 0);
    const jual = Number(item.harga_jual || 0);
    const jumlah = Number(item.jumlah || 0);

    const profit = jual - beli;
    const total = profit * jumlah;

    totalSemua += total;

    html += `
<tr>
  <td>${item.kode}</td>
  <td>${item.nama}</td>
  <td>${jumlah}</td>
  <td>Rp ${beli.toLocaleString("id-ID")}</td>
  <td>Rp ${jual.toLocaleString("id-ID")}</td>
  <td>Rp ${profit.toLocaleString("id-ID")}</td>
  <td>Rp ${total.toLocaleString("id-ID")}</td>
  <td>
    <input type="number" id="qty_${item.kode}" value="1" min="1" style="width:60px;">
    <button onclick="addToCart('${item.kode}')">+ Keranjang</button>
  </td>
</tr>`;
  });

  tbody.innerHTML = html;

  document.getElementById("totalProfit").innerText =
    "💰 Total Profit: Rp " + totalSemua.toLocaleString("id-ID");
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

