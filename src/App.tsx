import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Generator from "./pages/Generator";
import Customization from "./pages/Customization";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { SpeedTest } from "./components/speed-test/SpeedTest";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TypingSpeed from "./components/typing-speed/TypingSpeed";
import MainColorPicker from "./components/color-picker/MainColorPicker";
import Tools from "./pages/History";
import Help from "./pages/Help";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/qr-generator" element={<Generator />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/customization" element={<Customization />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/speed-test" element={<SpeedTest />} />
            <Route path="/typing-speed" element={<TypingSpeed />} />
            <Route path="/color-picker" element={<MainColorPicker />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};