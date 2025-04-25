
import { Heart, Apple, MessageSquare, Hospital } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive health management tools powered by artificial intelligence.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Health Prediction"
            description="AI-powered analysis of your vital signs to predict potential health conditions."
            icon={<Heart className="h-6 w-6" />}
            to="/prediction"
          />
          <FeatureCard
            title="Food Recommendations"
            description="Personalized nutrition guidance based on your health profile and dietary needs."
            icon={<Apple className="h-6 w-6" />}
            to="/nutrition"
          />
          <FeatureCard
            title="AI Health Assistant"
            description="24/7 chatbot for health queries, symptom assessment, and medical advice."
            icon={<MessageSquare className="h-6 w-6" />}
            to="/chatbot"
          />
          <FeatureCard
            title="Emergency Services"
            description="Quick access to nearby hospitals and emergency contacts when you need them most."
            icon={<Hospital className="h-6 w-6" />}
            to="/emergency"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
