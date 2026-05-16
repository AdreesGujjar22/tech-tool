import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X, Copy, Check, Plus, Minus, Download, Image as ImageIcon } from "lucide-react";
import { getAllColorFormats, rgbToHex } from "../../utils/color-picker/colorConversions";
import { toast } from "sonner";

interface ExtractedColor {
  hex: string;
  count: number;
}

export function ImageColorExtractor() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        extractColors(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const colorMap = new Map<string, number>();

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (a < 128) continue;

      const roundedR = Math.round(r / 10) * 10;
      const roundedG = Math.round(g / 10) * 10;
      const roundedB = Math.round(b / 10) * 10;

      const hex = rgbToHex(roundedR, roundedG, roundedB);
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([hex, count]) => ({ hex, count }));

    setColors(sortedColors);
    if (sortedColors.length > 0) {
      setSelectedColor(sortedColors[0].hex);
    }
  };

  const removeImage = () => {
    setImage(null);
    setColors([]);
    setSelectedColor(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyToClipboard = async (text: string, format: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    toast.success(`${format} copied!`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const formats = selectedColor ? getAllColorFormats(selectedColor) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl"
    >
      <canvas ref={canvasRef} className="hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Image</h3>

          {!image ? (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <ImageIcon size={48} className="mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 dark:text-slate-300 font-medium mb-2">
                Upload an image
              </p>
              <p className="text-sm text-slate-500">
                Click to browse or drag and drop
              </p>
            </motion.div>
          ) : (
            <div className="relative rounded-xl overflow-hidden">
              <img src={image} alt="Uploaded" className="w-full h-auto rounded-xl" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg"
              >
                <X size={20} />
              </motion.button>
            </div>
          )}

          {colors.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Color Palette
                </h4>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
                    <Minus size={16} className="text-slate-600 dark:text-slate-400" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
                    <Plus size={16} className="text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <motion.button
                    key={color.hex}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-14 h-14 rounded-lg shadow-md transition-all ${
                      selectedColor === color.hex ? "ring-4 ring-purple-500 ring-offset-2 dark:ring-offset-slate-800" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Download size={16} />
                  Download
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Copy size={16} />
                  Copy all
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Colors</h3>

          {selectedColor && formats ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div
                  className="w-16 h-16 rounded-lg shadow-md"
                  style={{ backgroundColor: selectedColor }}
                />
                <div
                  className="w-16 h-16 rounded-lg shadow-md"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg group">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">HEX</div>
                    <div className="font-mono font-semibold text-slate-800 dark:text-white">
                      {formats.hex.toUpperCase()}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(formats.hex.toUpperCase(), "HEX")}
                    className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-all"
                  >
                    {copiedFormat === "HEX" ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} className="text-slate-600 dark:text-slate-400" />
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg group">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">RGB</div>
                    <div className="font-mono text-sm text-slate-800 dark:text-white">
                      rgb({formats.rgb.r}, {formats.rgb.g}, {formats.rgb.b})
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(`rgb(${formats.rgb.r}, ${formats.rgb.g}, ${formats.rgb.b})`, "RGB")}
                    className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-all"
                  >
                    {copiedFormat === "RGB" ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} className="text-slate-600 dark:text-slate-400" />
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg group">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">HSL</div>
                    <div className="font-mono text-sm text-slate-800 dark:text-white">
                      {formats.hsl.h}, {formats.hsl.s}%, {formats.hsl.l}%
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(`hsl(${formats.hsl.h}, ${formats.hsl.s}%, ${formats.hsl.l}%)`, "HSL")}
                    className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-all"
                  >
                    {copiedFormat === "HSL" ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} className="text-slate-600 dark:text-slate-400" />
                    )}
                  </motion.button>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
                View color details →
              </button>

              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Upload size={18} />
                  Use your own image
                </button>
                <button className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <ImageIcon size={18} />
                  Pick from Screen
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
              <p>Upload an image to extract colors</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
