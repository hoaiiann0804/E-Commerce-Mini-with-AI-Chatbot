import React from 'react';

const LoginPageSimple: React.FC = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Login Page</h1>
      <p>This is a simple login page for testing</p>
      <div>
        <input
          type="email"
          placeholder="Email"
          style={{ margin: '10px', padding: '10px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          style={{ margin: '10px', padding: '10px' }}
        />
        <br />
        <button style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
      </div>
    </div>
  );
};

export default LoginPageSimple;
