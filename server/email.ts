
import nodemailer from 'nodemailer';

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  serviceType: string;
  appointmentDate: string;
  duration: number;
  notes?: string;
}

// Configure email transporter (you'll need to set up SMTP credentials)
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your email password or app password
    },
  });
};

export async function sendBookingConfirmation(booking: BookingEmailData): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Email credentials not configured. Booking email not sent.');
    return;
  }

  try {
    const transporter = createTransporter();
    
    const appointmentDate = new Date(booking.appointmentDate);
    const formattedDate = appointmentDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = appointmentDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Email to customer
    const customerMailOptions = {
      from: `"L&M Landscape Maintenance" <${process.env.SMTP_USER}>`,
      to: booking.customerEmail,
      subject: 'Booking Confirmation - L&M Landscape Maintenance',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2d5016; color: white; padding: 20px; text-align: center;">
            <h1>L&M Landscape Maintenance</h1>
            <h2>Booking Confirmation</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${booking.customerName},</p>
            
            <p>Thank you for booking with L&M Landscape Maintenance. We're excited to help with your landscaping needs!</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2d5016; margin-top: 0;">Booking Details</h3>
              <p><strong>Service:</strong> ${booking.serviceType}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${formattedTime}</p>
              <p><strong>Duration:</strong> ${booking.duration} minutes</p>
              ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>
            
            <p>We'll contact you 24 hours before your appointment to confirm the details.</p>
            
            <p>If you need to reschedule or have any questions, please contact us:</p>
            <ul>
              <li><strong>Phone:</strong> 07542 331 653</li>
              <li><strong>Email:</strong> lmlandsm@gmail.com</li>
            </ul>
            
            <p>Thank you for choosing L&M Landscape Maintenance!</p>
            
            <p>Best regards,<br>The L&M Team</p>
          </div>
          
          <div style="background-color: #2d5016; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>L&M Landscape Maintenance | Manchester Failsworth</p>
            <p>Phone: 07542 331 653 | Email: lmlandsm@gmail.com</p>
          </div>
        </div>
      `,
    };

    // Email to business
    const businessMailOptions = {
      from: `"Booking System" <${process.env.SMTP_USER}>`,
      to: process.env.BUSINESS_EMAIL || process.env.SMTP_USER,
      subject: `New Booking: ${booking.serviceType} - ${booking.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2d5016; color: white; padding: 20px; text-align: center;">
            <h1>New Booking Received</h1>
          </div>
          
          <div style="padding: 20px;">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${booking.customerName}</p>
            <p><strong>Email:</strong> ${booking.customerEmail}</p>
            <p><strong>Service:</strong> ${booking.serviceType}</p>
            
            <h3>Appointment Details</h3>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Duration:</strong> ${booking.duration} minutes</p>
            
            ${booking.notes ? `
            <h3>Customer Notes</h3>
            <p>${booking.notes}</p>
            ` : ''}
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 5px;">
              <p><strong>Action Required:</strong> Please contact the customer to confirm the appointment details.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(businessMailOptions)
    ]);

    console.log('Booking confirmation emails sent successfully');
  } catch (error) {
    console.error('Error sending booking emails:', error);
    // Don't throw the error - we don't want email failures to break the booking process
  }
}
