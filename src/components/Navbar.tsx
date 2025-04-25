
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Nutrition, MessageSquare, Hospital, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-health-600" />
              <span className="font-bold text-xl text-health-700">MediMind</span>
            </Link>
          </div>
          
          {!isMobile ? (
            <div className="flex items-center space-x-4">
              <NavLink to="/" icon={<Home className="h-4 w-4" />} label="Home" />
              <NavLink to="/prediction" icon={<Heart className="h-4 w-4" />} label="Health Prediction" />
              <NavLink to="/nutrition" icon={<Nutrition className="h-4 w-4" />} label="Nutrition" />
              <NavLink to="/chatbot" icon={<MessageSquare className="h-4 w-4" />} label="AI Assistant" />
              <NavLink to="/emergency" icon={<Hospital className="h-4 w-4" />} label="Emergency" />
            </div>
          ) : (
            <div className="flex md:hidden">
              <MobileNavigation />
            </div>
          )}
        </div>
      </div>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">
          <MobileNavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" />
          <MobileNavItem to="/prediction" icon={<Heart className="h-5 w-5" />} label="Predict" />
          <MobileNavItem to="/nutrition" icon={<Nutrition className="h-5 w-5" />} label="Nutrition" />
          <MobileNavItem to="/chatbot" icon={<MessageSquare className="h-5 w-5" />} label="Chat" />
          <MobileNavItem to="/emergency" icon={<Hospital className="h-5 w-5" />} label="Emergency" />
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const NavLink = ({ to, icon, label }: NavLinkProps) => {
  return (
    <Link to={to}>
      <Button variant="ghost" className="flex items-center space-x-1">
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const MobileNavigation = () => {
  return (
    <Button variant="ghost" size="icon">
      <span className="sr-only">Open menu</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </Button>
  );
};

const MobileNavItem = ({ to, icon, label }: NavLinkProps) => {
  return (
    <Link to={to} className="flex flex-col items-center justify-center px-2">
      <div className="text-health-600">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Navbar;
