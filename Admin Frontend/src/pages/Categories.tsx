import React, {useEffect, useState} from 'react';
import DataTable from '@/components/ui/DataTable';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {Category, categoriesAPI, Product} from "@/lib/api.ts";


const Categories: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({ category_name: '', is_active: true , image_url: ''});
    const [isLoading, setIsLoading] = useState(false);


    const fetchCategories = async () => {
        try {
            const res = await categoriesAPI.getAll();
            const mapped = res.data.map((c) => ({
                id: c.category_id,
                category_name: c.category_name,
                image_url: c.image_url,
                is_active: c.is_active,
                created_at: c.created_at,
                updated_at: c.updated_at,
            }));
            setCategories(mapped);
        } catch (e){
            toast.error("Failed to load categories" + e.message);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = () => {
        setSelectedCategory(null);
        setFormData({ category_name: '', is_active: true, image_url: ''});
        setIsFormOpen(true);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setFormData({ category_name: category.category_name, is_active: category.is_active, image_url: category.image_url });
        setIsFormOpen(true);
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setIsDeleteOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (selectedCategory) {
                await categoriesAPI.update(selectedCategory.id, {
                    category_name: formData.category_name,
                    is_active: formData.is_active,
                    image_url: formData.image_url,
                });
                toast.success("Category updated");
            } else {
                await categoriesAPI.create({
                    category_name: formData.category_name,
                    is_active: formData.is_active,
                    image_url: formData.image_url,
                });
                toast.success("Category created");
            }
            setIsFormOpen(false);
            fetchCategories();
        } catch (e) {
            toast.error("Operation failed. " + e.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!selectedCategory) return;
        setIsLoading(true);

        try {
            await categoriesAPI.delete(selectedCategory.id);
            toast.success("Category deleted");
            fetchCategories();
        } catch (e) {
            if (e.response.status === 409){
                toast.error("Delete Failed: " + selectedCategory.category_name + " contains one or more products");
            } else {
                toast.error("Delete Failed: " + e.message);
            }

        } finally {
            setIsDeleteOpen(false);
            setIsLoading(false);
        }
    };

    const toggleActive = async (category) => {
        try {
            await categoriesAPI.update(category.id, {
                category_name: category.category_name,
                is_active: !category.is_active,
                image_url: category.image_url,
            });
            fetchCategories();
            toast.success("Status updated");
        } catch {
            toast.error("Failed to update status");
        }
    };
    
    const columns = [
        { header: 'Name', accessorKey: 'category_name' as const },
        {
            header: 'Status',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Switch
                        checked={row.is_active}
                        onCheckedChange={() => toggleActive(row)}
                    />
                    <span
                        className={`text-sm ${
                            row.is_active ? 'text-success' : 'text-muted-foreground'
                        }`}
                    >
            {row.is_active ? 'Active' : 'Inactive'}
          </span>
                </div>
            ),
        },
        {
            header: 'Image URL',
            cell: (row) => (
                <a
                    href={row.image_url}
                    target="_blank"
                    className="text-primary underline"
                >
                    View Image
                </a>
            ),

        },
        {
            header: 'Created',
            cell: (row) => (
                <span className="text-muted-foreground">
          {new Date(row.created_at).toLocaleDateString()}
        </span>
            ),
        },

        {
            header: 'Updated',
            cell: (row) => (
                <span className="text-muted-foreground">
          {new Date(row.updated_at).toLocaleDateString()}
        </span>
            ),
        },
        {
            header: 'Actions',
            cell: (row) => (
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
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Categories</h1>
                    <p className="text-muted-foreground">Manage your product categories</p>
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                </Button>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={categories}
                emptyMessage="No categories found. Add your first category!"
            />

            {/* Add/Edit Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-md animate-scale-in">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedCategory ? 'Edit Category' : 'Add Category'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedCategory
                                ? 'Update the category details below.'
                                : 'Enter the details for the new category.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Category Name</Label>
                                <Input
                                    id="name"
                                    value={formData.category_name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, category_name: e.target.value }))
                                    }
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image_url">Image Url</Label>
                                <Input
                                    id="image_url"
                                    value={formData.image_url}
                                    type="url"
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                                    }
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="is_active">Active Status</Label>
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({ ...prev, is_active: checked }))
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
                                {selectedCategory ? 'Update' : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                title="Delete Category"
                description={`Are you sure you want to delete "${selectedCategory?.category_name}"? This action cannot be undone.`}
                confirmText="Delete"
                onConfirm={confirmDelete}
                isLoading={isLoading}
                variant="destructive"
            />
        </div>
    );
};

export default Categories;
