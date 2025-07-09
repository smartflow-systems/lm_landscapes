import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Settings, CheckCircle } from 'lucide-react';
import { format, addDays, addWeeks, addMonths, addYears } from 'date-fns';
import logoImage from '@assets/image_1752028917776.png';
import type { MaintenanceSchedule } from '@shared/schema';

export default function MaintenancePage() {
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

  const { data: maintenanceData, isLoading } = useQuery({
    queryKey: ['/api/maintenance', user?.id],
    enabled: !!user?.id,
  });

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'weekly': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'monthly': return 'bg-green-100 text-green-800 border-green-200';
      case 'quarterly': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'annually': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNextScheduledDate = (schedule: MaintenanceSchedule) => {
    const nextDate = new Date(schedule.nextDate);
    const today = new Date();
    
    if (nextDate < today) {
      // Calculate next occurrence if current date has passed
      switch (schedule.frequency) {
        case 'weekly':
          return addWeeks(nextDate, Math.ceil((today.getTime() - nextDate.getTime()) / (7 * 24 * 60 * 60 * 1000)));
        case 'monthly':
          return addMonths(nextDate, Math.ceil((today.getTime() - nextDate.getTime()) / (30 * 24 * 60 * 60 * 1000)));
        case 'quarterly':
          return addMonths(nextDate, Math.ceil((today.getTime() - nextDate.getTime()) / (90 * 24 * 60 * 60 * 1000)) * 3);
        case 'annually':
          return addYears(nextDate, Math.ceil((today.getTime() - nextDate.getTime()) / (365 * 24 * 60 * 60 * 1000)));
        default:
          return nextDate;
      }
    }
    
    return nextDate;
  };

  const getDaysUntilNext = (schedule: MaintenanceSchedule) => {
    const nextDate = getNextScheduledDate(schedule);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyStatus = (daysUntil: number) => {
    if (daysUntil < 0) return { status: 'overdue', color: 'text-red-600', bg: 'bg-red-50' };
    if (daysUntil === 0) return { status: 'today', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (daysUntil <= 7) return { status: 'upcoming', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'scheduled', color: 'text-green-600', bg: 'bg-green-50' };
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const schedules = maintenanceData?.schedules || [];
  const activeSchedules = schedules.filter((s: MaintenanceSchedule) => s.isActive);
  const inactiveSchedules = schedules.filter((s: MaintenanceSchedule) => !s.isActive);

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
              <h1 className="text-xl font-bold text-green-800">Maintenance Schedules</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Schedules</p>
                  <p className="text-2xl font-bold text-green-800">{activeSchedules.length}</p>
                </div>
                <Settings className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Due This Week</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {activeSchedules.filter(s => getDaysUntilNext(s) <= 7 && getDaysUntilNext(s) >= 0).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-800">
                    {activeSchedules.filter(s => getDaysUntilNext(s) < 0).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-blue-800">{inactiveSchedules.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Schedules */}
        <div className="mb-8">
          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Active Maintenance Schedules</span>
              </CardTitle>
              <CardDescription>
                Your regular maintenance services to keep your landscape healthy
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading maintenance schedules...</p>
                </div>
              ) : activeSchedules.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No maintenance schedules yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Contact us to set up regular maintenance for your landscape
                  </p>
                  <Button 
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => setLocation('/')}
                  >
                    Get Started
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeSchedules
                    .sort((a, b) => getDaysUntilNext(a) - getDaysUntilNext(b))
                    .map((schedule: MaintenanceSchedule) => {
                      const daysUntil = getDaysUntilNext(schedule);
                      const urgency = getUrgencyStatus(daysUntil);
                      const nextDate = getNextScheduledDate(schedule);
                      
                      return (
                        <div key={schedule.id} className={`border rounded-lg p-4 ${urgency.bg} hover:shadow-md transition-shadow`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{schedule.serviceType}</h4>
                                <Badge className={getFrequencyColor(schedule.frequency)}>
                                  {schedule.frequency}
                                </Badge>
                              </div>
                              
                              {schedule.description && (
                                <p className="text-sm text-gray-600 mb-3">{schedule.description}</p>
                              )}
                              
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span className="text-gray-600">
                                    Next: {format(nextDate, 'MMM d, yyyy')}
                                  </span>
                                </div>
                                <div className={`flex items-center space-x-1 ${urgency.color}`}>
                                  <Clock className="h-4 w-4" />
                                  <span className="font-medium">
                                    {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` :
                                     daysUntil === 0 ? 'Due today' :
                                     daysUntil === 1 ? 'Due tomorrow' :
                                     `Due in ${daysUntil} days`}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              {urgency.status === 'overdue' && (
                                <Badge className="bg-red-100 text-red-800 border-red-200">
                                  Overdue
                                </Badge>
                              )}
                              {urgency.status === 'today' && (
                                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                                  Due Today
                                </Badge>
                              )}
                              {urgency.status === 'upcoming' && (
                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                  Due Soon
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact for More Services */}
        <Card className="bg-white border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Need to Schedule More Services?
              </h3>
              <p className="text-gray-600 mb-4">
                Contact us to add more maintenance services or adjust your current schedule.
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setLocation('/')}
              >
                Contact L&M Landscape Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}