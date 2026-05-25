import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import { Package, Search } from "lucide-react";
import {categoriesAPI, productsAPI} from "@/lib/api.ts";
import {toast} from "sonner";
import {Category, Product} from "@/types";



const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const selectedCategoryParam = searchParams.get("category");
  const selectedCategory: number | null = selectedCategoryParam ? Number(selectedCategoryParam) : null;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (e) {
        toast.error("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);




  const filteredProducts = useMemo(() => {
    if (selectedCategory === null) return products;
    return products.filter((p) => p.category?.category_id === selectedCategory);
  }, [selectedCategory, products]);

  const currentCategory = categories.find((c) => c.category_id === selectedCategory);

  const handleCategoryChange = (categoryId: number | null) => {
    if (categoryId !== null) {
      setSearchParams({ category: String(categoryId) });
    } else {
      setSearchParams({});
    }
  };


  return (
      <Layout>
        {/* Header */}
        <section className="bg-gradient-cream py-10 md:py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.05),transparent_50%)]" />
          <div className="container relative mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
            >
              <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
              >
                {currentCategory ? "Category" : "All Collections"}
              </motion.span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {currentCategory ? currentCategory.category_name : "Our Products"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {currentCategory
                    ? (currentCategory.description || currentCategory.title)
                    : "Explore our complete collection of handcrafted pickles. Each jar is made with love using Abhirames Pickles original recipes."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-10 overflow-x-auto pb-2"
            >
              <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategoryChange}
              />
            </motion.div>

            {/* Result count */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 mb-6 text-sm text-muted-foreground"
            >
              <Search className="w-4 h-4" />
              <span>
              Showing <strong className="text-foreground">{filteredProducts.length}</strong> products
            </span>
            </motion.div>

            {/* Products */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                  <motion.div
                      key="skeleton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                  >
                    <ProductGridSkeleton count={8} />
                  </motion.div>
              ) : filteredProducts.length > 0 ? (
                  <motion.div
                      key={selectedCategory || "all"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.product_id} product={product} index={index} />
                    ))}
                  </motion.div>
              ) : (
                  <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                  >
                    <motion.div
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Package className="w-10 h-10 text-muted-foreground" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                      No Products Found
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We couldn't find any products in this category. Try selecting a
                      different category or check back later.
                    </p>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </Layout>
  );
};

export default Products;
