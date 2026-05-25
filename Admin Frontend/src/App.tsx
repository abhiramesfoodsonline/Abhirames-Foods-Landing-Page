import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import CompanySettings from "./pages/CompanySettings";
import CMSPages from "./pages/CMSPages";
import NotFound from "./pages/NotFound";
import Profile from "@/pages/Profile.tsx";
import RoleCreate from "@/pages/RoleCreate.tsx";
import ViewAdmins from "@/pages/ViewAdmins.tsx";
import SuperAdminRoute from "@/pages/SuperAdminRoute.tsx";
import {pageViewAPI} from "@/lib/api.ts";
import {useEffect} from "react";
import Customers from "@/pages/Customers.tsx";

const queryClient = new QueryClient();

const AppRoutes = () => {


    // TODO: Add this function to user frontend to enable 'PageView' feature.

    // const location = useLocation();
    // useEffect(() => {
    //     pageViewAPI.track(location.pathname);
    // }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<Login/>}/>

            {/* Protected Admin Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <AdminLayout/>
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/profile" element={<Profile/>}/>

                <Route path="/customers" element={
                    <SuperAdminRoute>
                        {/* TODO: Change Dashboard to actual Customers page. */}
                        <Customers/>
                    </SuperAdminRoute>
                }/>
                <Route path="/settings" element={
                    <SuperAdminRoute>
                        <CompanySettings/>
                    </SuperAdminRoute>
                }/>
                {
                /* <Route path="/cms" element={
                    <SuperAdminRoute>
                        <CMSPages/>
                    </SuperAdminRoute>
                }/> 
                */
                }
                <Route path="/role-create" element={
                    <SuperAdminRoute>
                        <RoleCreate/>
                    </SuperAdminRoute>
                }/>
                <Route path="/view-admins" element={
                    <SuperAdminRoute>
                        <ViewAdmins/>
                    </SuperAdminRoute>
                }/>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner position="top-right" />
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;