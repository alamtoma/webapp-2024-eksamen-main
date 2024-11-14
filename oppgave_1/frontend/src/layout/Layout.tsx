import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <div
      className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
      data-testid="layout"
    >
      <Navbar />
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;