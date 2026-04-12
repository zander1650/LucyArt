import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [nameCount, setNameCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const sendEmail = (e) => {
    e.preventDefault();
    setError(null);
    emailjs.sendForm(
      'YOUR_SERVICE_ID', // <-- Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // <-- Replace with your EmailJS template ID
      form.current,
      'YOUR_USER_ID' // <-- Replace with your EmailJS public key
    )
      .then(() => {
        setSent(true);
      }, (err) => {
        setError('Failed to send. Please try again.');
      });
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Contact Me</h1>
      <p>Interested in commissioning a piece or have questions about my work? I'd love to hear from you!</p>
      <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '32px 0', width: '100%', maxWidth: 800, alignSelf: 'center' }}>
        <div style={{ width: '100%' }}>
          <input type="text" name="user_name" placeholder="Your Name" required maxLength={100}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #f4e4bc', width: '100%', fontSize: '1em', boxSizing: 'border-box' }}
            onChange={e => setNameCount(e.target.value.length)}
          />
          <div style={{ textAlign: 'right', fontSize: '0.85em', color: '#bfa94a', marginTop: '2px' }}>{nameCount}/100 (Max characters)</div>
        </div>
        <div style={{ width: '100%' }}>
          <input type="email" name="user_email" placeholder="Your Email" required maxLength={200}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #f4e4bc', width: '100%', fontSize: '1em', boxSizing: 'border-box' }}
            onChange={e => setEmailCount(e.target.value.length)}
          />
          <div style={{ textAlign: 'right', fontSize: '0.85em', color: '#bfa94a', marginTop: '2px' }}>{emailCount}/200 (Max characters)</div>
        </div>
        <div style={{ width: '100%' }}>
          <textarea name="message" placeholder="Your Message" required rows={5} maxLength={5000}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #f4e4bc', width: '100%', fontSize: '1em', resize: 'vertical', minHeight: 100, boxSizing: 'border-box' }}
            onChange={e => setMessageCount(e.target.value.length)}
          />
          <div style={{ textAlign: 'right', fontSize: '0.85em', color: '#bfa94a', marginTop: '2px' }}>{messageCount}/5000 (Max characters)</div>
        </div>
        <button type="submit" style={{ background: '#f59e0b', color: '#2c2418', border: 'none', borderRadius: '6px', padding: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1em' }}>Send Email</button>
        {sent && <span style={{ color: 'green' }}>Message sent! Thank you.</span>}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
      <p><strong>Social Media:</strong> @yourartistname</p>
      <p style={{ fontSize: '0.95em', color: '#5a4a3a' }}>Please include details about your commission request, such as size, medium, subject, and budget.</p>
      <style>{`
        @media (max-width: 600px) {
          form {
            max-width: 100% !important;
            padding: 0 !important;
          }
          input, textarea, button {
            font-size: 1em !important;
          }
          h1 {
            font-size: 1.5em !important;
          }
          .contact-social {
            font-size: 1em !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;