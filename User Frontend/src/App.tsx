import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy.tsx";
import {TermsAndServices} from "@/pages/TermsAndServices.tsx";
import ShippingPolicy from "@/pages/ShippingPolicy.tsx";
import {useEffect} from "react";
import {pageViewAPI} from "@/lib/api.ts";
import {usePageLoader} from "@/hooks/use-page-loader.tsx";
import {AnimatePresence} from "framer-motion";
import {PageLoader} from "@/components/layout/PageLoader.tsx";

const queryClient = new QueryClient();

const AppRoutes = () => {

    // This function is for tracking page views for analytics purposes

    const location = useLocation();
    const isLoading = usePageLoader();


    useEffect(() => {
        const sessionKey = `tracked_${location.pathname}`;
        if (!sessionStorage.getItem(sessionKey)) {
            pageViewAPI.track(location.pathname);
            sessionStorage.setItem(sessionKey, 'true');
        }
    }, [location.pathname]);


    return (
        <>
            {/*<AnimatePresence mode="wait">*/}
            {/*    {isLoading && <PageLoader key="loader" />}*/}
            {/*</AnimatePresence>*/}

            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/faqs" element={<FAQs/>}/>
                <Route path="/refund-policy" element={<RefundPolicy/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/terms-services" element={<TermsAndServices/>}/>
                <Route path="/shipping-policy" element={<ShippingPolicy/>}/>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );

};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;