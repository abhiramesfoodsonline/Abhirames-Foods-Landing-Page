import { Link } from "react-router-dom";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Truck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
  CheckSquare2
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import {categoriesAPI, trendingProductsAPI} from "@/lib/api.ts";
import {Category, Product} from "@/types";
import heroImage from "@/assets/hero-pickles.jpg";
import pickleClassic from "@/assets/pickle-classic.jpg";
import pickleSpicy from "@/assets/pickle-spicy.jpg";
import pickleSweet from "@/assets/pickle-sweet.jpg";
import pickleMixed from "@/assets/pickle-mixed.jpg";
import {useCallback, useEffect, useState} from "react";
import {customersAPI} from "@/lib/api.ts";
import {toast} from "sonner";


const heroImages = [heroImage, pickleClassic, pickleSpicy, pickleSweet, pickleMixed];


const features = [
  {
    icon: Home,
    title: "100% Homemade",
    description: "",
  },
  {
    icon: Leaf,
    title: "No Artificial Additives",
    description: "",
  },
  {
    icon: Truck,
    title: "Sourced from Local Farms",
    description: "",
  },
  {
    icon: CheckSquare2,
    title: "Quality Tested",
    description: "",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);

  // ── Category carousel ──────────────────────────────────────────────────────
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);


  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };
  const [visibleCount, setVisibleCount] = useState<number>(getVisibleCount);

  useEffect(() => {
    const onResize = () => {
      const next = getVisibleCount();
      setVisibleCount(next);
      setCategoryIndex((prev) => Math.min(prev, Math.max(0, categories.length - next)));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);

  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          categoriesAPI.getAll(),
          trendingProductsAPI.getAll()
        ]);
        setCategories(catRes.data);
        setTrendingProducts(prodRes.data.map((tp) => tp.product));
        console.log(prodRes);
      } catch (e) {
        toast.error("Failed to load data.");
      }
    };
    loadData();
  }, []);

  const maxCatIndex = Math.max(0, categories.length - visibleCount);
  const canPrevCat = categoryIndex > 0;
  const canNextCat = categoryIndex < maxCatIndex;
  const goNextCat = () => canNextCat && setCategoryIndex((p) => p + 1);
  const goPrevCat = () => canPrevCat && setCategoryIndex((p) => p - 1);
  // ──────────────────────────────────────────────────────────────────────────

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);

  const [mobileError, setMobileError] = useState("");

  const validateMobile = (value: string) => {
    if (value.length === 0) {
      setMobileError("");
    } else if (value.length < 10) {
      setMobileError("Mobile number must be 10 digits.");
    } else {
      setMobileError("");
    }
  };

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setShowUserDialog(true);
    }
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [nextImage]);


  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const handleSaveUser = async () => {
    try {
      if (name && mobileNumber) {
        await customersAPI.createCustomer({name: name, mobile_number: mobileNumber});
        toast.success("Your information has been saved!");
      } else {
        return;
      }
      const userData = {
        name,
        mobileNumber,
        isUserExist: true
      };

      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      toast.error("Failed to save your information. Please try again.");
    }

    setShowUserDialog(false);
  };

  return (
      <>
        {showUserDialog && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowUserDialog(false)} />
              <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative bg-card rounded-2xl p-8 w-full max-w-md shadow-2xl border border-border"
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-2 text-center">Welcome! 🥒</h2>
                <p className="text-sm text-muted-foreground text-center mb-6">Tell us a bit about yourself</p>

                <div className="space-y-4">
                  <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-input bg-background rounded-lg p-3 text-sm focus:ring-2 focus:ring-ring focus:outline-none transition-all"
                  />
                  <div className="space-y-1">
                    <input
                        type="tel"
                        placeholder="Phone number"
                        value={mobileNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setMobileNumber(value);
                          validateMobile(value);
                        }}
                        onBlur={() => validateMobile(mobileNumber)}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        inputMode="numeric"
                        className={`w-full border bg-background rounded-lg p-3 text-sm focus:ring-2 focus:ring-ring focus:outline-none transition-all ${
                            mobileError ? "border-destructive focus:ring-destructive" : "border-input"
                        }`}
                    />
                    {mobileError && (
                        <p className="text-destructive text-xs px-1">{mobileError}</p>
                    )}
                  </div>
                  <Button onClick={handleSaveUser} className="w-full" size="lg">
                    Continue
                  </Button>
                  <button
                      onClick={() => setShowUserDialog(false)}
                      className="w-full text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </motion.div>
            </motion.div>
        )}
        <div className={showUserDialog ? "opacity-40 pointer-events-none" : ""}>
          <Layout>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                      key={currentImage}
                      src={heroImages[currentImage]}
                      alt="Artisanal pickles display"
                      className="absolute inset-0 w-full h-full object-cover"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/20" />
              </motion.div>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-golden/30"
                        style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
                        animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                ))}
              </div>

              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="golden" size="xl" asChild>
                      <Link to="/products">
                        Shop Now
                        <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Slide Navigation */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                <motion.button
                    onClick={prevImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-charcoal/50 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream hover:bg-charcoal/70 transition-colors"
                    aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <div className="flex gap-2">
                  {heroImages.map((_, i) => (
                      <button
                          key={i}
                          onClick={() => { setDirection(i > currentImage ? 1 : -1); setCurrentImage(i); }}
                          className={`h-2 rounded-full transition-all duration-500 ${i === currentImage ? "bg-golden w-8" : "bg-cream/40 w-2 hover:bg-cream/70"}`}
                          aria-label={`Go to slide ${i + 1}`}
                      />
                  ))}
                </div>
                <motion.button
                    onClick={nextImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-charcoal/50 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream hover:bg-charcoal/70 transition-colors"
                    aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Hero Content */}
              <div className="container relative z-10 mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-2xl"
                    style={{ opacity: heroOpacity }}
                >
                  {/*<motion.span*/}
                  {/*    initial={{ opacity: 0, scale: 0.8 }}*/}
                  {/*    animate={{ opacity: 1, scale: 1 }}*/}
                  {/*    transition={{ delay: 0.3, duration: 0.5 }}*/}
                  {/*    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-golden/20 text-golden font-medium text-sm mb-6 backdrop-blur-sm border border-golden/20"*/}
                  {/*>*/}
                  {/*  <Sparkles className="w-3.5 h-3.5" />*/}
                  {/*  Sample Text 0*/}
                  {/*</motion.span>*/}
                  {/*<h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">*/}
                  {/*  <motion.span*/}
                  {/*      initial={{ opacity: 0, y: 20 }}*/}
                  {/*      animate={{ opacity: 1, y: 0 }}*/}
                  {/*      transition={{ delay: 0.5, duration: 0.6 }}*/}
                  {/*      className="block"*/}
                  {/*  >*/}
                  {/*    Sample Text 1*/}
                  {/*  </motion.span>*/}
                  {/*  <motion.span*/}
                  {/*      initial={{ opacity: 0, y: 20 }}*/}
                  {/*      animate={{ opacity: 1, y: 0 }}*/}
                  {/*      transition={{ delay: 0.7, duration: 0.6 }}*/}
                  {/*      className="text-golden block"*/}
                  {/*  >*/}
                  {/*    Sample Text 2*/}
                  {/*  </motion.span>*/}
                  {/*</h1>*/}
                  {/*<motion.p*/}
                  {/*    initial={{ opacity: 0 }}*/}
                  {/*    animate={{ opacity: 1 }}*/}
                  {/*    transition={{ delay: 0.9, duration: 0.6 }}*/}
                  {/*    className="text-lg md:text-xl text-cream/80 mb-8 leading-relaxed"*/}
                  {/*>*/}
                  {/*  Sample Text 3*/}
                  {/*</motion.p>*/}
                  {/* Buttons — above slide navigation */}


                  {/* Slide Navigation */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                    ...
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-card">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                      <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="text-center p-6"
                      >

                        <motion.div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                        >
                          <feature.icon className="w-7 h-7 text-primary" />
                        </motion.div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-10 bg-card">
              <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
                >
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                      Trending Pickles
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl">
                      Our most loved pickles, handpicked by our community of pickle
                      enthusiasts
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/products">
                        View All Products
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>

                  </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {trendingProducts.map((product, index) => (
    <ProductCard key={product.product_id} product={product} index={index} />
  ))}

  {/* Fill remaining slots with a CTA card */}
  {trendingProducts.length < 4 && (
    <div
      className="col-span-1 sm:col-span-2 lg:col-span-1"
      style={{ gridColumn: `span ${4 - trendingProducts.length}` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full min-h-[280px] rounded-2xl border-2 border-dashed border-primary/30 
                   bg-primary/5 flex flex-col items-center justify-center text-center p-8 gap-4"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            More Coming Soon
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our team is handpicking the next fan-favourite pickles. Stay tuned!
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="sm" asChild>
            <Link to="/products">
              Browse All
              <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )}
</div>
              </div>
            </section>

            {/* Categories Section */}
            {/* Categories Section */}
<section className="py-10 bg-background">
  <div className="container mx-auto px-4">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
    >
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Explore Our Collections
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl">
          From classic dill to fiery habanero, discover the perfect pickle for
          every palate
        </p>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="outline" size="lg" asChild>
          <Link to="/products">
            View All Collections
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.category_id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            to={`/products?category=${category.category_id}`}
            className="group block relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-hover transition-all duration-300"
          >
            <img
              src={category.image_url === "https://www.google.com" ? pickleClassic : category.image_url}
              alt={category.category_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display text-xl font-semibold text-cream mb-1">
                {category.category_name}
              </h3>
              <p className="text-cream/70 text-sm line-clamp-2">
                {category.description || category.title}
              </p>
              <span className="inline-flex items-center gap-1 text-golden text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                Explore
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Filler CTA card for empty slots */}
      {categories.length < 4 && (
  <div
    className="col-span-1 sm:col-span-2 lg:col-span-1"
    style={{ gridColumn: `span ${4 - categories.length}` }}
  >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-[280px] rounded-2xl border-2 border-dashed border-primary/30
                       bg-primary/5 flex flex-col items-center justify-center text-center p-8 gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                More Coming Soon
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                New collections are being crafted. Check back soon!
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" asChild>
                <Link to="/products">
                  Browse All
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>

  </div>
</section>


            {/* CTA Section */}
            <section className="py-10 bg-primary relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full -translate-x-1/2 translate-y-1/2" />

              <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                  <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 mx-auto mb-6 rounded-full bg-golden/20 flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-golden" />
                  </motion.div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    Ready to Taste the Difference?
                  </h2>
                  <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                    Join thousands of happy customers who've made Grandma's Pickle Co.
                    their go-to for premium, artisanal pickles.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="golden" size="xl" asChild>
                      <Link to="/products">
                        Start Shopping
                        <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </section>
          </Layout>
        </div>
      </>
  );
};

export default Index;
