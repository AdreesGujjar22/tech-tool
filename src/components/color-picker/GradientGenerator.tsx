import { motion } from "motion/react";
import { useState } from "react";
import { Copy, Shuffle, Check } from "lucide-react";
import { generateRandomColor } from "../../utils/color-picker/colorUtils";
import { toast } from "sonner";

type GradientDirection = "to right" | "to left" | "to top" | "to bottom" | "to top right" | "to bottom right";

export function GradientGenerator() {
  const [color1, setColor1] = useState(generateRandomColor());
  const [color2, setColor2] = useState(generateRandomColor());
  const [direction, setDirection] = useState<GradientDirection>("to right");
  const [copied, setCopied] = useState(false);

  const gradientStyle = `linear-gradient(${direction}, ${color1.hex}, ${color2.hex})`;

  const generateNewGradient = () => {
    setColor1(generateRandomColor());
    setColor2(generateRandomColor());
  };

  const copyGradient = async () => {
    const cssGradient = `background: linear-gradient(${direction}, ${color1.hex}, ${color2.hex});`;
    await navigator.clipboard.writeText(cssGradient);
    setCopied(true);
    toast.success("Gradient CSS copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const directions: GradientDirection[] = [
    "to right",
    "to left",
    "to top",
    "to bottom",
    "to top right",
    "to bottom right",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Gradient Generator
        </h2>
      </div>

      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]"
        style={{ background: gradientStyle }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyGradient}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:bg-white/30 transition-colors"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? "Copied!" : "Copy CSS"}
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Color 1
          </label>
          <div className="flex gap-3">
            <div
              className="w-16 h-16 rounded-lg shadow-md cursor-pointer"
              style={{ backgroundColor: color1.hex }}
            >
              <input
                type="color"
                value={color1.hex}
                onChange={(e) => {
                  const hex = e.target.value;
                  const rgb = { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
                  const hsl = { h: 0, s: 0, l: 0 };
                  setColor1({ hex, rgb, hsl, id: color1.id });
                }}
                className="w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={color1.hex}
              onChange={(e) => {
                const hex = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(hex)) {
                  const rgb = { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
                  const hsl = { h: 0, s: 0, l: 0 };
                  setColor1({ hex, rgb, hsl, id: color1.id });
                }
              }}
              className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Color 2
          </label>
          <div className="flex gap-3">
            <div
              className="w-16 h-16 rounded-lg shadow-md cursor-pointer"
              style={{ backgroundColor: color2.hex }}
            >
              <input
                type="color"
                value={color2.hex}
                onChange={(e) => {
                  const hex = e.target.value;
                  const rgb = { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
                  const hsl = { h: 0, s: 0, l: 0 };
                  setColor2({ hex, rgb, hsl, id: color2.id });
                }}
                className="w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={color2.hex}
              onChange={(e) => {
                const hex = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(hex)) {
                  const rgb = { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
                  const hsl = { h: 0, s: 0, l: 0 };
                  setColor2({ hex, rgb, hsl, id: color2.id });
                }
              }}
              className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Direction
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {directions.map((dir) => (
            <motion.button
              key={dir}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDirection(dir)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                direction === dir
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {dir.replace("to ", "")}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateNewGradient}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Shuffle size={20} />
        Generate New Gradient
      </motion.button>

      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700">
        <code className="text-xs md:text-sm text-slate-700 dark:text-slate-300 break-all">
          background: linear-gradient({direction}, {color1.hex}, {color2.hex});
        </code>
      </div>
    </motion.div>
  );
}
