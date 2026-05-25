import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    title: "Ordering & Shipping",
    faqs: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping typically takes 3-5 business days within the continental United States. Expedited shipping options are available at checkout for faster delivery.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within the United States. We hope to expand internationally in the future! Sign up for our newsletter to be the first to know when we do.",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "We're sorry if this happens! Please contact us within 48 hours of delivery with photos of the damage, and we'll send a replacement at no cost to you.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive an email with a tracking number. You can use this to monitor your package's journey to your door.",
      },
    ],
  },
  {
    title: "Products",
    faqs: [
      {
        question: "Are your pickles organic?",
        answer:
          "While we use organic practices and locally sourced ingredients, we are not currently certified organic. We source from farms within 50 miles that share our commitment to sustainable agriculture.",
      },
      {
        question: "How long do your pickles last?",
        answer:
          "Unopened jars are good for 18 months from the production date. Once opened, refrigerate and consume within 3 months for the best quality and crunch.",
      },
      {
        question: "Are your products vegan/vegetarian?",
        answer:
          "Yes! All our pickle products are 100% vegan and vegetarian friendly. We use no animal products in any of our recipes.",
      },
      {
        question: "How spicy are your spicy pickles?",
        answer:
          "Our Jalapeño Crunch Pickles offer a medium heat that most people enjoy. Our Fiery Habanero Pickles are significantly hotter and recommended for true spice lovers only!",
      },
    ],
  },
  {
    title: "Ingredients & Allergens",
    faqs: [
      {
        question: "Do you use any artificial preservatives?",
        answer:
          "Never! Our pickles are preserved naturally through the traditional pickling process using salt, vinegar, and time. No artificial preservatives needed.",
      },
      {
        question: "Are your products gluten-free?",
        answer:
          "Yes, all our pickles are gluten-free and safe for those with gluten sensitivities or celiac disease.",
      },
      {
        question: "What's in your brine?",
        answer:
          "Our classic brine contains water, distilled white vinegar, salt, garlic, dill, and a blend of traditional pickling spices. Specific ingredients vary by product.",
      },
    ],
  },
];

const FAQs = () => {
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our products, shipping, and
              more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="bg-card rounded-xl border border-border px-6"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-card rounded-2xl p-8 border border-border"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're here to help! Reach out to our friendly customer service
              team.
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

export default FAQs;
