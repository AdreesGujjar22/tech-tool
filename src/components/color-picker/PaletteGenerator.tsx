import { motion } from "motion/react";
import { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Shuffle, Save, Download, Code } from "lucide-react";
import { Color, generateHarmoniousColors, colorToTailwind } from "../../utils/color-picker/colorUtils";
import { ColorCard } from "./ColorCard";
import { toast } from "sonner";
import html2canvas from "html2canvas";

interface PaletteGeneratorProps {
  onSave: (colors: Color[]) => void;
}

export function PaletteGenerator({ onSave }: PaletteGeneratorProps) {
  const [colors, setColors] = useState<Color[]>([]);
  const [showTailwind, setShowTailwind] = useState(false);

  const generatePalette = useCallback(() => {
    const newColors = generateHarmoniousColors(5);
    setColors((prev) => {
      return newColors.map((newColor, index) => {
        const lockedColor = prev[index];
        if (lockedColor?.locked) {
          return lockedColor;
        }
        return newColor;
      });
    });
  }, []);

  useEffect(() => {
    generatePalette();
  }, [generatePalette]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        generatePalette();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [generatePalette]);

  const toggleLock = (id: string) => {
    setColors((prev) =>
      prev.map((color) =>
        color.id === id ? { ...color, locked: !color.locked } : color
      )
    );
  };

  const moveColor = useCallback((dragIndex: number, hoverIndex: number) => {
    setColors((prev) => {
      const newColors = [...prev];
      const [removed] = newColors.splice(dragIndex, 1);
      newColors.splice(hoverIndex, 0, removed);
      return newColors;
    });
  }, []);

  const handleSave = () => {
    onSave(colors);
    toast.success("Palette saved!");
  };

  const downloadAsPNG = async () => {
    const paletteElement = document.getElementById("palette-container");
    if (!paletteElement) return;

    const canvas = await html2canvas(paletteElement, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = `palette-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast.success("Palette downloaded!");
  };

  const copyTailwindConfig = () => {
    const config = colors
      .map((color, index) => colorToTailwind(color, `color${index + 1}`))
      .join(",\n");

    const fullConfig = `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${config}\n      }\n    }\n  }\n}`;

    navigator.clipboard.writeText(fullConfig);
    setShowTailwind(true);
    toast.success("Tailwind config copied!");
    setTimeout(() => setShowTailwind(false), 3000);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generatePalette}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Shuffle size={20} />
            Generate Palette
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Save size={20} />
            Save Palette
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadAsPNG}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Download size={20} />
            Download PNG
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyTailwindConfig}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Code size={20} />
            Tailwind CSS
          </motion.button>
        </motion.div>

        <div
          id="palette-container"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {colors.map((color, index) => (
            <ColorCard
              key={color.id}
              color={color}
              index={index}
              onToggleLock={toggleLock}
              onMove={moveColor}
            />
          ))}
        </div>

        {showTailwind && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-4 bg-slate-800 dark:bg-slate-900 rounded-lg border border-slate-700"
          >
            <pre className="text-xs md:text-sm text-green-400 overflow-x-auto">
              <code>
                {colors
                  .map((color, index) => colorToTailwind(color, `color${index + 1}`))
                  .join(",\n")}
              </code>
            </pre>
          </motion.div>
        )}

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Press <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">Space</kbd> to
          generate a new palette
        </p>
      </div>
    </DndProvider>
  );
}
