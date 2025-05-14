import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

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
      { text: "Help Center", url: "#" },
      { text: "FAQs", url: "#" },
      { text: "Color Guides", url: "#" },
      { text: "Application Tips", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About Us", url: "#" },
      { text: "Our Technology", url: "#" },
      { text: "Sustainability", url: "#" },
      { text: "Careers", url: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Terms of Service", url: "#" },
      { text: "Privacy Policy", url: "#" },
      { text: "Product Warranty", url: "#" },
      { text: "Compliance", url: "#" },
    ],
  },
];

export const contactInfo = {
  title: "Contact",
  details: [
    "12 Industrial Road",
    "Lagos, Nigeria",
    "info@nexgenpaint.com",
    "+234 800 000 0000",
  ],
};

export const bottomLinks = [
  { text: "Accessibility", url: "#" },
  { text: "Sitemap", url: "#" },
  { text: "Patents", url: "#" },
];

export const navItems = [
  { name: "Home", path: "/", matchExact: true },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/projects", matchStartsWith: true },
  { name: "Contact Us", path: "/contact" },
];

export const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
