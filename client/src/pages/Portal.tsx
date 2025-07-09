import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, Settings, LogOut, Home } from 'lucide-react';
import { format } from 'date-fns';
import logoImage from '@assets/image_1752028917776.png';
import type { Project, MaintenanceSchedule } from '@shared/schema';

export default function Portal() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setLocation('/login');
    }
  }, [setLocation]);

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects', user?.id],
    enabled: !!user?.id,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: upcomingData, isLoading: upcomingLoading } = useQuery({
    queryKey: ['/api/maintenance/upcoming', user?.id],
    enabled: !!user?.id,
    refetchInterval: 30000,
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLocation('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'quote_requested': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'quote_approved': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'on_hold': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const projects = projectsData?.projects || [];
  const upcoming = upcomingData?.upcoming || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={logoImage} alt="L&M Landscape Maintenance" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold text-green-800">Client Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLocation('/')}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Back to Website</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Dashboard Overview</h2>
            <p className="text-gray-600">
              Track your landscaping projects and maintenance schedules all in one place.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-green-800">
                    {projects.filter(p => p.status === 'in_progress').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-green-800">{projects.length}</p>
                </div>
                <Settings className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Maintenance</p>
                  <p className="text-2xl font-bold text-green-800">{upcoming.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Projects</span>
              </CardTitle>
              <CardDescription>Track your landscaping project progress</CardDescription>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No projects yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Contact us to start your first landscaping project
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.slice(0, 5).map((project: Project) => (
                    <div key={project.id} className="border rounded-lg p-4 hover:bg-green-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{project.serviceType}</p>
                          {project.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                          )}
                        </div>
                        <Badge className={`ml-2 ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {project.startDate && (
                            <span>Start: {format(new Date(project.startDate), 'MMM d, yyyy')}</span>
                          )}
                          {project.estimatedCost && (
                            <span>Est: ${project.estimatedCost}</span>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setLocation(`/portal/projects/${project.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Maintenance */}
          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Upcoming Maintenance</span>
              </CardTitle>
              <CardDescription>Your scheduled maintenance services</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading maintenance...</p>
                </div>
              ) : upcoming.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No upcoming maintenance</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Schedule regular maintenance to keep your landscape healthy
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((schedule: MaintenanceSchedule) => (
                    <div key={schedule.id} className="border rounded-lg p-4 hover:bg-green-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{schedule.serviceType}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Every {schedule.frequency}
                          </p>
                          {schedule.description && (
                            <p className="text-sm text-gray-500 mt-1">{schedule.description}</p>
                          )}
                        </div>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                          {format(new Date(schedule.nextDate), 'MMM d, yyyy')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setLocation('/portal/projects')}
          >
            View All Projects
          </Button>
          <Button 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => setLocation('/portal/maintenance')}
          >
            Manage Maintenance
          </Button>
        </div>
      </main>
    </div>
  );
}