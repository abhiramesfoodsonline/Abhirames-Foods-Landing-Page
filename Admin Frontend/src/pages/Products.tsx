import React, {useEffect, useState} from 'react';
import DataTable from '@/components/ui/DataTable';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Filter, Package } from 'lucide-react';
import { toast } from 'sonner';
import {Product, Category, categoriesAPI, productsAPI} from '@/lib/api';

const emptyFormData = {
    product_name: '',
    product_description: '',
    summarized_description: '',
    category_id: '',
    product_image_url: '',
    buy_link: '',
    is_available: true,
};

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState(emptyFormData);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await categoriesAPI.getAll();
            const mapped = res.data.map((c) => ({
                id: c.category_id,
                category_id: c.category_id,
                category_name: c.category_name,
                is_active: c.is_active,
                created_at: c.created_at,
                updated_at: c.updated_at,
            }));
            setCategories(mapped);
        } catch (e) {
            toast.error('Failed to load categories: ' + e.message);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await productsAPI.getAll();

            const mapped = res.data.map((p) => ({
                id: p.product_id,
                product_id: p.product_id,
                product_name: p.product_name,
                product_description: p.product_description,
                summarized_description: p.summarized_description,
                buy_link: p.buy_link,
                product_image_url: p.product_image_url,
                category_id: p.category_id,
                category_name:
                    categories.find((c) => c.category_id === p.category_id)?.category_name || '',
                is_available: p.is_available,
                created_at: p.created_at,
                updated_at: p.updated_at,
            }));
            setProducts(mapped);
        } catch (e) {
            if (e.response.status  !== 404) {
                toast.error('Failed to load products: ' + e.message);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length) fetchProducts();
    }, [categories]);

    const filteredProducts =
        filterCategory === 'all'
            ? products
            : products.filter((p) => p.category_id === filterCategory);


    const handleAdd = () => {
        setSelectedProduct(null);
        setFormData(emptyFormData);
        setIsFormOpen(true);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setFormData({
            product_name: product.product_name,
            product_description: product.product_description,
            summarized_description: product.summarized_description,
            buy_link: product.buy_link,
            category_id: product.category_id,
            product_image_url: product.product_image_url,
            is_available: product.is_available,
        });
        setIsFormOpen(true);
    };

    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (selectedProduct) {
                await productsAPI.update(selectedProduct.product_id, {
                    product_name: formData.product_name,
                    product_description: formData.product_description,
                    summarized_description: formData.summarized_description,
                    buy_link: formData.buy_link,
                    category_id: formData.category_id,
                    product_image_url: formData.product_image_url,
                    is_available: formData.is_available,
                });
                toast.success('Product updated successfully');
            } else {
                await productsAPI.create({
                    product_name: formData.product_name,
                    product_description: formData.product_description,
                    summarized_description: formData.summarized_description,
                    buy_link: formData.buy_link,
                    category_id: formData.category_id,
                    product_image_url: formData.product_image_url,
                    is_available: formData.is_available,
                });
                toast.success('Product added successfully');
            }
            setIsFormOpen(false);
            fetchProducts();
        } catch (e) {
            toast.error('Operation failed: ' + (e.response?.data || e.message));
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!selectedProduct) return;
        setIsLoading(true);

        try {
            await productsAPI.delete(selectedProduct.product_id);
            toast.success('Product deleted successfully');
            fetchProducts();
        } catch (e) {
            toast.error(
                'Delete Failed: ' +
                selectedProduct.product_name +
                (e.response?.data ? ': ' + e.response.data : '')
            );
        } finally {
            setIsLoading(false);
            setIsDeleteOpen(false);
        }
    };

    const toggleAvailability = async (product: Product) => {
        try {
            await productsAPI.update(product.product_id, {
                product_name: product.product_name,
                product_description: product.product_description,
                summarized_description: product.summarized_description,
                buy_link: product.buy_link,
                category_id: product.category_id,
                product_image_url: product.product_image_url,
                is_available: !product.is_available,
            });
            fetchProducts();
            toast.success('Status updated');
        } catch (e) {
            toast.error('Failed to update status ' + e.message);
        }
    };

    const columns = [
        {
            header: 'Product',
            cell: (row: Product) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-medium text-foreground">{row.product_name}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {row.summarized_description}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Category',
            cell: (row: Product) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          {row.category_name}
        </span>
            ),
        },
        {
            header: 'Image URL',
            cell: (row: Product) => (
                <a
                    href={row.product_image_url}
                    target="_blank"
                    className="text-primary underline"
                >
                    View Image
                </a>
            ),

        },
        {
            header: 'Buy Link',
            cell: (row: Product) => (
                <a
                    href={row.buy_link}
                    target="_blank"
                    className="text-primary underline"
                >
                    View Product
                </a>
            ),

        },
        {
            header: 'Availability',
            cell: (row: Product) => (
                <div className="flex items-center gap-2">
                    <Switch
                        checked={row.is_available}
                        onCheckedChange={() => toggleAvailability(row)}
                    />
                    <span
                        className={`text-sm ${
                            row.is_available ? 'text-success' : 'text-muted-foreground'
                        }`}
                    >
            {row.is_available ? 'Available' : 'Unavailable'}
          </span>
                </div>
            ),
        },
        {
            header: 'Actions',
            cell: (row: Product) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(row)}
                        className="h-8 w-8"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(row)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Products</h1>
                    <p className="text-muted-foreground">Manage your pickle products</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-2 flex-1 sm:flex-none">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select
                            value={String(filterCategory)}
                            onValueChange={(value) =>
                                setFilterCategory(value === 'all' ? 'all' : Number(value))
                            }
                        >

                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>

                                {categories.map((cat) => (
                                    <SelectItem key={cat.category_id} value={String(cat.category_id)}>
                                        {cat.category_name}
                                    </SelectItem>
                                ))}

                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleAdd} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredProducts}
                emptyMessage="No products found. Add your first product!"
            />

            {/* Add/Edit Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-lg animate-scale-in">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedProduct ? 'Edit Product' : 'Add Product'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedProduct
                                ? 'Update the product details below.'
                                : 'Enter the details for the new product.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    value={formData.product_name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, product_name: e.target.value }))
                                    }
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.product_description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, product_description: e.target.value }))
                                    }
                                    placeholder="Enter product description"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="summarized_description">Summarized Description</Label>
                                <Textarea
                                    id="summarized_description"
                                    value={formData.summarized_description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, summarized_description: e.target.value }))
                                    }
                                    placeholder="Enter summarized description"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="buy_link">Buy Link</Label>
                                    <Input
                                        id="buy_link"
                                        type="url"
                                        value={formData.buy_link}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                buy_link: e.target.value,
                                            }))
                                        }

                                        placeholder="https://example.com/product"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={formData.category_id} onValueChange={
                                        (value) => setFormData(
                                            (prev) => (
                                                { ...prev, category_id: Number(value) }
                                            )) } >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger> <SelectContent>
                                        {categories.map((cat) => ( <SelectItem key={cat.category_id} value={cat.category_id}> {cat.category_name}
                                        </SelectItem> ))}
                                    </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="product_image_url">Image URL</Label>
                                <Input
                                    id="product_image_url"
                                    type="url"
                                    value={formData.product_image_url}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, product_image_url: e.target.value }))
                                    }
                                    required
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="is_available">Available for Sale</Label>
                                <Switch
                                    id="is_available"
                                    checked={formData.is_available}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({ ...prev, is_available: checked }))
                                    }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsFormOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {selectedProduct ? 'Update' : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                title="Delete Product"
                description={`Are you sure you want to delete "${selectedProduct?.product_name}"? This action cannot be undone.`}
                confirmText="Delete"
                onConfirm={confirmDelete}
                isLoading={isLoading}
                variant="destructive"
            />
        </div>
    );
};

export default Products;
