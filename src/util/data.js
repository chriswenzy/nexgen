import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import {
  BsArrowReturnLeft,
  BsBrush,
  BsBuilding,
  BsCheckCircle,
  BsFacebook,
  BsGraphUp,
  BsHeadset,
  BsLightning,
  BsMegaphone,
  BsPaintBucket,
  BsPalette,
  BsShield,
  BsShieldCheck,
  BsTag,
  BsTruck,
} from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";

export const companyInfo = {
  description:
    "Nexgen Paint delivers premium coating solutions for residential, commercial, and industrial applications across Nigeria. We combine advanced technology with uncompromising quality standards.",
  socialLinks: [
    { icon: <BsFacebook size={20} />, url: "#" },
    { icon: <AiFillTwitterCircle size={20} />, url: "#" },
    { icon: <AiFillInstagram size={20} />, url: "#" },
    { icon: <AiFillLinkedin size={20} />, url: "#" },
  ],
};
export const footerLinks = [
  {
    title: "Resources",
    links: [
      { text: "Become a distributor", url: "/distributor" },
      { text: "FAQs", url: "/fqa" },
      { text: "Color Guides", url: "#" },
      { text: "Application Tips", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About Us", url: "/about-us" },
      { text: "Our Technology", url: "#" },
      { text: "Sustainability", url: "#" },
      { text: "Careers", url: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Terms of Service", url: "/terms" },
      { text: "Privacy Policy", url: "/privacy-policy" },
      { text: "Product Warranty", url: "/product-warranty" },
      { text: "Compliance", url: "/compliance" },
    ],
  },
];

export const contactInfo = {
  title: "Contact",
  details: [
    "Lagos: 4c idowu Martins street, off Adeola Odeku ,Victoria Island Lagos",
    "Abuja: D15, Rukayat Plaza, Obafemi Awolowo way, Jabi",
    "info@nexgenpaint.com",
    "+234 906 796 6435",
  ],
};

export const bottomLinks = [
  { text: "Accessibility", url: "#" },
  { text: "Sitemap", url: "#" },
  { text: "Patents", url: "#" },
];

export const navItems = [
  { name: "Home", path: "/", matchExact: true },
  { name: "About Us", path: "/about-us", matchExact: true },
  { name: "Products", path: "/product", matchStartsWith: true },
  { name: "Partners", path: "/partner", matchExact: true },
  { name: "Blog", path: "/blogs", matchExact: true },
  { name: "Contact Us", path: "/contact-us", matchExact: true },
];

export const features = [
  {
    icon: <BsBrush size={32} className="text-primary" />,
    title: "Exceptional Coverage",
    description:
      "One coat is often enough for full opacity, saving you time and money.",
  },
  {
    icon: <BsShield size={32} className="text-color-2" />,
    title: "Durable & Weather-Resistant",
    description:
      "Specially formulated to withstand Nigeria's harsh climate conditions.",
  },
  {
    icon: <BsPalette size={32} className="text-primary" />,
    title: "Color Accuracy",
    description: "True-to-sample colors with no surprises when applied.",
  },
  {
    icon: <FaLeaf size={32} className="text-primary" />,
    title: "Eco-Friendly & Low Odor",
    description: "VOC-free formulas safe for families and the environment.",
  },
  {
    icon: <BsTruck size={32} className="text-color-2" />,
    title: "Fast Delivery Nationwide",
    description: "Reliable logistics to get your paint when you need it.",
  },
];

export const products = [
  {
    id: "00001",
    name: "Core Matt",
    category: "Interior Paint",
    subCategory: "Standard Matte",
    size: "20L",
    price: "₦60,000",
    oldPrice: "₦56,375",
    image: "/images/products/buckets/bucket_1.jpg",
  },
  {
    id: "00002",
    name: "Core Matt",
    category: "Interior Paint",
    subCategory: "Standard Matte",
    size: "4L",
    price: "₦16,000",
    oldPrice: "₦16,275",
    image: "/images/products/buckets/bucket_1.jpg",
  },
  {
    id: "00003",
    name: "Silk Matt",
    category: "Premium Paints",
    subCategory: "Matte-Satin Hybrid",
    size: "20L",
    price: "₦80,000",
    oldPrice: "₦82,000",
    image: "/images/products/buckets/bucket_1.jpg",
    badge: "Best Seller",
  },
  {
    id: "00004",
    name: "Silk Matt",
    category: "Premium Paints",
    subCategory: "Matte-Satin Hybrid",
    size: "4L",
    price: "₦16,000",
    oldPrice: "₦16,400",
    image: "/images/products/buckets/bucket_1.jpg",
  },
  {
    id: "00005",
    name: "Lumi Matt",
    category: "Premium Paints",
    subCategory: "Vinyl Matt",
    size: "20L",
    price: "₦95,000",
    oldPrice: "₦97,375",
    image: "/images/products/buckets/bucket_1.jpg",
  },
  {
    id: "00006",
    name: "Satin Edge",
    category: "Interior Paint",
    subCategory: "Standard Satin",
    size: "20L",
    price: "₦95,000",
    oldPrice: "₦97,375",
    image: "/images/products/buckets/bucket_2.jpg",
  },
  {
    id: "00007",
    name: "Satin Edge",
    category: "Interior Paint",
    subCategory: "Standard Satin",
    size: "4L",
    price: "₦19,000",
    oldPrice: "₦19,475",
    image: "/images/products/buckets/bucket_2.jpg",
  },
  {
    id: "00008",
    name: "Satin Luxe",
    category: "Premium Paints",
    subCategory: "Premium Satin",
    size: "20L",
    price: "₦110,000",
    oldPrice: "₦112,750",
    image: "/images/products/buckets/bucket_2.jpg",
  },
  {
    id: "00009",
    name: "Satin Luxe",
    category: "Premium Paints",
    subCategory: "Premium Satin",
    size: "4L",
    price: "₦22,000",
    oldPrice: "₦22,550",
    image: "/images/products/buckets/bucket_2.jpg",
    badge: "Best Seller",
  },
  {
    id: "00010",
    name: "Ecomulsion",
    category: "Emulsion",
    subCategory: "Standard Emulsion",
    size: "20L",
    price: "₦25,000",
    oldPrice: "₦25,625",
    image: "/images/products/buckets/bucket_4.jpg",
  },
  {
    id: "00011",
    name: "Emulpro",
    category: "Emulsion",
    subCategory: "Premium Emulsion",
    size: "20L",
    price: "₦36,000",
    oldPrice: "₦36,900",
    image: "/images/products/buckets/bucket_2.jpg",
  },
  {
    id: "00012",
    name: "Screed Putty",
    category: "Wall Preparation",
    subCategory: "Putty",
    size: "20L",
    price: "₦28,000",
    oldPrice: "₦28,700",
    image: "/images/products/buckets/bucket_3.jpg",
    badge: "Best Seller",
  },
  {
    id: "00013",
    name: "Weather Shield",
    category: "Exterior Paint",
    subCategory: "Weather-Resistant",
    size: "20L",
    price: "₦70,000",
    oldPrice: "₦71,750",
    image: "/images/products/buckets/bucket_5.jpeg",
  },
  // {
  //   id: "00014",
  //   name: "Weather Shield",
  //   category: "Exterior Paint",
  //   subCategory: "Weather-Resistant",
  //   size: "4L",
  //   price: "₦14,000",
  //   oldPrice: "₦14,350",
  //   image: "/images/products/buckets/bucket_5.jpeg",
  // },
  {
    id: "00015",
    name: "Black Gloss",
    category: "Wood/Metal Paint",
    subCategory: "Gloss Finish",
    size: "4L",
    price: "₦24,000",
    oldPrice: "₦24,600",
    image: "/images/products/buckets/bucket_4.jpg",
  },
  {
    id: "00016",
    name: "White Gloss",
    category: "Wood/Metal Paint",
    subCategory: "Gloss Finish",
    size: "4L",
    price: "₦25,500",
    oldPrice: "₦26,138",
    image: "/images/products/buckets/bucket_4.jpg",
  },
  {
    id: "00017",
    name: "Roadmark Paint",
    category: "Industrial Paint",
    subCategory: "Road Coating",
    size: "20L",
    price: "₦155,000",
    oldPrice: "₦158,875",
    image: "/images/products/buckets/bucket_7.jpeg",
  },
  {
    id: "00018",
    name: "Roadmark Paint",
    category: "Industrial Paint",
    subCategory: "Road Coating",
    size: "4L",
    price: "₦31,000",
    oldPrice: "₦31,475",
    image: "/images/products/buckets/bucket_7.jpeg",
  },
  {
    id: "00019",
    name: "Floor Paint",
    category: "Industrial Paint",
    subCategory: "Floor Coating",
    size: "20L",
    price: "₦155,000",
    oldPrice: "₦158,875",
    image: "/images/products/buckets/bucket_4.jpg",
  },
  {
    id: "00020",
    name: "Floor Paint",
    category: "Industrial Paint",
    subCategory: "Floor Coating",
    size: "4L",
    price: "₦31,000",
    oldPrice: "₦31,475",
    image: "/images/products/buckets/bucket_4.jpg",
  },
];

export const productCategories = [
  {
    id: "interior",
    title: "Interior Paints",
    description:
      "Formulated for smooth application, elegant finishes, and long-lasting color.",
    features: [
      "Low odor & quick drying",
      "Easy to clean & maintain",
      "Rich, fade-resistant colors",
      "One-coat coverage",
      "VOC-free formulas",
    ],
    image: "/images/products/paint-2.jpg",
    cta: "Explore Interior Paints",
    popularProducts: [
      "Luxury Matte",
      "Silk Finish",
      "Washable Emulsion",
      "Eco-Friendly",
    ],
  },
  {
    id: "exterior",
    title: "Exterior Paints",
    description:
      "Durable, weather-resistant, and UV-protected for lasting protection.",
    features: [
      "Anti-fade & anti-peel technology",
      "Washable & stain-resistant",
      "Mold & mildew protection",
      "UV radiation protection",
      "Climate-adaptive formula",
    ],
    image: "/images/products/paint-3.jpg",
    cta: "Explore Exterior Paints",
    popularProducts: [
      "WeatherGuard",
      "SunShield Pro",
      "TropicalFinish",
      "All-Climate",
    ],
  },
  {
    id: "industrial",
    title: "Industrial Coatings",
    description:
      "Industrial-grade paints with strength, chemical resistance, and durability.",
    features: [
      "Excellent adhesion",
      "Chemical & heat resistance",
      "For floors, machines, and steel",
      "High-traffic endurance",
      "Corrosion protection",
    ],
    image: "/images/products/paint-4.jpg",
    cta: "Explore Industrial Paints",
    popularProducts: [
      "Heavy-Duty Epoxy",
      "Anti-Rust Pro",
      "ChemicalGuard",
      "Warehouse Floor",
    ],
  },
  {
    id: "primers",
    title: "Primers & Undercoats",
    description:
      "Ensure proper adhesion, smoother finishes, and longer-lasting coats.",
    features: [
      "Seals porous surfaces",
      "Prevents stain bleeding",
      "Enhances paint performance",
      "Universal surface preparation",
      "Quick-drying formula",
    ],
    image: "/images/products/paintbrush-2.jpg",
    cta: "Explore Primers",
    popularProducts: [
      "Wall Sealer",
      "Multi-Surface",
      "Stain Blocker",
      "Concrete Primer",
    ],
  },
];

export const quickLinks = [
  "Interior Luxury Matte",
  "WeatherGuard Exterior",
  "Nexgen Anti-Rust",
  "Heavy-Duty Epoxy Floor Paint",
  "Wall Sealer Primer",
  "Eco-Friendly Emulsion",
];

export const benefits = [
  {
    icon: <BsCheckCircle size={24} className="text-color-1" />,
    title: "Contractor Pricing",
    description:
      "Get unbeatable bulk discounts tailored to the size and frequency of your orders.",
  },
  {
    icon: <BsTruck size={24} className="text-color-1" />,
    title: "On-Time, Every Time",
    description:
      "Your project doesn't wait — we deliver to your site, store, or warehouse when you need it.",
  },
  {
    icon: <BsHeadset size={24} className="text-color-1" />,
    title: "Dedicated Support Team",
    description:
      "A real human point of contact who understands your business and goals.",
  },
  {
    icon: <BsShieldCheck size={24} className="text-color-1" />,
    title: "Paints Built for Performance",
    description:
      "Weatherproof, washable, and engineered for Nigeria's climate and standards.",
  },
  {
    icon: <BsPalette size={24} className="text-color-1" />,
    title: "Expert Guidance",
    description:
      "Free technical consultations for color scheming and product compatibility.",
  },
  {
    icon: <BsBuilding size={24} className="text-color-1" />,
    title: "Marketing Exposure",
    description:
      "Showcase your projects through our channels to grow your brand visibility.",
  },
];

export const partnerCategories = [
  "Interior & Exterior Paints",
  "Wall Sealers, Primers & Undercoats",
  "Anti-Mould & Damp-Proof Paints",
  "Industrial & High-Traffic Surface Coatings",
  "Weatherproof Finishes & Metal Coatings",
];

export const partnerTypes = [
  {
    title: "Painting Contractors & Pros",
    description:
      "Access cost-effective, premium-grade paint that makes your work stand out.",
  },
  {
    title: "Real Estate Developers",
    description:
      "Secure high-volume orders with priority fulfillment for estate or commercial projects.",
  },
  {
    title: "Construction Companies",
    description:
      "Ensure site-ready paints and finishes arrive on time, every time.",
  },
  {
    title: "Interior Designers & Architects",
    description:
      "Collaborate on custom color plans that bring your design vision to life.",
  },
];

export const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const faqCategories = [
  {
    title: "Orders & Delivery",
    icon: <BsTruck size={24} />,
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery typically takes 2–5 business days, depending on your location. For bulk or custom orders, we'll provide a delivery timeline at checkout or upon confirmation.",
      },
      {
        question: "Do you deliver nationwide?",
        answer:
          "We deliver across all 36 states of Nigeria. Delivery charges may vary by region.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely. Once your order is confirmed, you'll receive a tracking ID via SMS or email to monitor your delivery status.",
      },
    ],
  },
  {
    title: "Color Matching & Selection",
    icon: <BsPalette size={24} />,
    items: [
      {
        question: "Can you match a specific color?",
        answer:
          "Yes, we offer professional color matching. Share a photo or sample with us, and our team will recreate the shade as closely as possible.",
      },
      {
        question: "How do I choose the right color?",
        answer:
          "Use our Color Selector Tool or book a free consultation with our color experts for personalized advice based on your space and lighting.",
      },
      {
        question: "Can I get a sample before buying in full?",
        answer:
          "Yes, we offer small-size sample pots for selected products so you can test the color before committing.",
      },
    ],
  },
  {
    title: "Product Information",
    icon: <BsPaintBucket size={24} />,
    items: [
      {
        question: "Are Nexgen Paints washable?",
        answer:
          "Yes. Many of our interior paints are washable and stain-resistant, especially those in our Premium and Elite ranges.",
      },
      {
        question: "Do you offer weather-resistant or waterproof paints?",
        answer:
          "Absolutely. Our exterior paint line is designed to withstand harsh weather conditions, and we have waterproof coatings for added protection.",
      },
      {
        question: "What surfaces can I paint with Nexgen products?",
        answer:
          "We offer solutions for walls, ceilings, wood, metal, concrete, industrial floors, and more. Check each product label or ask our support team.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    icon: <BsArrowReturnLeft size={24} />,
    items: [
      {
        question: "Can I return paint if I don't like the color?",
        answer:
          "Unfortunately, custom-mixed or opened paint cannot be returned. However, if there's an error on our part, we'll correct it.",
      },
      {
        question: "What if my product arrives damaged?",
        answer:
          "If your item arrives damaged, please contact us within 24 hours with photos, and we'll arrange a replacement.",
      },
      {
        question: "How do I cancel or change an order?",
        answer:
          "Contact us within 12 hours of placing your order. Once your order is in production or shipped, changes may not be possible.",
      },
    ],
  },
  {
    title: "Partnership & Support",
    icon: <FaHandshakeSimple size={24} />,
    items: [
      {
        question: "Do you offer discounts for bulk purchases or professionals?",
        answer:
          "Yes. Visit our Construction Partnership page or contact us directly to discuss custom pricing for contractors, painters, and developers.",
      },
      {
        question: "How do I become a distributor?",
        answer:
          "Fill out the Distributor Application Form and our team will get in touch within 48 hours.",
      },
    ],
  },
];

export const Distributorbenefits = [
  {
    icon: <BsLightning size={32} className="text-primary" />,
    title: "Fast-Moving Products",
    description:
      "Premium quality, affordability, and beautiful finishes make Nexgen a favorite among professionals and homeowners.",
  },
  {
    icon: <BsTag size={32} className="text-primary" />,
    title: "Competitive Wholesale Prices",
    description:
      "Exclusive distributor discounts that give you an edge in your local market.",
  },
  {
    icon: <BsTruck size={32} className="text-primary" />,
    title: "Reliable Delivery",
    description:
      "On-time delivery to your shop or warehouse so you never run out of stock.",
  },
  {
    icon: <BsMegaphone size={32} className="text-primary" />,
    title: "Marketing & Brand Support",
    description:
      "Free promotional materials and digital exposure to boost your sales.",
  },
  {
    icon: <BsGraphUp size={32} className="text-primary" />,
    title: "Lucrative Profits",
    description:
      "High demand and flexible reorder quantities help grow your revenue steadily.",
  },
];

export const productRange = [
  "Interior & Exterior Paints",
  "Primers & Undercoats",
  "Industrial Coatings",
  "Anti-Mould & Waterproof Paints",
  "Specialty Finishes & More",
];

export const eligibleApplicants = [
  "Paint and building materials store owners",
  "Hardware retailers",
  "Paint sellers in open markets",
  "Bulk supply agents",
  "Business-minded individuals in construction",
];

export const steps = [
  "Fill out the distributor application form",
  "Our team will contact you within 72 hours",
  "Receive distributor package and starter support",
];
