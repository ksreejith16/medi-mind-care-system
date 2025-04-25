
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in">
              <div>
                <div className="inline-block mb-4 p-2 rounded-full bg-health-100 text-health-800">
                  <span className="text-sm font-medium">Your Personal Healthcare Companion</span>
                </div>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Welcome to</span>
                <span className="block text-health-600">MediMind AI</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
                Your personalized AI doctor assistant that helps you monitor health conditions, 
                recommends nutritious food based on your profile, provides health advice, 
                and assists in emergencies.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/prediction">Get Started</Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link to="/emergency">Emergency</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
        <div className="h-56 w-full bg-health-100 sm:h-72 md:h-96 lg:w-full lg:h-full relative overflow-hidden">
          <div className="absolute inset-0 health-gradient opacity-20"></div>
          <svg
            className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="pattern-squares"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="rgba(14, 165, 233, 0.2)" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#pattern-squares)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl text-health-600 opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
