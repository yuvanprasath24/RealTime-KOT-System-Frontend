import { generateReceiptText } from "./generateReceiptText";

export const handleDownloadReceipt = (items, total, sgst, cgst, grandTotal) => {
    const receiptText = generateReceiptText(items, total, sgst, cgst, grandTotal);
    const element = document.createElement('a');
    const file = new Blob([receiptText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `receipt_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};