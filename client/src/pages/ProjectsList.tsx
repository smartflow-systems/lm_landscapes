import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, FileText, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import logoImage from '@assets/image_1752028917776.png';
import type { Project } from '@shared/schema';

export default function ProjectsList() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [, setLocation] = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setLocation('/login');
    }
  }, [setLocation]);

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['/api/projects', user?.id],
    enabled: !!user?.id,
  });

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

  const projects = projectsData?.projects || [];
  
  const filteredProjects = projects.filter((project: Project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/portal')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <img src={logoImage} alt="L&M Landscape Maintenance" className="h-8 w-auto" />
              <h1 className="text-xl font-bold text-green-800">My Projects</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search & Filter</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search projects by title, service type, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="md:w-64">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="quote_requested">Quote Requested</SelectItem>
                      <SelectItem value="quote_approved">Quote Approved</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card className="bg-white border-green-200">
              <CardContent className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'No projects found' : 'No projects yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Contact us to start your first landscaping project with L&M Landscape Maintenance.'}
                </p>
                {searchTerm || statusFilter !== 'all' ? (
                  <Button 
                    variant="outline" 
                    onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setLocation('/')}
                  >
                    Get Started
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
                </h2>
              </div>
              
              <div className="grid gap-6">
                {filteredProjects.map((project: Project) => (
                  <Card key={project.id} className="bg-white border-green-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-green-600 font-medium mb-2">{project.serviceType}</p>
                          {project.description && (
                            <p className="text-gray-600 mb-4">{project.description}</p>
                          )}
                        </div>
                        <Badge className={`ml-4 ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {project.startDate && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Start: {format(new Date(project.startDate), 'MMM d, yyyy')}</span>
                          </div>
                        )}
                        {project.endDate && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>End: {format(new Date(project.endDate), 'MMM d, yyyy')}</span>
                          </div>
                        )}
                        {project.estimatedCost && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>Est: ${project.estimatedCost}</span>
                          </div>
                        )}
                      </div>

                      {project.notes && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Notes:</h4>
                          <p className="text-sm text-gray-600">{project.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Created: {format(new Date(project.createdAt), 'MMM d, yyyy')}
                        </div>
                        <Button 
                          onClick={() => setLocation(`/portal/projects/${project.id}`)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}