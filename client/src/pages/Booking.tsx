import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { validateEmail, validatePhone } from '@/lib/utils';

const Booking = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceType: '',
    notes: '',
    duration: 60
  });
  
  const [errors, setErrors] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceType: '',
    appointmentDate: '',
    selectedTime: ''
  });

  // Available time slots (9 AM to 5 PM, excluding lunch 12-1 PM)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const serviceOptions = [
    { value: 'digger', label: 'Digger & Driver Hire', duration: 240 },
    { value: 'fencing', label: 'Fencing, Sleepers & Decking', duration: 120 },
    { value: 'lighting', label: 'Outdoor Lighting', duration: 90 },
    { value: 'painting', label: 'External Painting', duration: 180 },
    { value: 'maintenance', label: 'Garden Maintenance', duration: 60 },
    { value: 'design', label: 'Full Landscape Design', duration: 120 },
    { value: 'driveways', label: 'Driveways & Patios', duration: 180 },
    { value: 'consultation', label: 'Free Consultation', duration: 30 }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    if (errors[id as keyof typeof errors]) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  const handleServiceChange = (value: string) => {
    const service = serviceOptions.find(s => s.value === value);
    setFormData({ 
      ...formData, 
      serviceType: value,
      duration: service?.duration || 60
    });
    
    if (errors.serviceType) {
      setErrors({ ...errors, serviceType: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      customerName: formData.customerName ? '' : 'Name is required',
      customerEmail: formData.customerEmail ? (validateEmail(formData.customerEmail) ? '' : 'Invalid email address') : 'Email is required',
      customerPhone: formData.customerPhone ? (validatePhone(formData.customerPhone) ? '' : 'Invalid phone number') : 'Phone number is required',
      serviceType: formData.serviceType ? '' : 'Please select a service',
      appointmentDate: selectedDate ? '' : 'Please select a date',
      selectedTime: selectedTime ? '' : 'Please select a time'
    };
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedDate) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const appointmentDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));
      
      const bookingData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        serviceType: formData.serviceType,
        appointmentDate: appointmentDateTime.toISOString(),
        duration: formData.duration,
        notes: formData.notes,
      };
      
      await apiRequest('/api/bookings', {
        method: 'POST',
        body: bookingData,
      });
      
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}. We'll send you a confirmation email shortly.`,
      });
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        serviceType: '',
        notes: '',
        duration: 60
      });
      setSelectedDate(new Date());
      setSelectedTime('');
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Sorry, we couldn't process your booking. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container mx-auto px-4">
        <div className="bubble-section">
          <div className="bubble-content">
            <div className="text-center mb-16">
              <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">BOOK APPOINTMENT</span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Schedule Your Service</h1>
              <p className="text-accent max-w-2xl mx-auto">
                Book your landscaping service online. Choose your preferred date and time, and we'll confirm your appointment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calendar Section */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6">Select Date & Time</h3>
                
                <div className="mb-6">
                  <label className="block text-darkgray mb-4 font-semibold">Choose Date:</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                    className="rounded-md border"
                  />
                  {errors.appointmentDate && <p className="text-red-500 text-sm mt-2">{errors.appointmentDate}</p>}
                </div>
                
                <div>
                  <label className="block text-darkgray mb-4 font-semibold">Available Times:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  {errors.selectedTime && <p className="text-red-500 text-sm mt-2">{errors.selectedTime}</p>}
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6">Booking Details</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="customerName" className="block text-darkgray mb-2 font-semibold">Full Name</label>
                    <Input
                      type="text"
                      id="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className={errors.customerName ? 'border-red-500' : ''}
                    />
                    {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="customerEmail" className="block text-darkgray mb-2 font-semibold">Email</label>
                      <Input
                        type="email"
                        id="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={errors.customerEmail ? 'border-red-500' : ''}
                      />
                      {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="customerPhone" className="block text-darkgray mb-2 font-semibold">Phone</label>
                      <Input
                        type="tel"
                        id="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                        className={errors.customerPhone ? 'border-red-500' : ''}
                      />
                      {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-darkgray mb-2 font-semibold">Service Required</label>
                    <Select onValueChange={handleServiceChange} value={formData.serviceType}>
                      <SelectTrigger className={errors.serviceType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select a Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label} ({service.duration} min)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-darkgray mb-2 font-semibold">Additional Notes</label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your project requirements..."
                      className="resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-accent text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Booking...</span>
                        <i className="fas fa-circle-notch fa-spin ml-2"></i>
                      </>
                    ) : (
                      <>
                        <span>Confirm Booking</span>
                        <i className="fas fa-calendar-check ml-2"></i>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;