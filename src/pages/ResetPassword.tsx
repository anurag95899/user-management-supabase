import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Set session if user came from email reset link
  useEffect(() => {
    const hash = window.location.hash;
    const query = new URLSearchParams(hash.substring(1));
    const access_token = query.get('access_token');
    const refresh_token = query.get('refresh_token');

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            console.error('Session restore error:', error.message);
            setMessage('Session expired or invalid link.');
          } else {
            console.log('Session restored successfully');
          }
        });
    }
  }, []);

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password updated successfully!');
      setPassword('');
      setTimeout(() => {
        navigate('/'); // or navigate to login/home page
      }, 1500);
    }
  };

  return (

    <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #c2e59c, #64b3f4)',
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
          <h2 style={{ marginBottom: 20, color: '#333' }}>🔑 Reset Password</h2>
  
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 20,
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 14
            }}
          />
  
          <button
            onClick={handleResetPassword}
            style={{
              width: '100%',
              padding: 12,
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: 16,
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Reset Password
          </button>
  
          {message && (
            <p style={{
              marginTop: 15,
              color: message.startsWith('✅') ? 'green' : 'red',
              fontSize: 14
            }}>
              {message}
            </p>
          )}
        </div>
      </div>
  );
}