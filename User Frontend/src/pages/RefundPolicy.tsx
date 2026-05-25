import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, RefreshCw, CheckCircle, Mail } from "lucide-react";

const policies = [
  {
    icon: Package,
    title: "Damaged or Defective Products",
    content:
      "If your order arrives damaged or defective, please contact us within 48 hours of delivery. Include photos of the damage and your order number. We'll send a replacement at no additional cost.",
  },
  {
    icon: RefreshCw,
    title: "Satisfaction Guarantee",
    content:
      "If you're not satisfied with the taste or quality of our pickles, contact us within 14 days of delivery. We'll work with you to make it right, whether that means a replacement or a full refund.",
  },
  {
    icon: CheckCircle,
    title: "Refund Process",
    content:
      "Refunds are processed within 5-7 business days of approval. The refund will be credited to your original payment method. You'll receive an email confirmation once the refund has been processed.",
  },
];

const steps = [
  "Email us at hello@grandmaspickle.co",
  "Include your order number",
  "Describe the issue in detail",
  "Attach photos if applicable",
];

const RefundPolicy = () => {
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
              Returns & Refund Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Your satisfaction is our priority. Here's everything you need to
              know about our return and refund process.
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

          {/* How to Request */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border mb-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  How to Request a Return
                </h2>
                <p className="text-muted-foreground">
                  Follow these simple steps to initiate a return or refund request.
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

          {/* Non-Returnable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-muted rounded-2xl p-8 mb-12"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Non-Returnable Items
            </h2>
            <p className="text-muted-foreground">
              Due to food safety regulations, we cannot accept returns of opened
              products unless there is a quality issue. Unopened products in
              their original condition may be returned within 14 days for a full
              refund (minus shipping costs).
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
              Questions about our policy?
            </h3>
            <p className="text-muted-foreground mb-6">
              Don't hesitate to reach out. We're happy to help!
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

export default RefundPolicy;
