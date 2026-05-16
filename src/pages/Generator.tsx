import { useState, useRef } from "react";
import QRCode from "qrcode";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generateQRValue, validateQRInput, calculateScannabilityScore } from "@/utils/qrCodeGenerator";

type QRType = "url" | "text" | "email" | "phone" | "wifi";

interface FormData {
  url: string;
  text: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  wifiSSID: string;
  wifiPassword: string;
  wifiSecurity: "WPA" | "WEP" | "nopass";
  label: string;
  errorCorrection: "L" | "M" | "Q" | "H";
  scale: number;
  cornerRadius: "sharp" | "soft" | "round";
  primaryColor: string;
}

export default function Generator() {
  const [qrType, setQrType] = useState<QRType>("url");
  const [formData, setFormData] = useState<FormData>({
    url: "",
    text: "",
    email: "",
    emailSubject: "",
    emailBody: "",
    phone: "",
    wifiSSID: "",
    wifiPassword: "",
    wifiSecurity: "WPA",
    label: "",
    errorCorrection: "H",
    scale: 10,
    cornerRadius: "soft",
    primaryColor: "#C3C0FF",
  });

  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [scannabilityScore, setScannabilityScore] = useState<number>(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const types = [
    { id: "url", label: "URL" },
    { id: "text", label: "Text" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "wifi", label: "WiFi" },
  ];

  // Generate QR code
  const generateQR = async () => {
    setError("");

    // Get the value based on type
    let qrValue = "";

    switch (qrType) {
      case "url":
        qrValue = formData.url;
        break;
      case "text":
        qrValue = formData.text;
        break;
      case "email":
        qrValue = `mailto:${formData.email}${
          formData.emailSubject ? `?subject=${encodeURIComponent(formData.emailSubject)}` : ""
        }${formData.emailBody ? `&body=${encodeURIComponent(formData.emailBody)}` : ""}`;
        break;
      case "phone":
        qrValue = `tel:${formData.phone}`;
        break;
      case "wifi":
        qrValue = `WIFI:T:${formData.wifiSecurity};S:${formData.wifiSSID};P:${formData.wifiPassword};;`;
        break;
    }

    // Validate input
    const validation = validateQRInput(qrType, formData);
    if (!validation.valid) {
      setError(validation.error || "Invalid input");
      return;
    }

    try {
      // Calculate scannability score
      const score = calculateScannabilityScore(qrValue, formData.errorCorrection);
      setScannabilityScore(score);

      // Generate QR code
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, qrValue, {
        errorCorrectionLevel: formData.errorCorrection,
        type: "image/png",
        scale: formData.scale,
        width: 512,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      const url = canvas.toDataURL("image/png");
      setQrDataUrl(url);
    } catch (err) {
      setError("Failed to generate QR code. Please check your input.");
      console.error(err);
    }
  };

  // Download QR code
  const downloadQR = (format: "png" | "svg") => {
    if (!qrDataUrl) return;

    if (format === "png") {
      const link = document.createElement("a");
      link.href = qrDataUrl;
      link.download = `qr-code-${qrType}-${Date.now()}.png`;
      link.click();
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!qrDataUrl) return;
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([
                new ClipboardItem({
                  "image/png": blob,
                }),
              ]);
            }
          });
        }
      };
      img.src = qrDataUrl;
    } catch (err) {
      console.error("Failed to copy:", err);
      setError("Failed to copy QR code to clipboard");
    }
  };

  // Share QR code
  const shareQR = async () => {
    if (!qrDataUrl) return;
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              const file = new File([blob], `qr-code-${qrType}-${Date.now()}.png`, { type: "image/png" });
              if (navigator.share) {
                await navigator.share({
                  title: "QR Code",
                  text: `QR Code (${qrType.toUpperCase()})`,
                  files: [file],
                });
              } else {
                setError("Share not supported on this device");
              }
            }
          });
        }
      };
      img.src = qrDataUrl;
    } catch (err) {
      console.error("Failed to share:", err);
      setError("Failed to share QR code");
    }
  };

  const handleTypeChange = (type: QRType) => {
    setQrType(type);
    setError("");
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B1326] text-[#DAE2FD]">

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-2">Generator Dashboard</h1>
            <p className="text-lg text-[#C7C4D8]">
              Create ultra-precise obsidian-grade QR codes with advanced encoding. Select your data type and customize the aesthetics below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Type Selector */}
              <div className="flex gap-2 p-1 rounded-[12px] border border-[rgba(195,192,255,0.10)] bg-[rgba(23,31,51,0.40)] backdrop-blur-[20px] flex-wrap">
                {types.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id as QRType)}
                    className={`px-6 py-4 rounded-[8px] font-medium text-sm transition-all ${
                      qrType === type.id
                        ? "bg-[#4F46E5] text-[#DAD7FF]"
                        : "text-[#C7C4D8] hover:text-[#DAE2FD]"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Input Canvas */}
              <div className="glass-card-dark p-10 rounded-[12px] space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-[8px] bg-[rgba(255,180,171,0.10)] border border-[#FFB4AB] text-[#FFB4AB] text-sm">
                    {error}
                  </div>
                )}

                {/* Type-specific inputs */}
                {qrType === "url" && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                      DESTINATION URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={formData.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                      className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                )}

                {qrType === "text" && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                      TEXT CONTENT
                    </label>
                    <textarea
                      placeholder="Enter your text here..."
                      value={formData.text}
                      onChange={(e) => handleInputChange("text", e.target.value)}
                      className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5] resize-none h-24"
                    />
                  </div>
                )}

                {qrType === "email" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        placeholder="user@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                        SUBJECT (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="Email subject"
                        value={formData.emailSubject}
                        onChange={(e) => handleInputChange("emailSubject", e.target.value)}
                        className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                        BODY (OPTIONAL)
                      </label>
                      <textarea
                        placeholder="Email body"
                        value={formData.emailBody}
                        onChange={(e) => handleInputChange("emailBody", e.target.value)}
                        className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5] resize-none h-20"
                      />
                    </div>
                  </div>
                )}

                {qrType === "phone" && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                )}

                {qrType === "wifi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                        NETWORK NAME (SSID)
                      </label>
                      <input
                        type="text"
                        placeholder="WiFi network name"
                        value={formData.wifiSSID}
                        onChange={(e) => handleInputChange("wifiSSID", e.target.value)}
                        className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                        SECURITY TYPE
                      </label>
                      <select
                        value={formData.wifiSecurity}
                        onChange={(e) => handleInputChange("wifiSecurity", e.target.value)}
                        className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] focus:outline-none focus:border-[#4F46E5]"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">Open (No Password)</option>
                      </select>
                    </div>
                    {formData.wifiSecurity !== "nopass" && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                          PASSWORD
                        </label>
                        <input
                          type="password"
                          placeholder="WiFi password"
                          value={formData.wifiPassword}
                          onChange={(e) => handleInputChange("wifiPassword", e.target.value)}
                          className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Common Options */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[rgba(70,69,85,0.10)]">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                      SCAN LABEL (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="Label for this QR code"
                      value={formData.label}
                      onChange={(e) => handleInputChange("label", e.target.value)}
                      className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px]">
                      ERROR CORRECTION
                    </label>
                    <select
                      value={formData.errorCorrection}
                      onChange={(e) => handleInputChange("errorCorrection", e.target.value)}
                      className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[#DAE2FD] focus:outline-none focus:border-[#4F46E5]"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateQR}
                  className="w-full py-4 rounded-[12px] bg-gradient-indigo-cyan text-white font-semibold text-lg hover:opacity-90 transition-opacity mt-6"
                >
                  Generate QR Code
                </button>
              </div>
            </div>

            {/* Right Panel: Live Preview */}
            <div className="glass-card-dark p-10 rounded-[12px] space-y-6 h-fit sticky top-32">
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-semibold text-[#DAE2FD]">Live Preview</h3>
                <p className="text-xs font-semibold text-[#C7C4D8] tracking-[1.2px] uppercase">Obsidian-Grade Rendering</p>
              </div>

              {qrDataUrl ? (
                <>
                  <div className="aspect-square rounded-[16px] bg-white p-6 flex items-center justify-center relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.40)]">
                    <img src={qrDataUrl} alt="QR Code Preview" className="w-full h-full" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base text-[#C7C4D8]">Scannability Score</span>
                      <span className={`text-base font-semibold ${
                        scannabilityScore >= 80 ? "text-[#4CD7F6]" : scannabilityScore >= 60 ? "text-[#FFB4AB]" : "text-[#FFB4AB]"
                      }`}>
                        {scannabilityScore >= 80 ? "Optimal" : scannabilityScore >= 60 ? "Good" : "Fair"} ({scannabilityScore}%)
                      </span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-[#2D3449] overflow-hidden">
                      <div
                        className="h-full bg-[#4CD7F6] transition-all shadow-[0_0_8px_rgba(3,181,211,0.50)]"
                        style={{ width: `${scannabilityScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadQR("png")}
                      className="flex-1 py-4 rounded-[12px] bg-gradient-indigo-cyan text-white font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12V12M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14V14V14H14V14V14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2V16" fill="white"/>
                      </svg>
                      Download PNG
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 py-4 rounded-[12px] border border-[rgba(70,69,85,0.30)] bg-[rgba(23,31,51,0.40)] text-[#DAE2FD] font-medium text-sm hover:bg-[rgba(23,31,51,0.60)] transition-colors flex items-center justify-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L2.25 5.25L3.3 4.1625L5.25 6.1125V0H6.75V6.1125L8.7 4.1625L9.75 5.25L6 9V9M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V8.25H1.5V10.5V10.5V10.5H10.5V10.5V10.5V8.25H12V10.5C12 10.9125 11.8531 11.2656 11.5594 11.5594C11.2656 11.8531 10.9125 12 10.5 12H1.5V12" fill="currentColor"/>
                      </svg>
                      Copy
                    </button>
                    <button className="flex-1 py-4 rounded-[12px] border border-[rgba(70,69,85,0.30)] bg-[rgba(23,31,51,0.40)] text-[#DAE2FD] font-medium text-sm hover:bg-[rgba(23,31,51,0.60)] transition-colors flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.25 15C10.625 15 10.0938 14.7812 9.65625 14.3438C9.21875 13.9062 9 13.375 9 12.75C9 12.675 9.01875 12.5 9.05625 12.225L3.7875 9.15C3.5875 9.3375 3.35625 9.48437 3.09375 9.59062C2.83125 9.69687 2.55 9.75 2.25 9.75C1.625 9.75 1.09375 9.53125 0.65625 9.09375C0.21875 8.65625 0 8.125 0 7.5C0 6.875 0.21875 6.34375 0.65625 5.90625C1.09375 5.46875 1.625 5.25 2.25 5.25C2.55 5.25 2.83125 5.30313 3.09375 5.40938C3.35625 5.51563 3.5875 5.6625 3.7875 5.85L9.05625 2.775C9.03125 2.6875 9.01562 2.60312 9.00937 2.52187C9.00312 2.44062 9 2.35 9 2.25C9 1.625 9.21875 1.09375 9.65625 0.65625C10.0938 0.21875 10.625 0 11.25 0C11.875 0 12.4062 0.21875 12.8438 0.65625C13.2812 1.09375 13.5 1.625 13.5 2.25C13.5 2.875 13.2812 3.40625 12.8438 3.84375C12.4062 4.28125 11.875 4.5 11.25 4.5C10.95 4.5 10.6687 4.44687 10.4062 4.34062C10.1438 4.23437 9.9125 4.0875 9.7125 3.9L4.44375 6.975C4.46875 7.0625 4.48437 7.14688 4.49062 7.22813C4.49687 7.30938 4.5 7.4 4.5 7.5C4.5 7.6 4.49687 7.69062 4.49062 7.77187C4.48437 7.85312 4.46875 7.9375 4.44375 8.025L9.7125 11.1C9.9125 10.9125 10.1438 10.7656 10.4062 10.6594C10.6687 10.5531 10.95 10.5 11.25 10.5C11.875 10.5 12.4062 10.7188 12.8438 11.1562C13.2812 11.5938 13.5 12.125 13.5 12.75C13.5 13.375 13.2812 13.9062 12.8438 14.3438C12.4062 14.7812 11.875 15 11.25 15V15M11.25 13.5C11.4625 13.5 11.6406 13.4281 11.7844 13.2844C11.9281 13.1406 12 12.9625 12 12.75C12 12.5375 11.9281 12.3594 11.7844 12.2156C11.6406 12.0719 11.4625 12 11.25 12C11.0375 12 10.8594 12.0719 10.7156 12.2156C10.5719 12.3594 10.5 12.5375 10.5 12.75C10.5 12.9625 10.5719 13.1406 10.7156 13.2844C10.8594 13.4281 11.0375 13.5 11.25 13.5V13.5M2.25 8.25C2.4625 8.25 2.64062 8.17813 2.78437 8.03438C2.92812 7.89063 3 7.7125 3 7.5C3 7.2875 2.92812 7.10937 2.78437 6.96562C2.64062 6.82187 2.4625 6.75 2.25 6.75C2.0375 6.75 1.85938 6.82187 1.71563 6.96562C1.57188 7.10937 1.5 7.2875 1.5 7.5C1.5 7.7125 1.57188 7.89063 1.71563 8.03438C1.85938 8.17813 2.0375 8.25 2.25 8.25V8.25M11.25 3C11.4625 3 11.6406 2.92812 11.7844 2.78437C11.9281 2.64062 12 2.4625 12 2.25C12 2.0375 11.9281 1.85938 11.7844 1.71563C11.6406 1.57188 11.4625 1.5 11.25 1.5C11.0375 1.5 10.8594 1.57188 10.7156 1.71563C10.5719 1.85938 10.5 2.0375 10.5 2.25C10.5 2.4625 10.5719 2.64062 10.7156 2.78437C10.8594 2.92812 11.0375 3 11.25 3V3" fill="currentColor"/>
                      </svg>
                      Share
                    </button>
                  </div>
                </>
              ) : (
                <div className="aspect-square rounded-[16px] bg-[rgba(45,52,73,0.30)] flex items-center justify-center text-center">
                  <div className="space-y-2">
                    <p className="text-[#C7C4D8]">Generate a QR code to see preview</p>
                    <p className="text-xs text-[#918FA1]">Fill in the form and click generate</p>
                  </div>
                </div>
              )}

              {qrDataUrl && (
                <div className="border-t border-[rgba(70,69,85,0.10)] pt-4 text-xs font-semibold text-[#C7C4D8] space-y-1">
                  <div>Encoding: UTF-8</div>
                  <div>Type: {qrType.toUpperCase()}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
