import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';
import { Leaf, Droplets, Recycle, TreePine, Sun } from 'lucide-react';

interface SustainabilityAssessmentProps {
  projectId: number;
}

interface AssessmentData {
  waterEfficiencyScore: number;
  biodiversityScore: number;
  carbonFootprintScore: number;
  soilHealthScore: number;
  wasteReductionScore: number;
  nativePlants: boolean;
  droughtResistantPlants: boolean;
  rainwaterHarvesting: boolean;
  solarLighting: boolean;
  compostSystem: boolean;
  permaculture: boolean;
  organicMaterials: boolean;
  wildlifeHabitat: boolean;
  recommendations?: string;
  improvementSuggestions?: string;
}

export default function SustainabilityAssessment({ projectId }: SustainabilityAssessmentProps) {
  const queryClient = useQueryClient();
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    waterEfficiencyScore: 50,
    biodiversityScore: 50,
    carbonFootprintScore: 50,
    soilHealthScore: 50,
    wasteReductionScore: 50,
    nativePlants: false,
    droughtResistantPlants: false,
    rainwaterHarvesting: false,
    solarLighting: false,
    compostSystem: false,
    permaculture: false,
    organicMaterials: false,
    wildlifeHabitat: false,
  });

  // Get existing assessment
  const { data: existingAssessment, isLoading } = useQuery({
    queryKey: [`/api/projects/${projectId}/sustainability`],
    retry: false,
  });

  // Calculate score mutation
  const calculateMutation = useMutation({
    mutationFn: async (data: AssessmentData) => {
      return await apiRequest(`/api/sustainability/calculate`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  });

  // Save assessment mutation
  const saveMutation = useMutation({
    mutationFn: async (data: AssessmentData) => {
      const method = existingAssessment ? 'PUT' : 'POST';
      return await apiRequest(`/api/projects/${projectId}/sustainability`, {
        method,
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/sustainability`] });
    },
  });

  const handleSliderChange = (field: keyof AssessmentData, value: number[]) => {
    setAssessmentData(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleSwitchChange = (field: keyof AssessmentData, checked: boolean) => {
    setAssessmentData(prev => ({ ...prev, [field]: checked }));
  };

  const handleCalculate = async () => {
    await calculateMutation.mutateAsync(assessmentData);
  };

  const handleSave = async () => {
    await saveMutation.mutateAsync(assessmentData);
  };

  const getCertificationColor = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-orange-100 text-orange-800 border-orange-300';
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading sustainability assessment...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Eco-Friendly Sustainability Assessment
          </CardTitle>
          <CardDescription>
            Evaluate the environmental impact and sustainability of your landscape design
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                Water Efficiency Score: {assessmentData.waterEfficiencyScore}
              </Label>
              <Slider
                value={[assessmentData.waterEfficiencyScore]}
                onValueChange={(value) => handleSliderChange('waterEfficiencyScore', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <TreePine className="h-4 w-4 text-green-500" />
                Biodiversity Score: {assessmentData.biodiversityScore}
              </Label>
              <Slider
                value={[assessmentData.biodiversityScore]}
                onValueChange={(value) => handleSliderChange('biodiversityScore', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                Carbon Footprint Score: {assessmentData.carbonFootprintScore}
              </Label>
              <Slider
                value={[assessmentData.carbonFootprintScore]}
                onValueChange={(value) => handleSliderChange('carbonFootprintScore', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-brown-500" />
                Soil Health Score: {assessmentData.soilHealthScore}
              </Label>
              <Slider
                value={[assessmentData.soilHealthScore]}
                onValueChange={(value) => handleSliderChange('soilHealthScore', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-green-500" />
                Waste Reduction Score: {assessmentData.wasteReductionScore}
              </Label>
              <Slider
                value={[assessmentData.wasteReductionScore]}
                onValueChange={(value) => handleSliderChange('wasteReductionScore', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Eco-Friendly Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Eco-Friendly Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'nativePlants', label: 'Native Plants' },
                { key: 'droughtResistantPlants', label: 'Drought Resistant Plants' },
                { key: 'rainwaterHarvesting', label: 'Rainwater Harvesting' },
                { key: 'solarLighting', label: 'Solar Lighting' },
                { key: 'compostSystem', label: 'Compost System' },
                { key: 'permaculture', label: 'Permaculture Design' },
                { key: 'organicMaterials', label: 'Organic Materials' },
                { key: 'wildlifeHabitat', label: 'Wildlife Habitat' },
              ].map((feature) => (
                <div key={feature.key} className="flex items-center space-x-2">
                  <Switch
                    id={feature.key}
                    checked={assessmentData[feature.key as keyof AssessmentData] as boolean}
                    onCheckedChange={(checked) => handleSwitchChange(feature.key as keyof AssessmentData, checked)}
                  />
                  <Label htmlFor={feature.key}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea
                id="recommendations"
                placeholder="Enter sustainability recommendations..."
                value={assessmentData.recommendations || ''}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, recommendations: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="improvements">Improvement Suggestions</Label>
              <Textarea
                id="improvements"
                placeholder="Enter suggestions for improving sustainability..."
                value={assessmentData.improvementSuggestions || ''}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, improvementSuggestions: e.target.value }))}
              />
            </div>
          </div>

          {/* Calculate and Save Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handleCalculate} 
              disabled={calculateMutation.isPending}
              variant="outline"
            >
              {calculateMutation.isPending ? 'Calculating...' : 'Calculate Score'}
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saveMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {saveMutation.isPending ? 'Saving...' : 'Save Assessment'}
            </Button>
          </div>

          {/* Results */}
          {calculateMutation.data && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-green-600" />
                    Sustainability Score
                  </span>
                  <Badge className={getCertificationColor(calculateMutation.data.certificationLevel)}>
                    {calculateMutation.data.certificationLevel}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600">
                    {calculateMutation.data.overallScore}/100
                  </div>
                  <p className="text-gray-600">Overall Sustainability Score</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{calculateMutation.data.breakdown.waterEfficiency}</div>
                    <div className="text-gray-600">Water</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{calculateMutation.data.breakdown.biodiversity}</div>
                    <div className="text-gray-600">Biodiversity</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{calculateMutation.data.breakdown.carbonFootprint}</div>
                    <div className="text-gray-600">Carbon</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-brown-600">{calculateMutation.data.breakdown.soilHealth}</div>
                    <div className="text-gray-600">Soil</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{calculateMutation.data.breakdown.wasteReduction}</div>
                    <div className="text-gray-600">Waste</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Assessment Display */}
          {existingAssessment && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Assessment</span>
                  <Badge className={getCertificationColor(existingAssessment.certificationLevel)}>
                    {existingAssessment.certificationLevel}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {existingAssessment.overallScore}/100
                  </div>
                  <p className="text-gray-600">Saved Sustainability Score</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}