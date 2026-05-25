import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, ShoppingBag, Shield, Truck, Leaf } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/ProductCard";
import pickleClassic from "@/assets/pickle-classic.jpg";
import pickleSpicy from "@/assets/pickle-spicy.jpg";
import pickleSweet from "@/assets/pickle-sweet.jpg";
import pickleMixed from "@/assets/pickle-mixed.jpg";
import {categoriesAPI, productsAPI} from "@/lib/api.ts";
import {Category, Product} from "@/types";
import {toast} from "sonner";

const productImages: Record<string, string> = {
  "1": pickleClassic,
  "2": pickleSpicy,
  "3": pickleSweet,
  "4": pickleMixed,
};

const highlights = [
  { icon: Leaf, text: "Handcrafted using Grandmother Mae's original recipe" },
  { icon: Shield, text: "No artificial preservatives or flavors" },
  { icon: Truck, text: "Fresh delivery in 3-5 business days" },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setImageLoaded(false);

    const loadProduct = async () => {
      try {
        const res = await productsAPI.getById(id);
        const p: Product = res.data;
        setProduct(p);

        // fetch category and related products in parallel
        const [catRes, relatedRes] = await Promise.all([
          categoriesAPI.getById(p.category?.category_id || p.category_id || 0),
          productsAPI.getByCategory(p.category?.category_id || p.category_id || 0),
        ]);
        setCategory(catRes.data);
        setRelatedProducts(
            relatedRes.data
                .filter((r: Product) => r.product_id !== p.product_id)
                .slice(0, 4)
        );
      } catch (e) {
        toast.error("Failed to load product.");
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const formatPrice = (price: number) =>
      new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(price);

  if (isLoading) {
    return (
        <Layout>
          <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        </Layout>
    );
  }

  if (!product) {
    return (
        <Layout>
          <div className="container mx-auto px-4 py-20 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
              <Button asChild><Link to="/products">Browse Products</Link></Button>
            </motion.div>
          </div>
        </Layout>
    );
  }
  return (
      <Layout>
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
            >
              <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Products
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-medium group-hover:shadow-hover transition-shadow duration-500">
                  <motion.img
                      src={product.product_image_url === "https://www.google.com" ? pickleClassic : product.product_image_url}
                      alt={product.product_name}
                      className="w-full h-full object-cover"
                      onLoad={() => setImageLoaded(true)}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: imageLoaded ? 1 : 0 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                  />
                </div>
                {!product.is_available && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-charcoal/60 rounded-2xl flex items-center justify-center backdrop-blur-[2px]"
                    >
                      <Badge variant="destructive" className="text-lg px-6 py-2">
                        Out of Stock
                      </Badge>
                    </motion.div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="space-y-6"
              >
                {category && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                      <Link
                          to={`/products?category=${category.category_id}`}
                          className="inline-block text-sm font-medium text-primary hover:underline uppercase tracking-wider"
                      >
                        {category.category_name}
                      </Link>
                    </motion.div>
                )}

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {product.product_name}
                </h1>

                {!product.is_available && (
                    <div className="flex items-center gap-4">
                      <Badge
                          variant={product.is_available ? "default" : "destructive"}
                          className="text-sm"
                      >
                        {/*
                    {product.is_available ? (
                        <><Check className="w-3 h-3 mr-1" /> In Stock</>
                    ) : (
                        <><X className="w-3 h-3 mr-1" /> Out of Stock</>
                    )}
                    */}
                        <><X className="w-3 h-3 mr-1" /> Out of Stock</>
                      </Badge>
                    </div>
                )}


                <div className="border-t border-border pt-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.product_description}
                  </p>
                </div>

                {/* Highlights */}


                {/* CTA */}
                <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="hero" size="xl" className="w-full gap-2" disabled={!product.is_available}>
                      <ShoppingBag className="w-5 h-5" />
                      {product.is_available ? "Shop Now" : "Out of Stock"}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <section className="py-16 bg-card border-t border-border">
              <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8"
                >
                  You May Also Like
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct, index) => (
                      <ProductCard key={relatedProduct.product_id} product={relatedProduct} index={index} />
                  ))}
                </div>
              </div>
            </section>
        )}
      </Layout>
  );
};

export default ProductDetail;
