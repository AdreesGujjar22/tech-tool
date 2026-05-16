import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { Trash2, Search, Heart } from "lucide-react";
import { Palette } from "../../utils/color-picker/colorUtils";
import { toast } from "sonner";

interface SavedPalettesProps {
  palettes: Palette[];
  onDelete: (id: string) => void;
  onLoad: (palette: Palette) => void;
}

export function SavedPalettes({ palettes, onDelete, onLoad }: SavedPalettesProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPalettes = useMemo(() => {
    if (!searchQuery.trim()) return palettes;

    const query = searchQuery.toLowerCase();
    return palettes.filter((palette) => {
      const nameMatch = palette.name.toLowerCase().includes(query);
      const colorMatch = palette.colors.some((color) =>
        color.hex.toLowerCase().includes(query)
      );
      return nameMatch || colorMatch;
    });
  }, [palettes, searchQuery]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
    toast.success("Palette deleted!");
  };

  const handleLoad = (palette: Palette) => {
    onLoad(palette);
    toast.success("Palette loaded!");
  };

  if (palettes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 space-y-4"
      >
        <Heart size={48} className="mx-auto text-slate-300 dark:text-slate-700" />
        <p className="text-slate-500 dark:text-slate-400">
          No saved palettes yet. Generate and save your first palette!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by color or theme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
      </div>

      <AnimatePresence mode="popLayout">
        {filteredPalettes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-slate-500 dark:text-slate-400"
          >
            No palettes match your search.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPalettes.map((palette) => (
              <motion.div
                key={palette.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-slate-200 dark:border-slate-700"
                onClick={() => handleLoad(palette)}
              >
                <div className="flex h-24">
                  {palette.colors.map((color) => (
                    <div
                      key={color.id}
                      className="flex-1 transition-all group-hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {palette.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(palette.timestamp).toLocaleDateString()}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleDelete(palette.id, e)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>

                <div className="px-4 pb-3 flex flex-wrap gap-2">
                  {palette.colors.map((color) => (
                    <span
                      key={color.id}
                      className="text-xs font-mono px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
                    >
                      {color.hex}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
