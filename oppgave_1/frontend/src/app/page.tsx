import SignUp from "@/components/SignUp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="h-full">
      <Navbar />
      <SignUp />
      <Footer />
    </main>
  );
}

import React from "react";
import Navbar from "@/components/Navbar";
