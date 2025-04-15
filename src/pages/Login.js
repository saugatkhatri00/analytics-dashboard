// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const users = [
    {
      email: 'client1@example.com',
      password: '123456',
      sheet: 'https://docs.google.com/spreadsheets/d/1A16kwTfWmGsO0Z7UmmsqQAnR2gtfJXTQk0OwTLS83sk/export?format=csv',
      clientName: 'Client One',
      logoURL: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
    },
    {
      email: 'client2@example.com',
      password: 'abcdef',
      sheet: 'https://docs.google.com/spreadsheets/d/YOUR_OTHER_SHEET_ID/export?format=csv',
      clientName: 'Client Two',
      logoURL: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Iconic_logo_sample.png'
    }
  ];

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('sheetLink', user.sheet);
      localStorage.setItem('clientName', user.clientName);
      localStorage.setItem('logoURL', user.logoURL);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
