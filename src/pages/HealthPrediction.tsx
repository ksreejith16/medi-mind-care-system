
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Activity, Thermometer, Monitor, User, Scale, Ruler } from "lucide-react";
import { toast } from "sonner";

const HealthPrediction = () => {
  const [formData, setFormData] = useState({
    heartRate: "",
    respiratoryRate: "",
    bodyTemperature: "",
    oxygenSaturation: "",
    systolic: "",
    diastolic: "",
    age: "",
    gender: "0", // 0 for Female, 1 for Male
    weight: "",
    height: "",
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Placeholder for API call
      // This is where you'll integrate with your Python backend API
      const features = [
        parseFloat(formData.heartRate),
        parseFloat(formData.respiratoryRate),
        parseFloat(formData.bodyTemperature),
        parseFloat(formData.oxygenSaturation),
        parseFloat(formData.systolic),
        parseFloat(formData.diastolic),
        parseFloat(formData.age),
        parseInt(formData.gender),
        parseFloat(formData.weight),
        parseFloat(formData.height),
      ];

      // Temporary simulation of prediction
      setTimeout(() => {
        setPrediction("Based on the vital signs provided, you appear to be in normal health condition. Note: This is a placeholder prediction. Please connect to the actual ML model API for accurate results.");
        setLoading(false);
        toast.success("Health prediction completed");
      }, 1500);
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to generate prediction");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Health Risk Prediction</h1>
            <p className="mt-4 text-xl text-gray-500">
              Enter your vital signs for an AI-powered health risk assessment
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Your Health Data</CardTitle>
              <CardDescription>
                Please provide accurate measurements for the best prediction results
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-health-600" />
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
                      <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                    </div>
                    <Input
                      id="respiratoryRate"
                      name="respiratoryRate"
                      type="number"
                      placeholder="12-20"
                      value={formData.respiratoryRate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-5 w-5 text-health-600" />
                      <Label htmlFor="bodyTemperature">Body Temperature (°C)</Label>
                    </div>
                    <Input
                      id="bodyTemperature"
                      name="bodyTemperature"
                      type="number"
                      step="0.1"
                      placeholder="36.5-37.5"
                      value={formData.bodyTemperature}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-5 w-5 text-health-600" />
                      <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
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

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-health-600" />
                      <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
                    </div>
                    <Input
                      id="systolic"
                      name="systolic"
                      type="number"
                      placeholder="90-120"
                      value={formData.systolic}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-health-600" />
                      <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
                    </div>
                    <Input
                      id="diastolic"
                      name="diastolic"
                      type="number"
                      placeholder="60-80"
                      value={formData.diastolic}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-health-600" />
                      <Label>Gender</Label>
                    </div>
                    <RadioGroup value={formData.gender} onValueChange={handleGenderChange}>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-health-600" />
                      <Label htmlFor="age">Age (years)</Label>
                    </div>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="18-100"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Scale className="h-5 w-5 text-health-600" />
                      <Label htmlFor="weight">Weight (kg)</Label>
                    </div>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      placeholder="40-150"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Ruler className="h-5 w-5 text-health-600" />
                      <Label htmlFor="height">Height (m)</Label>
                    </div>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      step="0.01"
                      placeholder="1.50-2.20"
                      value={formData.height}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Analyzing..." : "Predict Health Risk"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {prediction && (
            <Card className="border-health-200 bg-health-50">
              <CardHeader>
                <CardTitle className="text-health-700">Health Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{prediction}</p>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                <p>
                  This prediction is based on the vital signs you provided. Always consult with a healthcare professional for accurate medical advice.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HealthPrediction;
