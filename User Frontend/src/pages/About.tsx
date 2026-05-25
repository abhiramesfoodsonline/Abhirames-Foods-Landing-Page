import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Leaf, Home, Truck, CheckSquare2} from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import {useEffect, useState} from "react";
import {cmsAPI} from "@/lib/api.ts";


const values = [
  {
    icon: Home,
    title: "100% Homemade",
    description: "",
  },
  {
    icon: Leaf,
    title: "No Artificial Additives",
    description: "",
  },
  {
    icon: Truck,
    title: "Sourced from Local Farms",
    description: "",
  },
  {
    icon: CheckSquare2,
    title: "Quality Tested",
    description: "",
  },
];




const About = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchAboutUs = async () => {
    try {
      const res = await cmsAPI.getAll();
      console.log(res.data.find((p: any) => p.slug === "about-us"));
      setTitle(res.data.find((p: any) => p.slug === "about-us")?.title);
      setContent(res.data.find((p: any) => p.slug === "about-us")?.content);
    }
    catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
                src={aboutHero}
                alt="Grandmother making pickles"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/40" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
                Our Story
              </h1>
              <p className="text-lg md:text-xl text-cream/80 leading-relaxed">
                For over 50 years, we've been preserving the art of pickle-making,
                one jar at a time.
              </p>
            </motion.div>
          </div>
        </section>


        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose prose-lg max-w-none"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Abhirames Food Products
                </h2>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    {content}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                  <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background rounded-2xl p-8 shadow-card hover:shadow-medium transition-shadow self-start"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                      >
                        <value.icon className="w-7 h-7 text-primary" />
                      </motion.div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {value.title}
                      </h3>
                    </div>
                    {value.description && (
                        <p className="text-muted-foreground mt-4">{value.description}</p>
                    )}
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

      </Layout>
  );
};

export default About;
