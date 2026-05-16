import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Customization() {
  return (
    <div className="min-h-screen bg-[#0B1326] text-[#DAE2FD]">

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-12 space-y-2">
            <h1 className="text-4xl font-semibold text-[#DAE2FD]">Advanced Customization</h1>
            <p className="text-base text-[#C7C4D8] max-w-[672px]">
              Refine your brand's digital gateway. Embed logos, adjust pattern density, and sculpt your QR codes with obsidian-grade precision.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Left Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Content Upload */}
              <div className="glass-card-dark p-6 rounded-[12px] space-y-6">
                <div className="flex items-center gap-2">
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17H9V12.825L10.6 14.425L12 13L8 9L4 13L5.425 14.4L7 12.825V17V17M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2V20M9 7V2H2V2V2V18V18V18H14V18V18V7H9V7M2 2V2V7V7V2V7V7V18V18V18V18V18V18V2V2V2V2" fill="#C3C0FF"/>
                  </svg>
                  <h3 className="text-2xl font-semibold">Content & File Upload</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px] block">
                      Target URL or Data
                    </label>
                    <input
                      type="text"
                      placeholder="https://yourbrand.com/access"
                      className="w-full px-4 py-4 rounded-[8px] border border-[rgba(70,69,85,0.30)] bg-[#2D3449] text-[rgba(145,143,161,0.5)] placeholder-[rgba(145,143,161,0.5)] focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#C7C4D8] tracking-[0.48px] block">
                      Upload Data File (.vcf, .txt, .pdf)
                    </label>
                    <div className="flex items-center border border-[rgba(195,192,255,0.10)] bg-[#2D3449] rounded-[8px] px-4 py-3">
                      <span className="text-[#C7C4D8] text-sm flex-1">Choose File...</span>
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12V12" fill="#C3C0FF"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern & Style */}
              <div className="glass-card-dark p-6 rounded-[12px] space-y-6">
                <div className="flex items-center gap-2">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2V16M2 14H18V14V14V2V2V2H2V2V2V14V14V14V14M10 12C11.6333 12 13.0417 11.6042 14.225 10.8125C15.4083 10.0208 16 9.08333 16 8C16 6.91667 15.4083 5.97917 14.225 5.1875C13.0417 4.39583 11.6333 4 10 4C8.36667 4 6.95833 4.39583 5.775 5.1875C4.59167 5.97917 4 6.91667 4 8C4 9.08333 4.59167 10.0208 5.775 10.8125C6.95833 11.6042 8.36667 12 10 12V12M10 10C8.91667 10 7.97917 9.8 7.1875 9.4C6.39583 9 6 8.53333 6 8C6 7.46667 6.39583 7 7.1875 6.6C7.97917 6.2 8.91667 6 10 6C11.0833 6 12.0208 6.2 12.8125 6.6C13.6042 7 14 7.46667 14 8C14 8.53333 13.6042 9 12.8125 9.4C12.0208 9.8 11.0833 10 10 10V10" fill="#C3C0FF"/>
                  </svg>
                  <h3 className="text-2xl font-semibold">Style Architecture</h3>
                </div>

                <div className="space-y-6">
                  {/* Encoding Pattern */}
                  <div className="space-y-3">
                    <h4 className="text-base font-medium text-[#C7C4D8] tracking-[1.6px] uppercase">Encoding Pattern</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { name: "Classic Squares", icon: "squares" },
                        { name: "Modern Dots", icon: "circle" },
                        { name: "Liquid Smooth", icon: "smooth" },
                        { name: "High Density", icon: "density" },
                      ].map((pattern, i) => (
                        <button
                          key={i}
                          className={`p-4 rounded-[12px] border flex flex-col items-center gap-2 text-center transition-all ${
                            i === 0
                              ? "border-[#C3C0FF] bg-[rgba(195,192,255,0.20)] text-[#DAE2FD]"
                              : "border-[rgba(195,192,255,0.10)] bg-[rgba(23,31,51,0.60)] text-[#DAE2FD]"
                          }`}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 8V0H8V8H0V8M0 18V10H8V18H0V18M10 8V0H18V8H10V8M10 18V10H18V18H10V18M2 6H6V2H2V6V6M12 6H16V2H12V6V6M12 16H16V12H12V16V16M2 16H6V12H2V16V16M12 6V6V6V6V6V6M12 12V12V12V12V12V12M6 12V12V12V12V12V12M6 6V6V6V6V6V6" fill="currentColor"/>
                          </svg>
                          <span className="text-xs font-medium">{pattern.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Corner Radius */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-base font-medium text-[#C7C4D8] tracking-[1.6px] uppercase">Corner Radius</h4>
                      <span className="text-base font-medium text-[#C3C0FF]">12px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-[#2D3449] relative">
                        <div className="absolute w-3 h-3 rounded-full bg-[#C3C0FF] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-[#918FA1]">
                      <span>Sharp</span>
                      <span>Organic</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="glass-card-dark p-6 rounded-[12px] border-2 border-dashed border-[rgba(195,192,255,0.20)] bg-[rgba(195,192,255,0.05)] space-y-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-20 mx-auto flex items-center justify-center rounded-full bg-[rgba(195,192,255,0.10)]">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-semibold">Embed Your Signature Logo</h3>
                  <p className="text-base text-[#C7C4D8] max-w-[384px] mx-auto">
                    Drag and drop your SVG, PNG, or JPG here. We'll automatically center and optimize it for scannability.
                  </p>
                  <button className="px-10 py-4 rounded-[9999px] border border-[rgba(195,192,255,0.10)] bg-[#31394D] text-[#DAE2FD] font-medium hover:bg-[#3d4561] transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>

            {/* Right Preview */}
            <div className="glass-card-dark p-6 rounded-[12px] space-y-6 h-fit sticky top-32">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-[#C3C0FF] tracking-[1.6px] uppercase">Live Preview</h3>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFB4AB]" />
                  <div className="w-2 h-2 rounded-full bg-[#4CD7F6]" />
                  <div className="w-2 h-2 rounded-full bg-[#C3C0FF]" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-[16px] aspect-square flex items-center justify-center relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.40)]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/6c5b699c8a61fbe3dfcd2156a413b7e2e9af099b?width=529"
                  alt="QR Code Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base text-[#C7C4D8]">Scannability Score</span>
                  <span className="text-base text-[#4CD7F6]">Optimal (98%)</span>
                </div>
                <div className="w-full h-1 rounded-full bg-[#2D3449] overflow-hidden">
                  <div className="w-[98%] h-full bg-[#4CD7F6] shadow-[0_0_8px_rgba(3,181,211,0.50)]" />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-4 rounded-[12px] bg-[#2D3449] text-[#DAE2FD] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#3d4561] transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L2.25 5.25L3.3 4.1625L5.25 6.1125V0H6.75V6.1125L8.7 4.1625L9.75 5.25L6 9V9M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V8.25H1.5V10.5V10.5V10.5H10.5V10.5V10.5V8.25H12V10.5C12 10.9125 11.8531 11.2656 11.5594 11.5594C11.2656 11.8531 10.9125 12 10.5 12H1.5V12" fill="currentColor"/>
                  </svg>
                  PNG
                </button>
                <button className="flex-1 py-4 rounded-[12px] bg-[#4F46E5] text-[#DAD7FF] font-semibold text-sm hover:bg-indigo-500 transition-colors">
                  🎖️ SVG
                </button>
              </div>

              <div className="glass-card p-4 rounded-[12px] flex gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[rgba(76,215,246,0.10)] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8L16.75 5.25L14 4L16.75 2.75L18 0L19.25 2.75L22 4L19.25 5.25L18 8V8M18 22L16.75 19.25L14 18L16.75 16.75L18 14L19.25 16.75L22 18L19.25 19.25L18 22V22M8 19L5.5 13.5L0 11L5.5 8.5L8 3L10.5 8.5L16 11L10.5 13.5L8 19V19M8 14.15L9 12L11.15 11L9 10L8 7.85L7 10L4.85 11L7 12L8 14.15V14.15" fill="#4CD7F6"/>
                  </svg>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-[#DAE2FD] text-sm">Obsidian AI Suggestion</div>
                  <div className="text-xs font-semibold text-[#C7C4D8]">
                    Try 'Liquid Smooth' corners for better scannability on curved surfaces.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
