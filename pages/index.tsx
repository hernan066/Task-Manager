import type { NextPage } from "next";

import { Layout } from "../components/layouts";
import { MainContent } from "../components/home/main/MainContent";




const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <div className="main-container">
        <MainContent />
      </div>
    </Layout>
  );
};

export default HomePage;
