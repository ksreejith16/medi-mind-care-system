
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Clock, Activity } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Active Users",
    value: "10,000+",
    icon: <Users className="h-6 w-6 text-health-600" />,
    description: "Trusted by thousands worldwide",
  },
  {
    id: 2,
    name: "Health Predictions",
    value: "95%",
    icon: <Heart className="h-6 w-6 text-health-600" />,
    description: "Accuracy in health assessments",
  },
  {
    id: 3,
    name: "Available",
    value: "24/7",
    icon: <Clock className="h-6 w-6 text-health-600" />,
    description: "Round-the-clock assistance",
  },
  {
    id: 4,
    name: "Health Metrics",
    value: "50+",
    icon: <Activity className="h-6 w-6 text-health-600" />,
    description: "Comprehensive monitoring",
  },
];

const StatSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.id} className="border-none shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{stat.icon}</div>
                <div className="font-bold text-4xl text-health-700">{stat.value}</div>
                <div className="font-semibold text-gray-700">{stat.name}</div>
                <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatSection;
