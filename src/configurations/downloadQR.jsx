export const downloadQR = (tableNumber) => {
    const svg = document.getElementById(`qr-${tableNumber}`);

    if (!svg) {
        console.error("QR code not found");
        return;
    }
  const svgString = new XMLSerializer().serializeToString(svg);
  
  // Convert SVG layout to a downloadable PNG blob
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const URL = window.URL || window.webkitURL || window;
  const blobURL = URL.createObjectURL(svgBlob);
  
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300; // High resolution size for printing crisp stickers
    canvas.height = 300;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, 300, 300);
    
    const png = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = png;
    downloadLink.download = `Table_${tableNumber}_QR.png`; // Saves file as "Table_5_QR.png"
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  image.src = blobURL;
};