import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { validateEmail } from '../utils/validateEmail'; //Import the email validator

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    // Validate email format before proceeding
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setMessage('');
      return;
    }

    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password',
    });

    if (error) {
      setMessage('');
      setError(error.message);
    } else {
      setMessage('Password reset link sent! Check your email.');
      setEmail('');
    }
  };

  return (
    <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px 30px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 400,
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#333', marginBottom: 20 }}>📩 Forgot Password</h2>
      
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 15,
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 14
            }}
          />
      
          <button
            onClick={handleForgotPassword}
            style={{
              width: '100%',
              padding: 12,
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 'bold',
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Send Reset Link
          </button>
      
          {error && (
            <p style={{ color: 'red', fontSize: 14, marginTop: 15 }}>{error}</p>
          )}
      
          {message && (
            <p style={{ color: 'green', fontSize: 14, marginTop: 15 }}>{message}</p>
          )}
        </div>
      </div>
      
  );
}