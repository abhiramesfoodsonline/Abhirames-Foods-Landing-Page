import React, {useEffect, useState} from 'react';
import StatCard from '@/components/ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderTree, Package, CheckCircle, TrendingUp, Clock, Eye } from 'lucide-react';
import {toast} from "sonner";
import {dashboardAPI} from "@/lib/api.ts";


const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalCategories: 0,
        totalProducts: 0,
        activeProducts: 0,
    });

    const [recentProducts, setRecentProducts] = useState<any[]>([]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    categoryRes,
                    productsRes,
                    recentRes,
                ] = await Promise.all([
                    dashboardAPI.getCategoryCount(),
                    dashboardAPI.getProducts(),
                    dashboardAPI.getRecentProducts(),
                ]);

                const products = productsRes.data;
                const activeProducts = products.filter((p: any) => p.is_available).length;

                setStats({
                    totalCategories: categoryRes.data,
                    totalProducts: products.length,
                    activeProducts,
                });

                setRecentProducts(recentRes.data);
            } catch (e) {
                // if (e?.response?.status !== 404) {
                //     toast.error('Failed to load dashboard' + e.message);
                // }
                //
                toast.error('Failed to load dashboard' + e.message);
            }

        };

        loadDashboard();
    }, []);

    const activeRate =
        stats.totalProducts === 0
            ? 0
            : Math.round((stats.activeProducts / stats.totalProducts) * 100);

    const avgPerCategory =
        stats.totalCategories === 0
            ? 0
            : (stats.totalProducts / stats.totalCategories).toFixed(1);


    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your pickle business</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Total Categories"
                    value={stats.totalCategories}
                    icon={FolderTree}
                    description="Product categories"
                    trend={{ value: 12, isPositive: true }}
                    className="animate-slide-up"
                />
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={Package}
                    description="All products"
                    trend={{ value: 8, isPositive: true }}
                    className="animate-slide-up [animation-delay:100ms]"
                />
                <StatCard
                    title="Active Products"
                    value={stats.activeProducts}
                    icon={CheckCircle}
                    description="Available for sale"
                    trend={{ value: 5, isPositive: true }}
                    className="animate-slide-up [animation-delay:200ms]"
                />
            </div>

            {/* Quick Stats & Recent Products */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Quick Insights */}
                <Card className="animate-slide-up [animation-delay:300ms]">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Quick Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Active Rate</p>
                                    <p className="text-sm text-muted-foreground">Products available</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-success">{activeRate}%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Package className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Avg per Category</p>
                                    <p className="text-sm text-muted-foreground">Products count</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-primary">{avgPerCategory}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Eye className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Page Views</p>
                                    <p className="text-sm text-muted-foreground">This week</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-accent">1.2K</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Products */}
                <Card className="lg:col-span-2 animate-slide-up [animation-delay:400ms]">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Recent Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent>{recentProducts.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-6">
                            No recent products
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {recentProducts.map((product) => (
                                <div
                                    key={product.product_id}
                                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Package className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">{product.product_name}</p>
                                            <p className="text-sm text-muted-foreground">{product.category_name}</p>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    product.is_available
                                                        ? 'bg-success/10 text-success'
                                                        : 'bg-muted text-muted-foreground'
                                                }`}
                                            > {product.is_available ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">₹{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const Insight = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

export default Dashboard;
