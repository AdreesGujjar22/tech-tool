import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Settings, Gauge, QrCode, Palette, Type, AlertTriangle, Smartphone, Shield, Mail, Clock, Zap, CheckCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="min-h-screen bg-[#0B1326] text-[#DAE2FD]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 w-full h-96 bg-hero-radial pointer-events-none"
          style={{ top: "0" }}
        />

        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight gradient-text">
              Help Center – TechTools
            </h1>
            <p className="text-lg text-[#C7C4D8] max-w-[800px] mx-auto leading-relaxed">
              Welcome to TechTools Help Center
            </p>
            <p className="text-base text-[#C7C4D8] max-w-[800px] mx-auto leading-relaxed">
              At TechTools, we aim to make your experience simple, fast, and smooth. This Help page will guide you on how to use our tools, solve common issues, and get support when needed.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-[960px] mx-auto space-y-12">
          {/* How to Use Our Tools */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-[rgba(195,192,255,0.10)] flex items-center justify-center">
                <Settings className="w-6 h-6 text-[#C3C0FF]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#DAE2FD]">How to Use Our Tools</h2>
            </div>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              All tools on TechTools are designed to work instantly in your browser:
            </p>
            <ol className="space-y-3 text-base text-[#C7C4D8] leading-relaxed list-decimal list-inside">
              <li>Open any tool from the homepage</li>
              <li>Enter required input (if needed)</li>
              <li>Click the action button (Generate / Convert / Test / Scan)</li>
              <li>Get instant results</li>
            </ol>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4 font-semibold">
              No login required. No installation needed.
            </p>
          </div>

          {/* Common Tools Guide */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Common Tools Guide</h2>
            
            <div className="space-y-6">
              {/* Speed Test Tool */}
              <div className="flex items-start gap-4 p-4 rounded-[16px] bg-[rgba(23,31,51,0.40)]">
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(195,192,255,0.10)] flex items-center justify-center flex-shrink-0">
                  <Gauge className="w-5 h-5 text-[#C3C0FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#DAE2FD] mb-2">Speed Test Tool</h3>
                  <ul className="space-y-1 text-sm text-[#C7C4D8]">
                    <li>• Click "Start Test"</li>
                    <li>• Wait for download & upload measurement</li>
                    <li>• View your internet speed results instantly</li>
                  </ul>
                </div>
              </div>

              {/* QR Generator */}
              <div className="flex items-start gap-4 p-4 rounded-[16px] bg-[rgba(23,31,51,0.40)]">
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(76,215,246,0.10)] flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-5 h-5 text-[#4CD7F6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#DAE2FD] mb-2">QR Generator</h3>
                  <ul className="space-y-1 text-sm text-[#C7C4D8]">
                    <li>• Enter text or URL</li>
                    <li>• Click "Generate QR"</li>
                    <li>• Download or scan QR code</li>
                  </ul>
                </div>
              </div>

              {/* Color Picker */}
              <div className="flex items-start gap-4 p-4 rounded-[16px] bg-[rgba(23,31,51,0.40)]">
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,180,171,0.10)] flex items-center justify-center flex-shrink-0">
                  <Palette className="w-5 h-5 text-[#FFB4AB]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#DAE2FD] mb-2">Color Picker</h3>
                  <ul className="space-y-1 text-sm text-[#C7C4D8]">
                    <li>• Select any color using picker</li>
                    <li>• Copy HEX / RGB / HSL values</li>
                    <li>• Use in your design projects</li>
                  </ul>
                </div>
              </div>

              {/* Text Utilities */}
              <div className="flex items-start gap-4 p-4 rounded-[16px] bg-[rgba(23,31,51,0.40)]">
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(195,192,255,0.10)] flex items-center justify-center flex-shrink-0">
                  <Type className="w-5 h-5 text-[#C3C0FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#DAE2FD] mb-2">Text Utilities</h3>
                  <ul className="space-y-1 text-sm text-[#C7C4D8]">
                    <li>• Convert text (uppercase, lowercase)</li>
                    <li>• Count words & characters</li>
                    <li>• Remove extra spaces</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-[rgba(255,180,171,0.10)] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#FFB4AB]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#DAE2FD]">Troubleshooting</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Tool not working?</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed mb-3">Try:</p>
                <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
                  <li>• Refresh the page</li>
                  <li>• Clear browser cache</li>
                  <li>• Use updated Chrome / Edge browser</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Slow loading?</h3>
                <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
                  <li>• Check your internet connection</li>
                  <li>• Disable ad blockers if needed</li>
                  <li>• Retry after few seconds</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Results not showing?</h3>
                <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
                  <li>• Make sure input is valid</li>
                  <li>• Ensure required fields are filled</li>
                  <li>• Try again after refresh</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Support */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-[rgba(76,215,246,0.10)] flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#4CD7F6]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#DAE2FD]">Mobile Support</h2>
            </div>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              TechTools is fully responsive and works on:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Mobile phones 📱</li>
              <li>• Tablets 📟</li>
              <li>• Desktop 💻</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              For best experience, use landscape mode on mobile.
            </p>
          </div>

          {/* Privacy & Safety */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-[rgba(195,192,255,0.10)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#C3C0FF]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#DAE2FD]">Privacy & Safety</h2>
            </div>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• We do not store your personal data</li>
              <li>• All tools run directly in your browser</li>
              <li>• No login or tracking required for tool usage</li>
            </ul>
          </div>

          {/* Need More Help */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-[rgba(76,215,246,0.10)] flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#4CD7F6]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#DAE2FD]">Need More Help?</h2>
            </div>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              If you still face issues:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed mb-4">
              <li>📧 Email: support@techtools.com</li>
              <li>🕒 Response time: within 24 hours</li>
              <li>📍 Support: Available Monday–Friday</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              Or visit our Contact page.
            </p>
          </div>

          {/* Tips for Best Experience */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-[rgba(255,180,171,0.10)] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#FFB4AB]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#DAE2FD]">Tips for Best Experience</h2>
            </div>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Use latest browser version</li>
              <li>• Keep internet stable for online tools</li>
              <li>• Bookmark frequently used tools</li>
              <li>• Try dark mode for better UI experience</li>
            </ul>
          </div>

          {/* TechTools Promise */}
          <div className="glass-card-dark p-8 rounded-[24px] bg-gradient-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-[rgba(195,192,255,0.10)] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#C3C0FF]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#DAE2FD]">TechTools Promise</h2>
            </div>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We are continuously improving our tools to provide:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Faster performance</li>
              <li>• Better accuracy</li>
              <li>• Clean and modern UI</li>
              <li>• Free access for everyone</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
