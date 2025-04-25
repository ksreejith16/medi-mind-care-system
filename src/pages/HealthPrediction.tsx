
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Activity, Thermometer, Pulse } from "lucide-react";

const HealthPrediction = () => {
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    temperature: "",
    oxygenSaturation: "",
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Placeholder for ML model integration
    // This is where you'll integrate your Jupyter notebook code
    setTimeout(() => {
      setPrediction("Based on the provided vital signs, you appear to be in normal health condition. Continue monitoring your blood pressure as it's slightly elevated.");
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Health Prediction</h1>
            <p className="mt-4 text-xl text-gray-500">
              Enter your vital signs to get AI-powered health predictions
            </p>
          </div>

          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Enter Your Vital Signs</CardTitle>
              <CardDescription>
                Please provide accurate measurements for the best prediction results
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Pulse className="h-5 w-5 text-health-600" />
                      <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                    </div>
                    <Input
                      id="heartRate"
                      name="heartRate"
                      type="number"
                      placeholder="60-100"
                      value={formData.heartRate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-health-600" />
                      <Label htmlFor="bloodPressureSystolic">Blood Pressure (Systolic)</Label>
                    </div>
                    <Input
                      id="bloodPressureSystolic"
                      name="bloodPressureSystolic"
                      type="number"
                      placeholder="90-120"
                      value={formData.bloodPressureSystolic}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-health-600" />
                      <Label htmlFor="bloodPressureDiastolic">Blood Pressure (Diastolic)</Label>
                    </div>
                    <Input
                      id="bloodPressureDiastolic"
                      name="bloodPressureDiastolic"
                      type="number"
                      placeholder="60-80"
                      value={formData.bloodPressureDiastolic}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-5 w-5 text-health-600" />
                      <Label htmlFor="temperature">Body Temperature (°C)</Label>
                    </div>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      step="0.1"
                      placeholder="36.5-37.5"
                      value={formData.temperature}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-health-600" />
                      <Label htmlFor="oxygenSaturation">Oxygen Saturation (SpO2 %)</Label>
                    </div>
                    <Input
                      id="oxygenSaturation"
                      name="oxygenSaturation"
                      type="number"
                      placeholder="95-100"
                      value={formData.oxygenSaturation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Analyzing..." : "Predict Health Condition"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {prediction && (
            <Card className="border-health-200 bg-health-50 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-health-700">Health Prediction Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{prediction}</p>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                <p>
                  This prediction is based on the vital signs you provided. Always consult with a healthcare professional for accurate diagnosis.
                </p>
              </CardFooter>
            </Card>
          )}

          <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Integration Notes</h3>
            <p className="mt-2 text-gray-600">
              This is where you'll integrate your ML model from the Jupyter notebook. 
              The form collects vital health data and sends it to your prediction model, 
              which will return a health condition assessment.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthPrediction;
