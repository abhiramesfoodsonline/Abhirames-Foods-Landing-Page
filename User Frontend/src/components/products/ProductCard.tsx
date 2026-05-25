import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import pickleClassic from "@/assets/pickle-classic.jpg";
import {ArrowRight} from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  //     minimumFractionDigits: 0,
  //   }).format(price);
  // };

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Link to={`/products/${product.product_id}`} className="group block relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-hover transition-all duration-300"
        >
              <img
                  // TODO: Place actual image from firebase
                  src={product.product_image_url === "https://www.google.com" ? pickleClassic : product.product_image_url}
                  alt={product.product_name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Availability Badge */}
              {!product.is_available && (
                  <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm font-semibold">
                      Out of Stock
                    </Badge>
                  </div>
              )}
              {/*{product.is_available && (*/}
              {/*    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">*/}
              {/*      In Stock*/}
              {/*    </Badge>*/}
              {/*)}*/}
            {/*</div>*/}

            {/* Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-display text-xl font-semibold text-cream mb-1">
              {product.product_name}
            </h3>
            <p className="text-cream/70 text-sm line-clamp-2">
              {product.title}
            </p>
            <span className="inline-flex items-center gap-1 text-golden text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
          </div>
        </Link>
      </motion.div>
  );
}
