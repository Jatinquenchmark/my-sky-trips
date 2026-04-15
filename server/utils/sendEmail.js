import { Resend } from 'resend';

const sendEmail = async (options) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: `Sky-trip <${process.env.EMAIL_FROM}>`,
    to: [options.email],
    subject: options.subject,
    html: options.message,
  });

  if (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }

  return data;
};

export default sendEmail;
