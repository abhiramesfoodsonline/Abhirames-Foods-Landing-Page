import { motion } from "framer-motion";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: number | null;
    onSelectCategory: (categoryId: number | null) => void;
}

export function CategoryFilter({
                                   categories,
                                   selectedCategory,
                                   onSelectCategory,
                               }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-3">
            <motion.button
                onClick={() => onSelectCategory(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "relative px-5 py-2.5 rounded-full font-medium transition-all duration-300",
                    selectedCategory === null
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground bg-card border border-border hover:border-primary/30"
                )}
            >
                {selectedCategory === null && (
                    <motion.div
                        layoutId="categoryBg"
                        className="absolute inset-0 bg-primary rounded-full shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10">All Products</span>
            </motion.button>

            {categories.map((category) => (
                <motion.button
                    key={category.category_id}
                    onClick={() => onSelectCategory(category.category_id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "relative px-5 py-2.5 rounded-full font-medium transition-all duration-300",
                        selectedCategory === category.category_id
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground bg-card border border-border hover:border-primary/30"
                    )}
                >
                    {selectedCategory === category.category_id && (
                        <motion.div
                            layoutId="categoryBg"
                            className="absolute inset-0 bg-primary rounded-full shadow-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{category.category_name}</span>
                </motion.button>
            ))}
        </div>
    );
}
