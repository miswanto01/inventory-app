function cetakPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [58, 200]
    });

    let y = 5;

    // 🏪 HEADER
    doc.setFontSize(10);
    doc.text("TOKO MISWANTO", 29, y, { align: "center" });
    y += 4;

    doc.setFontSize(7);
    doc.text("Desa Kauman, Jawa Tengah", 29, y, { align: "center" });
    y += 5;

    // 🧾 INFO
    const invoice = "INV-" + Date.now();
    const tanggal = new Date().toLocaleString();

    doc.text(invoice, 2, y);
    y += 3;
    doc.text(tanggal, 2, y);
    y += 4;

    doc.text("----------------------------", 2, y);
    y += 4;

    // 🛒 DATA
    let totalSemua = 0;

    CART.forEach(item => {

        const subtotal = item.qty * item.harga;
        totalSemua += subtotal;

        doc.text(item.nama.substring(0, 18), 2, y);
        y += 3;

        doc.text(
            `${item.qty} x ${item.harga.toLocaleString("id-ID")}`,
            2,
            y
        );

        doc.text(
            subtotal.toLocaleString("id-ID"),
            56,
            y,
            { align: "right" }
        );

        y += 4;
    });

    // 💰 TOTAL
    doc.text("----------------------------", 2, y);
    y += 4;

    doc.setFontSize(9);
    doc.text("TOTAL", 2, y);

    doc.text(
        "Rp " + totalSemua.toLocaleString("id-ID"),
        56,
        y,
        { align: "right" }
    );

    // 🙏 FOOTER
    y += 6;

    doc.setFontSize(7);
    doc.text("Terima kasih", 29, y, { align: "center" });
    y += 3;
    doc.text("Barang tidak dapat dikembalikan", 29, y, { align: "center" });

    // SAVE
    doc.save(invoice + ".pdf");
}
