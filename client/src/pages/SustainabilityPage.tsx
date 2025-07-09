import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SustainabilityAssessment from '@/components/SustainabilityAssessment';
import { ArrowLeft, Leaf, Award, TreePine, Droplets } from 'lucide-react';

export default function SustainabilityPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Mock user ID - in real app this would come from auth
  const userId = 1;

  // Get user's projects
  const { data: projects, isLoading } = useQuery({
    queryKey: [`/api/projects/${userId}`],
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-6xl mx-auto pt-8">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/portal">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Leaf className="h-8 w-8 text-green-600" />
              Eco-Friendly Sustainability Scoring
            </h1>
            <p className="text-gray-600 mt-2">
              Assess and improve the environmental impact of your landscape designs
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader className="text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Certification Levels</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">Platinum 90+</Badge>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Gold 80+</Badge>
              <Badge className="bg-gray-100 text-gray-800 border-gray-300">Silver 70+</Badge>
              <Badge className="bg-orange-100 text-orange-800 border-orange-300">Bronze &lt;70</Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader className="text-center">
              <TreePine className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Track water efficiency, biodiversity, carbon footprint, soil health, and waste reduction across your landscape projects.
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader className="text-center">
              <Droplets className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Eco-Features</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Get bonus points for native plants, rainwater harvesting, solar lighting, composting, and wildlife habitats.
            </CardContent>
          </Card>
        </div>

        {!selectedProjectId ? (
          // Project Selection
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Select a Project to Assess</CardTitle>
              <CardDescription>
                Choose one of your projects to create or view its sustainability assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project: any) => (
                    <Card 
                      key={project.id} 
                      className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-green-300"
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>
                          {project.serviceType} • {project.status}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Leaf className="h-4 w-4 mr-2" />
                          Assess Sustainability
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TreePine className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No projects found. Create a project first to assess its sustainability.</p>
                  <Link href="/portal/projects">
                    <Button className="mt-4" variant="outline">
                      View Projects
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          // Sustainability Assessment
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedProjectId(null)}
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
              <h2 className="text-xl font-semibold">
                Project Assessment
              </h2>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <SustainabilityAssessment projectId={selectedProjectId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}