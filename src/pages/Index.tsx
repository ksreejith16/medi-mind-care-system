
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatSection from "@/components/StatSection";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <StatSection />
      <TestimonialsSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
