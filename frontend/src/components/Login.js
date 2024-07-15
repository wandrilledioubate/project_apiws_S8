import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = process.env.REACT_APP_GOOGLE_AUTH_URL;
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
