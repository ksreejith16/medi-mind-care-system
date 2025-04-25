
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital, MapPin, Phone, AlertTriangle, Clock } from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  distance: string;
  address: string;
  phone: string;
  emergencyServices: string[];
  waitTime?: string;
}

const mockHospitals: Hospital[] = [
  {
    id: 1,
    name: "City General Hospital",
    distance: "1.2 km",
    address: "123 Main Street, Downtown",
    phone: "555-123-4567",
    emergencyServices: ["24/7 Emergency Room", "Trauma Center", "Cardiac Care"],
    waitTime: "15 mins",
  },
  {
    id: 2,
    name: "Memorial Medical Center",
    distance: "3.5 km",
    address: "456 Oak Avenue, Westside",
    phone: "555-987-6543",
    emergencyServices: ["24/7 Emergency Room", "Pediatric ER", "Stroke Center"],
    waitTime: "25 mins",
  },
  {
    id: 3,
    name: "University Health Center",
    distance: "5.1 km",
    address: "789 University Blvd, Eastside",
    phone: "555-456-7890",
    emergencyServices: ["24/7 Emergency Room", "Level 1 Trauma Center", "Burn Unit"],
    waitTime: "10 mins",
  },
];

const EmergencyPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleFindNearbyHospitals = () => {
    setIsLocating(true);
    setLocationError(null);
    
    // Simulating geolocation and API call
    // This is where you'll integrate your location-based hospital finder code
    setTimeout(() => {
      // Mock successful response
      setIsLocating(false);
      // setHospitals would normally be updated with real data from your API
    }, 2000);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Emergency Services</h1>
            <p className="mt-4 text-xl text-gray-500">
              Find nearby hospitals and emergency services
            </p>
          </div>
          
          <div className="bg-emergency-600 text-white p-6 rounded-lg mb-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-2xl font-bold">In case of emergency</h2>
            </div>
            <p className="mb-4">
              If you are experiencing a life-threatening emergency, please dial your local emergency number immediately.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" variant="outline" className="bg-white text-emergency-600 hover:bg-emergency-50 border-white">
                <Phone className="mr-2 h-5 w-5" />
                Call Emergency (911)
              </Button>
              <Button size="lg" onClick={handleFindNearbyHospitals} disabled={isLocating}>
                <MapPin className="mr-2 h-5 w-5" />
                {isLocating ? "Locating..." : "Find Nearby Hospitals"}
              </Button>
            </div>
          </div>
          
          {locationError && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6 rounded">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <p>{locationError}</p>
              </div>
              <p className="mt-2 text-sm">
                Please ensure location services are enabled in your browser and try again.
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Nearby Hospitals</h3>
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <span className="text-sm bg-health-100 text-health-800 px-2 py-1 rounded-full">
                      {hospital.distance}
                    </span>
                  </div>
                  <CardDescription>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hospital.address}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{hospital.phone}</span>
                    </div>
                    {hospital.waitTime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Estimated wait time: <strong>{hospital.waitTime}</strong></span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hospital.emergencyServices.map((service, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-2 w-full">
                    <Button variant="outline" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button className="flex-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Integration Notes</h3>
            <p className="mt-2 text-gray-600">
              This is where you'll integrate your location-based hospital finder code. 
              The interface displays nearby emergency facilities and provides contact information.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyPage;
