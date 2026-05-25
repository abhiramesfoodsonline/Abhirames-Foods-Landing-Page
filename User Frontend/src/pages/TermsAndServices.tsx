import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ShieldCheck, UserCheck, AlertTriangle } from "lucide-react";

const policies = [
    {
        icon: FileText,
        title: "Use of Our Website",
        content:
            "By accessing and using this website, you agree to comply with these terms. You may not use our site for any unlawful purpose or in a way that could damage, disable, or impair the site or interfere with other users' enjoyment of it.",
    },
    {
        icon: ShieldCheck,
        title: "Intellectual Property",
        content:
            "All content on this website, including text, graphics, logos, and images, is the property of Grandma's Pickle Co. and is protected by applicable copyright laws. Unauthorized use is strictly prohibited.",
    },
    {
        icon: UserCheck,
        title: "Your Responsibilities",
        content:
            "You are responsible for ensuring that any information you provide to us is accurate and up to date. You agree not to misuse our services or attempt to gain unauthorized access to any part of our website.",
    },
];

const sections = [
    {
        title: "Orders & Payments",
        content:
            "All orders placed through our website are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion. Prices are listed in INR and are subject to change without notice. Payment must be completed at the time of purchase.",
    },
    {
        title: "Limitation of Liability",
        content:
            "Grandma's Pickle Co. shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the value of the order placed by the customer.",
    },
    {
        title: "Privacy Policy",
        content:
            "We are committed to protecting your personal information. Any data collected through this website is used solely for processing orders and improving your experience. We do not sell or share your information with third parties without your consent.",
    },
    {
        title: "Changes to Terms",
        content:
            "We reserve the right to update or modify these terms at any time without prior notice. Continued use of our website after any changes constitutes your acceptance of the new terms. We encourage you to review this page periodically.",
    },
];

export const TermsAndServices = () => {
    return (
        <Layout>
            {/* Header */}
            <section className="bg-gradient-cream py-16 md:py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Terms & Services
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Please read these terms carefully before using our website
                            or placing an order with us.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Policies */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {policies.map((policy, index) => (
                            <motion.div
                                key={policy.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-2xl p-6 border border-border"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <policy.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                                    {policy.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {policy.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Detailed Sections */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-2xl p-8 border border-border mb-12"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                                    Detailed Terms
                                </h2>
                                <p className="text-muted-foreground">
                                    The following terms govern your use of our website and services.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {sections.map((section, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            {section.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-muted rounded-2xl p-8 mb-12"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-primary" />
                            <h2 className="font-display text-xl font-bold text-foreground">
                                Disclaimer
                            </h2>
                        </div>
                        <p className="text-muted-foreground">
                            Our products are food items and are subject to food safety
                            regulations. We make every effort to ensure accurate product
                            descriptions and ingredient information. However, if you have
                            specific dietary requirements or allergies, please contact us
                            before placing an order. Grandma's Pickle Co. is not liable
                            for any adverse reactions resulting from undisclosed allergies.
                        </p>
                    </motion.div>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                            Have questions about our terms?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Feel free to reach out and we'll be happy to clarify anything.
                        </p>
                        <Button asChild>
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

