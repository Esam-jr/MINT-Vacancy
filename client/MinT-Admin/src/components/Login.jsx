import { useContext, useState } from 'react';
import { MyContext } from '../App';
import imgLogo from '../assets/img/logo.png';
import Loading from './Loading';

function LoginAdmin() {
  const context = useContext(MyContext);
  const { handleCurrentAdmin } = context;

  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // const navigate = useNavigate(); // To redirect the user after login

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:1234/login-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        console.log('Admin logged in successfully:', data.username);
        // Perform actions after successful login, like storing the auth token
        // Example: localStorage.setItem('token', data.token);
        // navigate("/dashboard"); // Redirect to the admin dashboard or any other page
        handleCurrentAdmin(data);
      } else {
        console.error('Login failed:', data.message);
        alert(data.message); // Notify user about the failure
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.error('Error logging in admin:', error);
      alert('An error occurred while logging in. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="login-container  d-flex align-items-center justify-content-center vh-100">
      <form className="login-form nav__container" onSubmit={handleSubmit}>
        <div className=" text-center">
          <p className="welcome">Login to get started</p>
          <img src={imgLogo} alt="logo" className="logo" />
        </div>
        <label className="form-label fs-3">Email:</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          className="form-control mb-3 p-3 fs-4"
        />
        <label className="form-label fs-3">Password:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          className="form-control mb-5 p-3 fs-4"
        />
        <button type="submit" className="btn w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;
