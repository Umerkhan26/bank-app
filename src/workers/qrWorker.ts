// QR Code processing web worker
import jsQR from "jsqr";

self.onmessage = function (event) {
  const { imageData } = event.data;

  const image = new Image();
  image.src = imageData;

  image.onload = () => {
    // Resize image if it's too large
    const maxDimension = 1000;
    let width = image.width;
    let height = image.height;

    if (width > maxDimension || height > maxDimension) {
      if (width > height) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }
    }

    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");

    if (!context) {
      self.postMessage({ qrData: null, error: "Failed to get canvas context" });
      return;
    }

    context.drawImage(image, 0, 0, width, height);
    const imageDataObj = context.getImageData(0, 0, width, height);

    // Try the original image first
    try {
      const code = jsQR(imageDataObj.data, width, height);
      if (code) {
        let qrCode = code.data.split("/").pop() || null;
        if (qrCode) qrCode = qrCode.trim();
        self.postMessage({ qrData: qrCode });
        return;
      }
    } catch (e) {
      console.error("jsQR error:", e);
    }

    // Try binarization if first attempt fails
    try {
      const processedData = applyBinarization(imageDataObj);
      const code = jsQR(processedData.data, width, height);
      if (code) {
        let qrCode = code.data.split("/").pop() || null;
        if (qrCode) qrCode = qrCode.trim();
        self.postMessage({ qrData: qrCode });
        return;
      }
    } catch (e) {
      console.error("Binarization error:", e);
    }

    self.postMessage({ qrData: null, error: "No QR code found" });
  };

  image.onerror = () => {
    self.postMessage({ qrData: null, error: "Failed to load image" });
  };
};

function applyBinarization(imageData: ImageData): ImageData {
  const data = imageData.data;
  const threshold = 128;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = brightness > threshold ? 255 : 0;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }

  return imageData;
}
