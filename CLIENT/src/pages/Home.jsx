import React from "react";

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import SubCategories from "../components/SubCategories";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <Slider />
      <SubCategories />
      <Products />

      <Footer />
    </div>
  );
};

export default Home;
