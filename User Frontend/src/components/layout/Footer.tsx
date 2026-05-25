import { Link } from "react-router-dom";
import {Instagram, Facebook, MessageCircle, Phone, Mail, MapPin, X} from "lucide-react";
import { companySettings } from "@/data/mockData";
import {useEffect, useState} from "react";
import {companyAPI} from "@/lib/api.ts";
import {toast} from "sonner";

export function Footer() {
  const [companyName, setCompanyName] = useState("Abhirames Pickles");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState('');
  const [x, setX] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const loadCompanyName = async () => {
      try {
        const res = await companyAPI.getCompanyProfile();
        setCompanyName(res.data.company_name || "Abhirames Pickles");

      } catch (e) {
        toast.error("Failed to load company name. Please refresh the page.");
      }
    }

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

    loadCompanyName();
    fetchContactInfo()
  }, []);
  return (
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-10 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column */}
             <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-golden flex items-center justify-center">
                  {/* TODO: Replace G with actual image */}
                  <span className="text-charcoal font-display font-bold text-xl">G</span>
                </div>
                <span className="font-display text-xl font-semibold">
                {companyName}
              </span>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                {/* TODO: Replace slogan with actual slogan */}
                Crafted with love, pickled to perfection. Family recipes since 1973.
              </p>

              {/*
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              */}

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="font-semibold primary-foreground mb-4">Follow Us</h3>
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
                            className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                            aria-label={label}
                        >
                          <Icon className="w-5 h-5 text-background" />
                        </a>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 primary-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {label}
                  </span>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
             <div className="lg:col-span-2">
              <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-lg font-semibold mb-4">Information</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/faqs" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Terms and Services
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80">{phoneNumber}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80">{email}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80">{address}</span>
                </li>
              </ul>
            </div>

            {/* FSSAI & GST */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-lg font-semibold mb-4">Information</h4>
              <ul className="space-y-2">
                <li>
                  <p className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    FSSAI License: 12345678901234
                  </p>
                </li>
                <li>
                  <p className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    GSTIN: 22ABCDE1234F1Z5
                  </p>
                </li>
                
              </ul>
            </div>


          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} {companyName}. All rights reserved. Abhirames Tech Solutions
            </p>
          </div>
        </div>
      </footer>
  );
}
