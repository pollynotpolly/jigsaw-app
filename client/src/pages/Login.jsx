
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // ✅ Save JWT to localStorage and update login state
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
}
  };

return (
  <main>
    <h1 id="login-header">Login</h1>

    {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

    {isLoggedIn ? (
      <p role="status" tabIndex={-1} style={{ color: 'green' }}>
        ✅ Logged in successfully!
      </p>
    ) : (
      <form onSubmit={handleSubmit} aria-labelledby="login-header">
        <label htmlFor="email">Email address:</label>
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-describedby="email-help"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <span id="email-help" className="sr-only">Enter your email address</span>
        <br />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          aria-required="true"
          aria-describedby="password-help"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <span id="password-help" className="sr-only">Enter your password</span>
        <br />

        <button type="submit">Log In</button>
      </form>
    )}
  </main>
);


export default Login;
