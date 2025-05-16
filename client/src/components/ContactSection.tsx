import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { validateEmail, validatePhone } from '@/lib/utils';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      service: value
    });
    
    // Clear error when user selects a value
    if (errors.service) {
      setErrors({
        ...errors,
        service: ''
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      phone: formData.phone ? (validatePhone(formData.phone) ? '' : 'Invalid phone number') : 'Phone number is required',
      email: formData.email ? (validateEmail(formData.email) ? '' : 'Invalid email address') : 'Email is required',
      service: formData.service ? '' : 'Please select a service',
      message: formData.message ? '' : 'Message is required'
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every(error => error === '');
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest('POST', '/api/contact', formData);
      
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message! We will be in touch soon.",
        });
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-16 bg-secondary relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get In Touch</h2>
          <p className="text-accent max-w-2xl mx-auto">
            Contact us today for a free quote or to discuss your landscaping needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-primary mb-6">Request a Free Quote</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-darkgray mb-2">Full Name</label>
                    <Input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-darkgray mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className={`w-full px-4 py-3 rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-darkgray mb-2">Email Address</label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address"
                    className={`w-full px-4 py-3 rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-darkgray mb-2">Service Interested In</label>
                  <Select onValueChange={handleSelectChange} value={formData.service}>
                    <SelectTrigger className={`w-full px-4 py-6 rounded-lg ${errors.service ? 'border-red-500' : 'border-gray-300'}`}>
                      <SelectValue placeholder="Select a Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digger">Digger & Driver Hire</SelectItem>
                      <SelectItem value="fencing">Fencing, Sleepers & Decking</SelectItem>
                      <SelectItem value="lighting">Outdoor Lighting</SelectItem>
                      <SelectItem value="painting">External Painting</SelectItem>
                      <SelectItem value="maintenance">Garden Maintenance</SelectItem>
                      <SelectItem value="design">Full Landscape Design</SelectItem>
                      <SelectItem value="driveways">Driveways & Patios</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-darkgray mb-2">Your Message</label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Please describe your project..."
                    className={`w-full px-4 py-3 rounded-lg ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-accent text-white font-semibold px-6 py-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                      <i className="fas fa-circle-notch fa-spin ml-2"></i>
                    </>
                  ) : (
                    <>
                      <span>Send Request</span>
                      <i className="fas fa-paper-plane ml-2"></i>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full p-3 text-white mr-4">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-lg text-primary font-semibold">07542 331 653</p>
                    <p className="text-sm text-gray-500">Available Mon-Sat, 8am-6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full p-3 text-white mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-lg text-primary">info@landmlandscapes.co.uk</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full p-3 text-white mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Service Areas</h4>
                    <p className="text-gray-700">We provide services throughout the local area and surrounding regions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
              <div className="w-full h-full" id="map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.4733967433!2d-0.1666149!3d51.5001547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1687373745287!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Area Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
