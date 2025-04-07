import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : '✅ Check your inbox to confirm your account!');
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: 400,
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: 25, color: '#333' }}>📝 Create Account</h2>

        <input
          type="email"
          placeholder="Email"
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

        <input
          type="password"
          placeholder="Password"
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
          onClick={handleSignUp}
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: 16,
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
        >
          Sign Up
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