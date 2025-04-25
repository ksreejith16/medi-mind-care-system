
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import HealthPrediction from "./pages/HealthPrediction";
import NutritionPage from "./pages/Nutrition";
import ChatbotAssistant from "./pages/ChatbotAssistant";
import EmergencyPage from "./pages/Emergency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prediction" element={<HealthPrediction />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/chatbot" element={<ChatbotAssistant />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
