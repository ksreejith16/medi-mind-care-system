
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital, MapPin, Phone, AlertTriangle, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Hospital {
  id: string;
  name: string;
  distance?: string;
  address?: string;
  lat?: number;
  lon?: number;
}

const EmergencyPage = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  const getNearbyHospitals = async (lat: number, lon: number) => {
    try {
      const radius = 2000; // in meters
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lon});
          way["amenity"="hospital"](around:${radius},${lat},${lon});
          relation["amenity"="hospital"](around:${radius},${lat},${lon});
        );
        out center;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      const nearbyHospitals = data.elements.map((hospital: any) => ({
        id: hospital.id.toString(),
        name: hospital.tags.name || "Unnamed Hospital",
        lat: hospital.lat || hospital.center?.lat,
        lon: hospital.lon || hospital.center?.lon,
        address: hospital.tags.address || "Address unavailable",
        distance: "Calculating..."
      }));

      setHospitals(nearbyHospitals);
      toast.success(`Found ${nearbyHospitals.length} nearby hospitals`);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setLocationError("Error fetching nearby hospitals. Please try again.");
      toast.error("Failed to find nearby hospitals");
    }
  };

  const handleFindNearbyHospitals = () => {
    setIsLocating(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setUserLocation({ lat, lon });
        getNearbyHospitals(lat, lon);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Unable to access location. Please enable location services.");
        setIsLocating(false);
        toast.error("Location access denied");
      }
    );
  };

  const getDirectionsUrl = (hospital: Hospital) => {
    if (hospital.lat && hospital.lon) {
      return `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`;
    }
    return "#";
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
              <Button 
                size="lg" 
                onClick={handleFindNearbyHospitals} 
                disabled={isLocating}
              >
                {isLocating ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <MapPin className="mr-2 h-5 w-5" />
                )}
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
            </div>
          )}
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Nearby Hospitals</h3>
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <Card key={hospital.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    </div>
                    {hospital.address && (
                      <CardDescription>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hospital.address}
                        </div>
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardFooter>
                    <div className="flex space-x-2 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.open(getDirectionsUrl(hospital), '_blank')}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Get Directions
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">
                    {isLocating ? "Searching for nearby hospitals..." : "Click 'Find Nearby Hospitals' to see available emergency facilities in your area"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyPage;
