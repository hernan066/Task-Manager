import type { NextPage } from "next";

import { Layout } from "../components/layouts";
import { MainContent } from "../components/home/main/MainContent";
import { AnimatePresence } from "framer-motion";


const HomePage: NextPage = () => {
  
  
  
  return (
    <Layout title="Home - Task Manager">
      <AnimatePresence exitBeforeEnter>
        <div className="main-container">
          <MainContent  />
        </div>
      </AnimatePresence>
    </Layout>
  );
};

export default HomePage;
