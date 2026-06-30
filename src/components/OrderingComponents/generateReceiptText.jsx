export const generateReceiptText = (items, total, sgst, cgst, grandTotal) => {
    const date = new Date().toLocaleDateString('en-IN');
    let receiptText = `THE RESTAURANT\n123 Main Street, City\n\n`;
    receiptText += `Table No: 5\nBill Date: ${date}\n\n`;
    receiptText += `${'='.repeat(40)}\n`;

    items.forEach(item => {
        receiptText += `${item.name} x${item.quantity}`.padEnd(32) + `₹${item.price * item.quantity}\n`;
    });

    receiptText += `${'='.repeat(40)}\n`;
    receiptText += `Subtotal:`.padEnd(32) + `₹${total}\n`;
    receiptText += `SGST (9%):`.padEnd(32) + `₹${sgst.toFixed(2)}\n`;
    receiptText += `CGST (9%):`.padEnd(32) + `₹${cgst.toFixed(2)}\n`;
    receiptText += `${'='.repeat(40)}\n`;
    receiptText += `Grand Total:`.padEnd(32) + `₹${grandTotal.toFixed(2)}\n`;
    receiptText += `${'='.repeat(40)}\n\n`;
    receiptText += `Thank you for your order!`;

    return receiptText;
};