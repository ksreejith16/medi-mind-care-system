
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-health-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-health-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to take control of your health?
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-health-100">
                Start using MediMind today and experience the power of AI-assisted healthcare management. 
                Your personal health companion is just a click away.
              </p>
            </div>
            <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1 lg:flex lg:items-center lg:justify-end">
              <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <Button asChild size="lg" className="bg-white text-health-600 hover:bg-health-50 hover:text-health-700">
                  <Link to="/prediction">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-health-700">
                  <Link to="/chatbot">Talk to AI Assistant</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
