window.renderTransaksi = function(res) {

    const data = res.data || []; // 🔥 penting

    const tbody = document.getElementById("trxBody");
    if (!tbody) return;

    let html = "";

    let hariIni = 0;
    let mingguIni = 0;
    let bulanIni = 0;

    let produkMap = {};

    const now = new Date();

    const reversed = [...data].reverse(); // 🔥 FIX AMAN

    const start = (currentPageTransaksi - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const paginated = reversed.slice(start, end);

    paginated.forEach(trx => {

        const qty = Number(trx.qty || 0);
        const total = Number(trx.total || 0);
        const status = trx.status || "OK";
        const tanggal = new Date(trx.tanggal);

        const totalRp = total.toLocaleString("id-ID");
        const warna = status === "OK" ? "green" : "red";

        // =========================
        // 🔥 HITUNG PROFIT
        // =========================
        if (status === "OK") {

            // HARI INI
            if (tanggal.toDateString() === now.toDateString()) {
                hariIni += total;
            }

            // MINGGU INI
            const firstDay = new Date(now);
            firstDay.setDate(now.getDate() - now.getDay());

            if (tanggal >= firstDay) {
                mingguIni += total;
            }

            // BULAN INI
            if (
                tanggal.getMonth() === now.getMonth() &&
                tanggal.getFullYear() === now.getFullYear()
            ) {
                bulanIni += total;
            }

            // PRODUK TERLARIS
            if (!produkMap[trx.nama]) {
                produkMap[trx.nama] = 0;
            }
            produkMap[trx.nama] += qty;
        }

        html += `
      <tr>
        <td style="text-align:center;">${tanggal.toLocaleString()}</td>
        <td style="text-align:center;">${trx.kode || "-"}</td>
        <td style="text-align:left;">${trx.nama || "-"}</td>
        <td style="text-align:center;">${qty}</td>
        <td style="text-align:right;">Rp ${totalRp}</td>
        <td style="text-align:center;color:${warna};font-weight:bold;">
          ${status}
        </td>
      </tr>
    `;
    });

    tbody.innerHTML = html;

    // =========================
    // 🔥 UPDATE UI PROFIT
    // =========================
    document.getElementById("profitHarian").innerText =
        "📅 Profit Hari Ini: Rp " + hariIni.toLocaleString("id-ID");

    document.getElementById("profitMingguan").innerText =
        "🗓️ Profit Minggu Ini: Rp " + mingguIni.toLocaleString("id-ID");

    document.getElementById("profitBulanan").innerText =
        "📆 Profit Bulan Ini: Rp " + bulanIni.toLocaleString("id-ID");

    // =========================
    // 🔥 PRODUK TERLARIS
    // =========================
    let terlaris = "-";
    let max = 0;

    for (let nama in produkMap) {
        if (produkMap[nama] > max) {
            max = produkMap[nama];
            terlaris = nama + " (" + max + ")";
        }
    }

    document.getElementById("produkTerlaris").innerText =
        "🏆 Produk Terlaris: " + terlaris;

    renderPaginationTransaksi(res.total || 0);
}

