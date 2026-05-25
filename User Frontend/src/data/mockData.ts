import { Category, Product, CompanySettings, CMSPage } from "@/types";

// Mock Categories
export const categories: Category[] = [
  {
    category_id: 1,
    category_name: "Classic Pickles",
    description: "Traditional recipes passed down through generations",
    image_url: "/placeholder.svg",
    is_active: true,
  },
  {
    category_id: 2,
    category_name: "Spicy Pickles",
    description: "For those who love a kick of heat",
    image_url: "/placeholder.svg",
    is_active: true,
  },
  {
    category_id: 3,
    category_name: "Sweet Pickles",
    description: "Perfect balance of sweet and tangy",
    image_url: "/placeholder.svg",
    is_active: true,
  },
  {
    category_id: 4,
    category_name: "Mixed Vegetables",
    description: "Variety of pickled vegetables",
    image_url: "/placeholder.svg",
    is_active: true,
  },
  {
    category_id: 5,
    category_name: "Seasonal Specials",
    description: "Limited edition flavors for every season",
    image_url: "/placeholder.svg",
    is_active: false,
  },
];
// Mock Products
export const products: Product[] = [
  {
    product_id: 1,
    product_name: "Grandmother's Dill Pickles",
    title: "Crisp, tangy dill pickles made with our secret family recipe",
    product_description: "Our signature Grandmother's Dill Pickles are crafted using a time-honored recipe that's been in our family for generations. Each pickle is hand-selected for perfect crunch and flavor, then brined in our special blend of dill, garlic, and spices. The result is a pickle that's crisp, tangy, and absolutely irresistible. Perfect as a snack, side dish, or on your favorite sandwich.",
    price: 299,
    product_image_url: "/placeholder.svg",
    category: categories[0],
    is_available: true,
  },
  {
    product_id: 2,
    product_name: "Garlic Lovers Pickles",
    title: "Extra garlic for bold flavor enthusiasts",
    product_description: "For those who believe you can never have too much garlic, these pickles are for you. We double the garlic in our classic recipe and add a touch of black pepper for depth. Each bite delivers an incredible garlic punch that will satisfy even the most devoted garlic lovers. Great on burgers, in salads, or straight from the jar.",
    price: 349,
    product_image_url: "/placeholder.svg",
    category: categories[0],
    is_available: true,
  },
  {
    product_id: 3,
    product_name: "Fiery Habanero Pickles",
    title: "Intense heat with habanero peppers",
    product_description: "Warning: These pickles are not for the faint of heart! We infuse our classic pickles with real habanero peppers for an intense, fiery experience. The heat builds slowly, allowing you to enjoy the full pickle flavor before the spice kicks in. Perfect for spice lovers who want to add some excitement to their meals.",
    price: 399,
    product_image_url: "/placeholder.svg",
    category: categories[1],
    is_available: true,
  },
  {
    product_id: 4,
    product_name: "Jalapeño Crunch Pickles",
    title: "Medium heat with jalapeño kick",
    product_description: "Our Jalapeño Crunch Pickles offer the perfect balance of heat and flavor. Fresh jalapeños are sliced and brined alongside our pickles, creating a medium-heat option that's accessible to most spice enthusiasts. The jalapeño adds a bright, fresh heat that complements the pickle's tanginess beautifully.",
    price: 349,
    product_image_url: "/placeholder.svg",
    category: categories[1],
    is_available: false,
  },
  {
    product_id: 5,
    product_name: "Honey Bread & Butter",
    title: "Sweet and tangy with local honey",
    product_description: "Our Honey Bread & Butter pickles are a sweet twist on the classic. We use locally sourced honey to create a perfectly balanced sweet and tangy pickle that's incredible on sandwiches or as a standalone snack. The natural honey adds a depth of flavor that sets these apart from ordinary sweet pickles.",
    price: 379,
    product_image_url: "/placeholder.svg",
    category: categories[2],
    is_available: true,
  },
  {
    product_id: 6,
    product_name: "Maple Cinnamon Pickles",
    title: "Unique sweet pickles with autumn flavors",
    product_description: "A truly unique creation, our Maple Cinnamon Pickles combine the warmth of maple syrup with aromatic cinnamon. These pickles are perfect for fall and winter, offering a cozy, sweet flavor that pairs wonderfully with cheese boards and holiday meals. A conversation starter at any gathering.",
    price: 429,
    product_image_url: "/placeholder.svg",
    category: categories[2],
    is_available: true,
  },
  {
    product_id: 7,
    product_name: "Garden Mix Pickles",
    title: "Assorted vegetables in classic brine",
    product_description: "Our Garden Mix brings together the best of the harvest in one jar. Cucumbers, carrots, cauliflower, and green beans are all pickled in our classic brine for a variety of textures and flavors. Perfect for antipasto platters, snacking, or adding variety to your pickle selection.",
    price: 449,
    product_image_url: "/placeholder.svg",
    category: categories[3],
    is_available: true,
  },
  {
    product_id: 8,
    product_name: "Pickled Peppers Medley",
    title: "Colorful mix of pickled peppers",
    product_description: "A vibrant mix of sweet and mild peppers pickled to perfection. Red, yellow, and green peppers are combined with our signature spice blend for a colorful and flavorful addition to any meal. Great on pizzas, in salads, or as a garnish for your favorite dishes.",
    price: 399,
    product_image_url: "/placeholder.svg",
    category: categories[3],
    is_available: true,
  },
];

// Mock Company Settings
export const companySettings: CompanySettings = {
  companyName: "Grandma's Pickle Co.",
  tagline: "Crafted with Love, Pickled to Perfection",
  phone: "+1 (555) 123-4567",
  email: "hello@grandmaspickle.co",
  address: "123 Pickle Lane, Farmville, VT 05401",
  socialLinks: {
    instagram: "https://instagram.com/grandmaspickleco",
    facebook: "https://facebook.com/grandmaspickleco",
    whatsapp: "https://wa.me/15551234567",
  },
};

// Mock CMS Pages
export const cmsPages: Record<string, CMSPage> = {
  about: {
    id: "about",
    title: "About Us",
    content: `
# Our Story

For over 50 years, Grandma's Pickle Co. has been crafting the finest pickles in Vermont. What started as Grandmother Mae's hobby in her farmhouse kitchen has grown into a beloved local brand that ships across the country.

## Our Philosophy

We believe that great pickles start with great ingredients. That's why we source our cucumbers from local farms within 50 miles of our facility. We never use artificial preservatives or flavors – just real ingredients and time-tested recipes.

## The Pickle Process

Every jar of our pickles is made with the same care and attention that Grandmother Mae put into her original batches. We hand-select each cucumber, prepare our brine fresh daily, and allow our pickles to ferment naturally for the perfect crunch and flavor.

## Our Promise

We promise to always deliver pickles that taste like they came from your own grandmother's kitchen – full of love, tradition, and incredible flavor.
    `,
  },
  contact: {
    id: "contact",
    title: "Contact Us",
    content: `
# Get in Touch

We'd love to hear from you! Whether you have questions about our products, want to place a wholesale order, or just want to share your love for pickles, we're here to help.

## Visit Our Store

**Grandma's Pickle Co. Farm Store**
123 Pickle Lane
Farmville, VT 05401

**Store Hours:**
- Monday - Friday: 9am - 6pm
- Saturday: 10am - 4pm
- Sunday: Closed

## Contact Information

- **Phone:** +1 (555) 123-4567
- **Email:** hello@grandmaspickle.co
- **Wholesale Inquiries:** wholesale@grandmaspickle.co

We typically respond to emails within 24-48 hours during business days.
    `,
  },
  faqs: {
    id: "faqs",
    title: "Frequently Asked Questions",
    content: `
# Frequently Asked Questions

## Ordering & Shipping

**How long does shipping take?**
Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.

**Do you ship internationally?**
Currently, we only ship within the United States. We hope to expand internationally in the future!

**What if my order arrives damaged?**
Contact us within 48 hours of delivery with photos, and we'll send a replacement at no cost.

## Products

**Are your pickles organic?**
While we use organic practices and locally sourced ingredients, we are not currently certified organic.

**How long do your pickles last?**
Unopened jars are good for 18 months. Once opened, refrigerate and consume within 3 months for best quality.

**Are your products vegan/vegetarian?**
Yes! All our pickle products are vegan and vegetarian friendly.

## Ingredients

**Do you use any artificial preservatives?**
Never! Our pickles are preserved naturally through the pickling process.

**Are your products gluten-free?**
Yes, all our pickles are gluten-free.
    `,
  },
  "returns-refund": {
    id: "returns-refund",
    title: "Returns & Refund Policy",
    content: `
# Returns & Refund Policy

Your satisfaction is our priority. If you're not completely happy with your purchase, we're here to help.

## Damaged or Defective Products

If your order arrives damaged or defective, please contact us within 48 hours of delivery. Include photos of the damage and your order number. We'll send a replacement at no additional cost.

## Satisfaction Guarantee

If you're not satisfied with the taste or quality of our pickles, contact us within 14 days of delivery. We'll work with you to make it right, whether that means a replacement or a full refund.

## How to Request a Return

1. Email us at hello@grandmaspickle.co
2. Include your order number
3. Describe the issue
4. Attach photos if applicable

## Refund Process

Refunds are processed within 5-7 business days of approval. The refund will be credited to your original payment method.

## Non-Returnable Items

Due to food safety regulations, we cannot accept returns of opened products unless there is a quality issue.

## Questions?

If you have any questions about our return policy, please don't hesitate to contact us at hello@grandmaspickle.co.
    `,
  },
};

// API simulation functions
// export const api = {
//   getCategories: () => Promise.resolve(categories.filter(c => c.is_active)),
//   getProducts: () => Promise.resolve(products),
//   getProductsByCategory: (categoryId: string) =>
//     Promise.resolve(products.filter(p => p. === categoryId)),
//   getProduct: (id: string) =>
//     Promise.resolve(products.find(p => p.product_id === id)),
//   getCompanySettings: () => Promise.resolve(companySettings),
//   getCMSPage: (slug: string) => Promise.resolve(cmsPages[slug]),
// };
