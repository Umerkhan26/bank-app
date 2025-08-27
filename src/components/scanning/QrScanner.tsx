// src/components/QrScanner.tsx
import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";

const QrScanner: React.FC = () => {
  const [data, setData] = useState<string>("No result");
  const [scanned, setScanned] = useState<boolean>(false);
  const scannerRef = useRef<any>(null);

  const handleResult = (result: any, error: any) => {
    if (!!result && !scanned) {
      const text = result.getText();
      setData(text);
      setScanned(true); // stop further scans
    }
    if (!!error && !scanned) {
      console.warn(error);
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setData("No result");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-2">QR Code Scanner</h2>
      <div className="w-64 h-64 border rounded-lg overflow-hidden">
        <QrReader
          ref={scannerRef}
          constraints={{
            facingMode: "environment",
          }}
          onResult={handleResult}
          containerStyle={{ width: "100%", height: "100%" }}
          videoStyle={{ objectFit: "cover" }}
        />
      </div>

      <p className="mt-4 font-mono text-sm">
        {scanned ? `✅ Code: ${data}` : `Scanned Data: ${data}`}
      </p>

      {scanned && (
        <button
          onClick={resetScanner}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Scan Again
        </button>
      )}
    </div>
  );
};

export default QrScanner;
