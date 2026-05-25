import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Eye, Database, ShieldCheck } from "lucide-react";

const policies = [
    {
        icon: Lock,
        title: "Data Protection",
        content:
            "We take the security of your personal data seriously. All information collected is stored securely and protected using industry-standard encryption. We never sell or share your data with third parties without your explicit consent.",
    },
    {
        icon: Eye,
        title: "What We Collect",
        content:
            "We collect only the information necessary to process your orders and improve your experience — including your name, contact details, and delivery address. We do not collect sensitive financial information directly.",
    },
    {
        icon: Database,
        title: "How We Use It",
        content:
            "Your information is used solely for order processing, delivery coordination, and occasional updates about our products and offers. You may opt out of marketing communications at any time.",
    },
];

const sections = [
    {
        title: "Cookies & Tracking",
        content:
            "Our website uses cookies to enhance your browsing experience and analyze site traffic. Cookies help us remember your preferences and improve our services. You can disable cookies through your browser settings, though this may affect certain features of the site.",
    },
    {
        title: "Third-Party Services",
        content:
            "We may use trusted third-party services such as payment gateways and delivery partners to fulfill your orders. These partners are bound by their own privacy policies and are not permitted to use your data for any other purpose.",
    },
    {
        title: "Data Retention",
        content:
            "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Once your data is no longer needed, it is securely deleted from our systems.",
    },
    {
        title: "Your Rights",
        content:
            "You have the right to access, correct, or request deletion of your personal data at any time. To exercise any of these rights, please contact us directly. We will respond to all requests within a reasonable timeframe.",
    },
];

const PrivacyPolicy = () => {
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
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Your privacy matters to us. Learn how we collect, use, and
                            protect your personal information.
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
                                <ShieldCheck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                                    Detailed Privacy Practices
                                </h2>
                                <p className="text-muted-foreground">
                                    A full breakdown of how we handle your personal information.
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

                    {/* Important Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-muted rounded-2xl p-8 mb-12"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-5 h-5 text-primary" />
                            <h2 className="font-display text-xl font-bold text-foreground">
                                Policy Updates
                            </h2>
                        </div>
                        <p className="text-muted-foreground">
                            We may update this Privacy Policy from time to time to reflect
                            changes in our practices or legal requirements. Any updates will
                            be posted on this page with a revised effective date. We encourage
                            you to review this policy periodically. Continued use of our
                            website following any changes constitutes your acceptance of the
                            updated policy.
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
                            Questions about your privacy?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            We're committed to transparency. Reach out and we'll be glad to help.
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

export default PrivacyPolicy;