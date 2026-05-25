import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Clock, MapPin, AlertCircle } from "lucide-react";

const policies = [
    {
        icon: Truck,
        title: "Standard Shipping",
        content:
            "We ship all orders via standard delivery within 3-5 business days. Orders are packed carefully to ensure your pickles arrive fresh and intact. Free shipping is available on orders above ₹999.",
    },
    {
        icon: Clock,
        title: "Processing Time",
        content:
            "All orders are processed within 1-2 business days after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day.",
    },
    {
        icon: MapPin,
        title: "Delivery Areas",
        content:
            "We currently deliver across India. Remote areas may experience slightly longer delivery times of 5-7 business days. International shipping is not available at this time.",
    },
];

const steps = [
    "Place your order and complete payment",
    "Receive an order confirmation email",
    "We pack and dispatch your order within 1-2 business days",
    "Receive a tracking number via email or SMS",
    "Your order arrives within the estimated delivery window",
];

const ShippingPolicy = () => {
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
                            Shipping Policy
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Everything you need to know about how we get our pickles
                            safely to your doorstep.
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

                    {/* How it works */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-2xl p-8 border border-border mb-12"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Truck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                                    How Shipping Works
                                </h2>
                                <p className="text-muted-foreground">
                                    From your order to your doorstep — here's the journey.
                                </p>
                            </div>
                        </div>

                        <ol className="space-y-4">
                            {steps.map((step, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <span className="text-foreground">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </motion.div>

                    {/* Important Notes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-muted rounded-2xl p-8 mb-12"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            <h2 className="font-display text-xl font-bold text-foreground">
                                Important Notes
                            </h2>
                        </div>
                        <p className="text-muted-foreground">
                            Delivery timelines are estimates and may vary due to weather
                            conditions, public holidays, or courier delays beyond our
                            control. We are not responsible for delays caused by incorrect
                            or incomplete delivery addresses provided at checkout. Please
                            double-check your address before placing an order.
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
                            Questions about your shipment?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            We're here to help track your order or resolve any delivery issues.
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

export default ShippingPolicy;