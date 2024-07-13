import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <button onClick={handleLogin} className="btn btn-primary">
        Se connecter avec Google
      </button>
    </div>
  );
};

export default Login;
