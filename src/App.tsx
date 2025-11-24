import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Adotar from "./pages/Adotar";
import ComoFunciona from "./pages/ComoFunciona";
import Cadastrar from "./pages/Cadastrar";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Auth from "./pages/Auth";
import PetDetails from "./pages/PetDetails";
import Chat from "./pages/Chat";
import ChatInbox from "./pages/ChatInbox";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import MeusPets from "./pages/MeusPets";
import EditarPet from "./pages/EditarPet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/adotar" element={
              <ProtectedRoute>
                <Adotar />
              </ProtectedRoute>
            } />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/cadastrar" element={
              <ProtectedRoute>
                <Cadastrar />
              </ProtectedRoute>
            } />
            <Route path="/meus-pets" element={
              <ProtectedRoute>
                <MeusPets />
              </ProtectedRoute>
            } />
            <Route path="/pet/editar/:id" element={
              <ProtectedRoute>
                <EditarPet />
              </ProtectedRoute>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatInbox />
              </ProtectedRoute>
            } />
            <Route path="/chat/:id" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;