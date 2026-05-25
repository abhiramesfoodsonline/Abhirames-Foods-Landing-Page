import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { companySettings } from "@/data/mockData";
import {Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, X, Twitter, XIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {cmsAPI, companyAPI} from "@/lib/api.ts";

const Contact = () => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState('');
  const [x, setX] = useState('');

  const fetchContactInfo = async () => {
    try {
      const contactRes = await companyAPI.getContactUs();
      setPhoneNumber(contactRes.data.phone_number);
      setEmail(contactRes.data.email_id);
      setAddress(contactRes.data.address);

      const socialMediaRes = await companyAPI.getSocialMedia();
      setInstagram(socialMediaRes.data.instagram);
      setFacebook(socialMediaRes.data.facebook);
      setWhatsapp(socialMediaRes.data.whatsapp);
      setX(socialMediaRes.data.twitter);

    }
    catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchContactInfo();
  }, []);

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
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                We'd love to hear from you! Whether you have questions, feedback,
                or just want to chat about pickles, we're here for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Details */}
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a
                          href={`tel:${phoneNumber}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a
                          href={`mailto:${email}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">{address}</p>
                    </div>
                  </div>


                </div>

                {/* Social Links */}
                <div className="mt-10">
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { href: instagram, icon: Instagram, label: "Instagram" },
                      { href: facebook, icon: Facebook, label: "Facebook" },
                      { href: whatsapp, icon: MessageCircle, label: "WhatsApp" },
                      {href: x, icon: X, label: 'X'}
                    ].map(({ href, icon: Icon, label }) => (
                        <div key={label} className="relative group">
                          <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              aria-label={label}
                          >
                            <Icon className="w-5 h-5 text-foreground" />
                          </a>
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-foreground bg-background text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {label}
                  </span>
                        </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder / Additional Info */}
              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-8 shadow-card"
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Visit Our Farm Store
                </h2>

                <div className="aspect-video rounded-xl bg-muted mb-6 overflow-hidden">
                  <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.27369138525!2d77.30381507488319!3d8.95630809110215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0429bf6153ec47%3A0xf3ff2cf076866ddf!2sAbhirames%20Pickle%20House!5e1!3m2!1sen!2sin!4v1779704178666!5m2!1sen!2sin"
                      // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2947.5574693!2d-72.5778!3d44.2584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDE1JzMwLjIiTiA3MsKwMzQnNDAuMSJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Grandma's Pickle Co. Location"
                  />
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our store offers the complete Abhirame's Food Products
                    experience. Browse our full product selection, sample our latest
                    creations, and take home some Vermont-made goodness.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
  );
};

export default Contact;
