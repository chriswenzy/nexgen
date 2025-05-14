"use client"; // Add this if using Next.js App Router (app directory)

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter(); // For Next.js navigation

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      setAuthUser(token);
      if (!token) {
        toast.error("Please login to proceed");
        router.push("/"); // Redirect if no token
      }
    }
  }, []);

  if (!authUser) return null; // Prevent rendering until authentication is checked

  return children;
};

export default ProtectedRoute;
