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
import {adminUsersAPI} from "@/lib/api.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";


const ViewAdmins: React.FC = () => {
    const [admins, setAdmins] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [formData, setFormData] = useState({username: '', role: ''});
    const [isLoading, setIsLoading] = useState(false);


    const fetchAdmins = async () => {
        try {
            const res = await adminUsersAPI.getAll();
            const mapped = res.data.map((admin) => ({
                id: admin.admin_id,
                username: admin.username,
                role: admin.role,
                created_at: admin.created_at,
                updated_at: admin.updated_at,
            }));
            setAdmins(mapped);
        } catch (e){
            toast.error("Failed to load admins" + e.message);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);


    const handleEdit = (admin) => {
        setSelectedAdmin(admin);
        setFormData({ username: admin.username, role: admin.role});
        setIsFormOpen(true);
    };

    const handleDelete = (admin) => {
        setSelectedAdmin(admin);
        setIsDeleteOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (selectedAdmin) {
                await adminUsersAPI.updateRole(formData.username, formData.role);
                toast.success("Admin updated");
            } else {
                await adminUsersAPI.updateRole( formData.username, formData.role);
                toast.success("Admin created");
            }
            setIsFormOpen(false);
            fetchAdmins();
        } catch (e) {
            toast.error("Operation failed. " + e.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!selectedAdmin) return;
        setIsLoading(true);

        try {
            await adminUsersAPI.delete(selectedAdmin.username);
            toast.success("Admin deleted");
            fetchAdmins();
        } catch (e) {
            if (e.response.status === 409){
                toast.error("Delete Failed: " + selectedAdmin.username + " " + e.message);
            } else {
                console.log(e);
                toast.error("Delete Failed: " + e.message);
            }

        } finally {
            setIsDeleteOpen(false);
            setIsLoading(false);
        }
    };



    const columns = [
        { header: 'Username', accessorKey: 'username' as const },

        {
            header: 'Role',
            cell: (row) => (
                <span className="text-muted-foreground">
                    {row.role}
                </span>
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
                    <h1 className="text-2xl font-bold text-foreground">Admins</h1>
                    <p className="text-muted-foreground">Manage your product admins</p>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={admins}
                emptyMessage="No admin found. Add your first admin!"
            />

            {/* Add/Edit Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-md animate-scale-in">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedAdmin ? 'Edit Admin' : 'Add Admin'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedAdmin
                                ? 'Update the admin details below.'
                                : 'Enter the details for the new admin.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, username: e.target.value }))
                                    }
                                    placeholder="Enter admin name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role"></Label>
                                <Select value={formData.role} onValueChange={(value) => setFormData((prev) => ({...prev, role:value}))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger> <SelectContent>
                                    <SelectItem key="Admin-Role" value="ADMIN"> Admin Role
                                    </SelectItem>
                                    <SelectItem key="Super-Admin-Role" value="SUPER_ADMIN"> Super Admin Role
                                    </SelectItem>
                                </SelectContent>
                                </Select>
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
                                {selectedAdmin ? 'Update' : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                title="Delete Admin"
                description={`Are you sure you want to delete "${selectedAdmin?.username}"? This action cannot be undone.`}
                confirmText="Delete"
                onConfirm={confirmDelete}
                isLoading={isLoading}
                variant="destructive"
            />
        </div>
    );
};

export default ViewAdmins;
