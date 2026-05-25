import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {companyAPI} from "@/lib/api.ts";
import {toast} from "sonner";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], [0, 1]);

  const [companyName, setCompanyName] = useState("Abhirames Pickles");

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setHasScrolled(v > 20));
    return unsubscribe;
  }, [scrollY]);

  // Close mobile menu on route change


  useEffect(() => {
    const loadCompanyName = async () => {
      try {
        const res = await companyAPI.getCompanyProfile();
        setCompanyName(res.data.company_name || "Abhirames Pickles");

      } catch (e) {
        toast.error("Failed to load company name. Please refresh the page.");
      }
    }
    loadCompanyName();
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
      <motion.nav
          className={`sticky top-0 z-50 transition-all duration-500 ${
              hasScrolled
                  ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
                  : "bg-background/95 backdrop-blur-md border-b border-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
              >
                {/* TODO: Replace G with actual image */}
                <span className="text-primary-foreground font-display font-bold text-xl">G</span>
              </motion.div>
              <motion.span
                  className="font-display text-xl font-semibold text-foreground hidden sm:block"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
              >
                {companyName}
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                  <Link
                      key={link.path}
                      to={link.path}
                      className="relative px-4 py-2 rounded-full"
                  >
                    {isActive(link.path) && (
                        <motion.div
                            layoutId="navBubble"
                            className="absolute inset-0 bg-primary/10 rounded-full"
                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        />
                    )}
                    <motion.span
                        className={`relative z-10 font-medium transition-colors duration-300 ${
                            isActive(link.path)
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                        whileHover={{ y: -1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="golden" size="lg" asChild className="gap-2">
                  <Link to="/products">
                    <ShoppingBag className="w-4 h-4" />
                    Shop Now
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="md:hidden overflow-hidden"
                >
                  <div className="py-4 space-y-1">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                          <Link
                              to={link.path}
                              onClick={() => setIsOpen(false)}
                              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                  isActive(link.path)
                                      ? "bg-primary text-primary-foreground shadow-md"
                                      : "text-foreground hover:bg-muted hover:translate-x-1"
                              }`}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: navLinks.length * 0.05 }}
                        className="pt-2 px-4"
                    >
                      <Button variant="golden" size="lg" className="w-full gap-2" asChild>
                        <Link to="/products" onClick={() => setIsOpen(false)}>
                          <ShoppingBag className="w-4 h-4" />
                          Shop Now
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
  );
}
