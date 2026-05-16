export type QRType = "url" | "text" | "email" | "phone" | "wifi";

export interface QRData {
  type: QRType;
  value: string;
  label?: string;
}

export interface WifiQRData {
  ssid: string;
  password: string;
  security: "WPA" | "WEP" | "nopass";
}

export interface EmailQRData {
  email: string;
  subject?: string;
  body?: string;
}

export interface PhoneQRData {
  phone: string;
}

/**
 * Generate QR code data based on type and input
 */
export function generateQRValue(type: QRType, data: any): string {
  switch (type) {
    case "url":
      return data.url || "";

    case "text":
      return data.text || "";

    case "email": {
      const email = data.email || "";
      const subject = data.subject ? `subject=${encodeURIComponent(data.subject)}` : "";
      const body = data.body ? `body=${encodeURIComponent(data.body)}` : "";
      const params = [subject, body].filter(Boolean).join("&");
      return `mailto:${email}${params ? "?" + params : ""}`;
    }

    case "phone":
      return `tel:${data.phone || ""}`;

    case "wifi": {
      const { ssid, password, security } = data;
      // WiFi QR format: WIFI:T:WPA;S:SSID;P:PASSWORD;;
      const securityType = security === "nopass" ? "nopass" : security;
      if (securityType === "nopass") {
        return `WIFI:T:nopass;S:${ssid};;`;
      }
      return `WIFI:T:${securityType};S:${ssid};P:${password};;`;
    }

    default:
      return "";
  }
}

/**
 * Calculate QR code size based on data length
 * Larger data = larger QR code needed
 */
export function calculateQRSize(value: string): number {
  const length = value.length;

  if (length <= 41) return 1;
  if (length <= 77) return 2;
  if (length <= 127) return 3;
  if (length <= 187) return 4;
  if (length <= 255) return 5;
  if (length <= 322) return 6;
  if (length <= 370) return 7;

  return 8;
}

/**
 * Validate QR input data
 */
export function validateQRInput(type: QRType, data: any): { valid: boolean; error?: string } {
  switch (type) {
    case "url": {
      const url = data.url?.trim();
      if (!url) return { valid: false, error: "URL is required" };
      try {
        new URL(url);
        return { valid: true };
      } catch {
        return { valid: false, error: "Invalid URL format" };
      }
    }

    case "text": {
      const text = data.text?.trim();
      if (!text) return { valid: false, error: "Text is required" };
      if (text.length > 2953) return { valid: false, error: "Text is too long (max 2953 chars)" };
      return { valid: true };
    }

    case "email": {
      const email = data.email?.trim();
      if (!email) return { valid: false, error: "Email is required" };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return { valid: false, error: "Invalid email format" };
      return { valid: true };
    }

    case "phone": {
      const phone = data.phone?.trim();
      if (!phone) return { valid: false, error: "Phone number is required" };
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone)) return { valid: false, error: "Invalid phone format" };
      return { valid: true };
    }

    case "wifi": {
      const { ssid, password, security } = data;
      if (!ssid?.trim()) return { valid: false, error: "SSID is required" };
      if (security !== "nopass" && !password?.trim()) {
        return { valid: false, error: "Password is required for secured WiFi" };
      }
      return { valid: true };
    }

    default:
      return { valid: false, error: "Unknown QR type" };
  }
}

/**
 * Calculate scannability score based on QR data
 */
export function calculateScannabilityScore(
  value: string,
  errorCorrection: "L" | "M" | "Q" | "H" = "H"
): number {
  let score = 100;

  // Reduce score based on data length
  const dataLengthFactor = Math.max(0, 100 - value.length * 0.5);
  score = score * (dataLengthFactor / 100);

  // Add bonus for error correction level
  const errorCorrectionBonus = {
    L: 0,
    M: 5,
    Q: 10,
    H: 15,
  };
  score += errorCorrectionBonus[errorCorrection];

  return Math.round(Math.min(100, score));
}
