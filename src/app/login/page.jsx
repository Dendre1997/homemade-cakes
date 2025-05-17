'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth functions
import app from '@/lib/firebase'; // Your Firebase app initialization

const auth = getAuth(app); // Initialize Firebase Auth

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Successfully logged in!');
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } catch (e) {
      // Handle errors here (e.g., wrong password, user not found)
      console.error("Login error:", e.code, e.message);
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
        setError('Неправильний email або пароль.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Неправильний формат email.');
      }
      else {
        setError('Помилка входу. Спробуйте пізніше.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Вхід в Адмін-панель</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Увійти
        </button>
      </form>
    </div>
  );
}