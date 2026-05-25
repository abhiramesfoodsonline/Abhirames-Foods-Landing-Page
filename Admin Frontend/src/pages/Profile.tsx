import React, { useState, useEffect } from "react";
import {Camera, Save, User, Mail, Phone, MapPin, Building, EyeOff, Eye, Lock} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
import { adminUsersAPI } from "@/lib/api";
import {toast} from "sonner";


const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        current_password: "",
        new_password1: "",
        new_password2: "",

    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const adminUser = JSON.parse(
                    localStorage.getItem("admin_user") || "{}"
                );


                console.log(adminUser);
                if (!adminUser.username) return;

                console.log("Hello");
                const res = await adminUsersAPI.getByUsername(adminUser.username);

                setFormData({
                    username: res.data.username,
                    current_password: "",
                    new_password1: "",
                    new_password2: "",
                });
            } catch (e) {
                // toast({
                //     variant: "destructive",
                //     title: "Failed to load profile",
                //     description: e.message,
                // });
                toast.error("Failed to load profile. " + e.message);
            }
        };

        loadProfile();
    }, []);
    
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            
            if (formData.new_password1 !== formData.new_password2) {
                toast.error("Update failed! New passwords do not match.");
                setIsLoading(false);
                return;
            }
            
            const adminUser = JSON.parse(
                localStorage.getItem("admin_user") || "{}"
            );
 
            await adminUsersAPI.update(adminUser.username, {
                currentPassword: formData.current_password,
                newPassword: formData.new_password1,
            });

            // toast({
            //     title: "Profile updated",
            //     description: "Your account details have been saved successfully.",
            // });
            toast.success("Your account details have been saved successfully.");

            setFormData((prev) => ({ ...prev, current_password: "", new_password1: "", new_password2: "" }));
        } catch (e) {
            // toast({
            //     variant: "destructive",
            //     title: "Update failed",
            //     description: e.message,
            // });
            if (e.response.status === 400) {
                toast.error("Incorrect password! " + e.response.data);
            }
            // toast.error("Update failed. " + e.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-background">
            {/*<Header />*/}

            <main className="container py-8">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold tracking-tight">Account Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your account information and preferences
                        </p>
                    </div>

                    <div className="space-y-6">

                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Personal Information</CardTitle>
                                <CardDescription>
                                    Update your personal details here
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            Username
                                        </Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="Enter your username"
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="current_password" className="flex items-center gap-2">
                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                            Current Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="current_password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your current password"
                                                value={formData.current_password}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, current_password: e.target.value }))
                                                }
                                                required
                                                className="h-11 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>


                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new_password1" className="flex items-center gap-2">
                                                <Lock className="h-4 w-4 text-muted-foreground" />
                                                New Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="new_password1"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your new password"
                                                    value={formData.new_password1}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({ ...prev, new_password1: e.target.value }))
                                                    }
                                                    required
                                                    className="h-11 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="new_password2" className="flex items-center gap-2">
                                                <Lock className="h-4 w-4 text-muted-foreground" />
                                                Confirm New Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="new_password2"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your new password again"
                                                    value={formData.new_password2}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({ ...prev, new_password2: e.target.value }))
                                                    }
                                                    required
                                                    className="h-11 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" disabled={isLoading} className="gap-2">
                                            <Save className="h-4 w-4" />
                                            {isLoading ? "Saving..." : "Save changes"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
