
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  className?: string;
}

const FeatureCard = ({ title, description, icon, to, className }: FeatureCardProps) => {
  return (
    <Card className={cn("feature-card", className)}>
      <CardHeader>
        <div className="mb-4 flex justify-center">
          <div className="feature-icon">{icon}</div>
        </div>
        <CardTitle className="text-center text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button asChild>
          <Link to={to}>Explore</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
