import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, FileText, Info, Phone, HelpCircle, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';
import { LucideIcon } from 'lucide-react';
import {cmsAPI} from "@/lib/api.ts";

interface CMSPage {
  slug: string;
  title: string;
  icon: LucideIcon;
  content: string;
}

const pageDefinitions = [
    { slug: 'about-us', title: 'About Us', icon: Info },
    { slug: 'contact-us', title: 'Contact Us', icon: Phone },
    { slug: 'faqs', title: 'FAQs', icon: HelpCircle },
    { slug: 'returns-refund', title: 'Returns & Refund', icon: RotateCcw },
];

const CMSPages: React.FC = () => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [activeTab, setActiveTab] = useState('about-us');
  const [isLoading, setIsLoading] = useState<string | null>(null);


    useEffect(() => {
        const loadPages = async () => {
            try {
                const res = await cmsAPI.getAll();

                // Merge backend data with definitions
                const merged = pageDefinitions.map(def => {
                    const found = res.data.find((p: any) => p.slug === def.slug);
                    return {
                        ...def,
                        content: found?.content || '',
                    };
                });

                setPages(merged);
            } catch {
                // No toast → empty editors
                setPages(
                    pageDefinitions.map(p => ({ ...p, content: '' }))
                );
            }
        };

        loadPages();
    }, []);

    const handleContentChange = (slug: string, content: string) => {
        setPages(prev =>
            prev.map(p => (p.slug === slug ? { ...p, content } : p))
        );
    };


    const handleSave = async (slug: string) => {
        const page = pages.find(p => p.slug === slug);
        if (!page) return;

        setIsLoading(slug);
        try {
            await cmsAPI.upsert(slug, {
                title: page.title,
                content: page.content,
            });
            toast.success(`${page.title} saved successfully`);
        } catch (e){
            toast.error('Failed to save content ' + e.message);
        } finally {
            setIsLoading(null);
        }
    };


    return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">CMS Pages</h1>
        <p className="text-muted-foreground">Edit content for your website pages</p>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Page Content Editor
          </CardTitle>
          <CardDescription>
            Select a page tab below and edit the content using Markdown format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
              {pages.map((page) => (
                <TabsTrigger
                  key={page.slug}
                  value={page.slug}
                  className="flex items-center gap-2"
                >
                  <page.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{page.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {pages.map((page) => (
              <TabsContent key={page.slug} value={page.slug} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <page.icon className="h-5 w-5 text-primary" />
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Edit the content using Markdown format
                    </p>
                  </div>
                  <Button
                    onClick={() => handleSave(page.slug)}
                    disabled={isLoading === page.slug}
                  >
                    {isLoading === page.slug ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </div>

                <Textarea
                  value={page.content}
                  onChange={(e) => handleContentChange(page.slug, e.target.value)}
                  placeholder="Enter page content in Markdown format..."
                  className="min-h-[500px] font-mono text-sm"
                />

                {/* Preview */}
                <div className="rounded-lg border border-border p-6 bg-muted/30">
                  <h4 className="font-semibold text-foreground mb-4">Preview</h4>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                      {page.content}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSPages;
