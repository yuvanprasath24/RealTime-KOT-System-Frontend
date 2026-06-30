import { generateReceiptText } from "./generateReceiptText";

export const handleShareReceipt = async (items, total, sgst, cgst, grandTotal) => {
    const receiptText = generateReceiptText(items, total, sgst, cgst, grandTotal);

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Restaurant Receipt',
                text: receiptText,
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                navigator.clipboard.writeText(receiptText);
                alert('Receipt copied to clipboard!');
            }
        }
    } else {
        navigator.clipboard.writeText(receiptText);
        alert('Receipt copied to clipboard!');
    }
};