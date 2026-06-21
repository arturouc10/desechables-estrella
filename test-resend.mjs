import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log('Testing Resend...');
  const { data, error } = await resend.emails.send({
    from: 'Desechables La Estrella <onboarding@resend.dev>',
    to: 'desechables_laestrella@hotmail.com',
    subject: 'Test Email',
    html: '<p>Test</p>'
  });

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}

testEmail();
