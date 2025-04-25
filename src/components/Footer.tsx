
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-health-600" />
            <span className="text-lg font-semibold text-health-700">MediMind</span>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} MediMind. All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-health-600 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-health-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-health-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
