import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PackageDetail from "./pages/PackageDetail";
import AllPackages from "./pages/AllPackages";
import WaterAdventurePage from "./pages/WaterAdventurePage";
import WhatsAppButton from "./components/WhatsAppButton";
import DownloadTicket from "./pages/DownloadTicket";

// Admin Imports
import { AuthProvider } from "./admin/context/AuthContext";
import { ProtectedRoute } from "./admin/components/ProtectedRoute";
import { AdminLayout } from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminPackages from "./admin/pages/Packages";
import PackageForm from "./admin/pages/PackageForm";
import ActivityManagement from "./admin/pages/ActivityManagement";
import AdminLogin from "./admin/pages/Login";
import ForgotPassword from "./admin/pages/ForgotPassword";
import ResetPassword from "./admin/pages/ResetPassword";
import Orders from "./admin/pages/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Website Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/all-packages" element={<AllPackages />} />
            <Route path="/water-adventure" element={<WaterAdventurePage />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="/ticket/:orderId" element={<DownloadTicket />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout title="Overview">
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/packages"
              element={
                <ProtectedRoute>
                  <AdminLayout title="Travel Packages">
                    <AdminPackages />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-package"
              element={
                <ProtectedRoute>
                  <AdminLayout title="Add Package">
                    <PackageForm />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-package/:id"
              element={
                <ProtectedRoute>
                  <AdminLayout title="Edit Package">
                    <PackageForm />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/activities"
              element={
                <ProtectedRoute>
                  <AdminLayout title="Water Adventure Activities">
                    <ActivityManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminLayout title="Bookings & Invoices">
                    <Orders />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* CATCH-ALL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

