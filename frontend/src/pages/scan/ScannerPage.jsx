import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "../../scanner.css";
import Button from "../../components/Button";

const Scanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);

  const navigate = useNavigate();
  const html5QrCodeRef = useRef(null);

  
  const handleScannedText = async (decodedText) => {
    console.log("Scanned result:", decodedText);
    setScanResult(decodedText);
    console.log(decodedText)

    try {
      const res = await axios.get(`http://localhost:8080/api/compartment/${decodedText}`);
      if (res.data.success) {
        navigate("/action-page", { state: { compartment: decodedText } });
      } else {
        setError(" You searched for wrong item");
      }
    } catch (err) {
      console.error(err);
      setError(" Server error or compartment not found");
    }
  };

  //  Start Scanner
  const startScanner = () => {
    if (scanning) return;
    const html5QrCode = new Html5Qrcode("camera-reader");
    html5QrCodeRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => handleScannedText(decodedText),
        (err) => console.log("Scanning error:", err)
      )
      .then(() => setScanning(true))
      .catch((err) => {
        console.error("Unable to start scanning:", err);
        setError(" Could not start camera");
      });
  };

  //  Stop Scanner
  const stopScanner = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          setScanning(false);
          console.log("Scanner stopped");
        })
        .catch((err) => console.error("Failed to stop scanner:", err));
    }
  };

  // Image Upload Scan
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("image-reader"); 
    try {
      const result = await html5QrCode.scanFile(file, true);
      handleScannedText(result);
    } catch (err) {
      console.error("Image scan failed:", err);
      setError(" Could not scan QR code from image");
    }
  };

  // Cleanup
  useEffect(() => {
    startScanner()
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-5 min-w-screen bg-gradient-to-b from-blue-100 to-white px-6">
      <Navbar />
      <h2 className="text-[22px] font-bold">Scan QR Code</h2>

      {/* Camera Scanner */}
      <div
        id="camera-reader"
        style={{ width: "100%", maxWidth: "300px", height: "300px", margin: "auto" }}
      ></div>

      {/* Hidden div for image scanner */}
      <div id="image-reader" style={{ display: "none" }}></div>

      {/* Custom Controls */}
      <div className=" justify-center gap-3 mt-4">
        {!scanning ? (
          <Button onClick={startScanner}>Start Camera</Button>
        ) : (
          <Button onClick={stopScanner}>Stop Camera</Button>
        )}

        <label className="px-4 py-2 bg-green-500 text-white rounded-lg shadow cursor-pointer">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {scanResult && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center">
          Last Scan: {scanResult}
        </div>
      )}

      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default Scanner;

