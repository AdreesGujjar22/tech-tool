import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageIcon, Pipette } from "lucide-react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import { Header } from "./Header";
import { ImageColorExtractor } from "./ImageColorExtractor";
import { AdvancedColorPicker } from "./AdvancedColorPicker";

type Tab = "image" | "picker";

export default function MainColorPicker() {
  const [activeTab, setActiveTab] = useState<Tab>("image");

  const tabs = [
    { id: "image" as Tab, label: "Image", icon: ImageIcon },
    { id: "picker" as Tab, label: "Color Picker", icon: Pipette },
  ];

  return (
    <div className="min-h-screen from-slate-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors mt-[100px]">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex gap-2 p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "image" && (
            <motion.div
              key="image"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ImageColorExtractor />
            </motion.div>
          )}

          {activeTab === "picker" && (
            <motion.div
              key="picker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <AdvancedColorPicker />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Toaster position="bottom-right" richColors theme="dark" />
    </div>
  );
}