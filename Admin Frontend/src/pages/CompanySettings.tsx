import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, Upload, Building2, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import {companyAPI, CompanySettings as CompanySettingsType} from '@/lib/api';

const EMPTY_SETTINGS: CompanySettingsType = {
    company_name: '',
    logo_url: '',

    phone_number: '',
    email_id: '',
    address: '',

    instagram: '',
    facebook: '',
    whatsapp: '',
    twitter: '',
};

const CompanySettings: React.FC = () => {

    const [settings, setSettings] = useState<CompanySettingsType>(EMPTY_SETTINGS);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    companyRes,
                    contactRes,
                    socialRes
                ] = await Promise.allSettled([
                    companyAPI.getCompanyProfile(),
                    companyAPI.getContactUs(),
                    companyAPI.getSocialMedia()
                ]);

                setSettings({
                    company_name:
                        companyRes.status === 'fulfilled'
                            ? companyRes.value.data.company_name
                            : '',
                    logo_url:
                        companyRes.status === 'fulfilled'
                            ? companyRes.value.data.logo_url
                            : '',

                    phone_number:
                        contactRes.status === 'fulfilled'
                            ? contactRes.value.data.phone_number
                            : '',
                    email_id:
                        contactRes.status === 'fulfilled'
                            ? contactRes.value.data.email_id
                            : '',
                    address:
                        contactRes.status === 'fulfilled'
                            ? contactRes.value.data.address
                            : '',

                    instagram:
                        socialRes.status === 'fulfilled'
                            ? socialRes.value.data.instagram
                            : '',
                    facebook:
                        socialRes.status === 'fulfilled'
                            ? socialRes.value.data.facebook
                            : '',
                    whatsapp:
                        socialRes.status === 'fulfilled'
                            ? socialRes.value.data.whatsapp
                            : '',
                    twitter:
                        socialRes.status === 'fulfilled'
                            ? socialRes.value.data.twitter
                            : '',
                });
            } catch {
                toast.error('Something went wrong while loading settings');
            }
        };

        fetchData();
    }, []);



    const handleChange = (
        field: keyof CompanySettingsType,
        value: string
    ) => {
        setSettings(prev =>
            prev ? { ...prev, [field]: value } : prev
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setLoading(true);
        try {
            await Promise.all([
                companyAPI.updateCompanyProfile({
                    company_name: settings.company_name,
                    logo_url: settings.logo_url,
                }),
                companyAPI.updateContactUs({
                    phone_number: settings.phone_number,
                    email_id: settings.email_id,
                    address: settings.address,
                }),
                companyAPI.updateSocialMedia({
                    instagram: settings.instagram,
                    facebook: settings.facebook,
                    whatsapp: settings.whatsapp,
                    twitter: settings.twitter,
                }),
            ]);

            toast.success('Company settings updated successfully');
        } catch (e) {
            toast.error('Update failed' + e.message);
        } finally {
            setLoading(false);
        }
    };

    if (!settings) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        );
    }
    return (
        <div className="space-y-6">
            
            <div>
                <h1 className="text-2xl font-bold text-foreground">Company Settings</h1>
                <p className="text-muted-foreground">Manage your company information and social links</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card className="animate-slide-up">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Building2 className="h-5 w-5 text-primary" />
                            Basic Information
                        </CardTitle>
                        <CardDescription>Update your company name and logo</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Logo Upload */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-32 w-32 rounded-xl border-2 border-dashed border-border bg-muted/50 flex items-center justify-center">
                                    {settings.logo_url ? (
                                        <img
                                            src={settings.logo_url}
                                            alt="Company logo"
                                            className="h-full w-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <div className="text-center p-4">
                                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                            <p className="text-xs text-muted-foreground">Upload Logo</p>
                                        </div>
                                    )}
                                </div>
                                <Input
                                    type="url"
                                    placeholder="Enter logo URL"
                                    value={settings.logo_url}
                                    onChange={(e) => handleChange('logo_url', e.target.value)}
                                    className="w-48"
                                />
                            </div>

                            {/* Company Name */}
                            <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Company Name</Label>
                                    <Input
                                        id="name"
                                        value={settings.company_name}
                                        onChange={(e) => handleChange('company_name', e.target.value)}
                                        placeholder="Your company name"
                                        className="text-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="animate-slide-up [animation-delay:100ms]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Phone className="h-5 w-5 text-primary" />
                            Contact Information
                        </CardTitle>
                        <CardDescription>Update your contact details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    value={settings.phone_number}
                                    onChange={(e) => handleChange('phone_number', e.target.value)}
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={settings.email_id}
                                    onChange={(e) => handleChange('email_id', e.target.value)}
                                    placeholder="info@company.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                Business Address
                            </Label>
                            <Input
                                id="address"
                                value={settings.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                placeholder="Enter your business address"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="animate-slide-up [animation-delay:200ms]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Instagram className="h-5 w-5 text-primary" />
                            Social Media Links
                        </CardTitle>
                        <CardDescription>Connect your social media profiles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="instagram" className="flex items-center gap-2">
                                    <Instagram className="h-4 w-4 text-muted-foreground" />
                                    Instagram
                                </Label>
                                <Input
                                    id="instagram"
                                    value={settings.instagram}
                                    onChange={(e) => handleChange('instagram', e.target.value)}
                                    placeholder="https://instagram.com/yourpage"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facebook" className="flex items-center gap-2">
                                    <Facebook className="h-4 w-4 text-muted-foreground" />
                                    Facebook
                                </Label>
                                <Input
                                    id="facebook"
                                    value={settings.facebook}
                                    onChange={(e) => handleChange('facebook', e.target.value)}
                                    placeholder="https://facebook.com/yourpage"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp" className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                WhatsApp Link
                            </Label>
                            <Input
                                id="whatsapp"
                                value={settings.whatsapp}
                                onChange={(e) => handleChange('whatsapp', e.target.value)}
                                placeholder="+919876543210"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="twitter" className="flex items-center gap-2">
                                <Input className="h-4 w-4 text-muted-foreground" />
                                Twitter
                            </Label>
                            <Input
                                id="twitter"
                                value={settings.twitter}
                                onChange={(e) => handleChange('twitter', e.target.value)}
                                placeholder="https://twitter.com/yourpage"
                            />
                        </div>
                        </div>
                    </CardContent>
                </Card>

                <Separator />

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={loading} size="lg">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CompanySettings;
