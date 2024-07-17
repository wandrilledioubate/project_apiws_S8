import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = process.env.REACT_APP_BACKEND_URL+`/auth/google`;
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
