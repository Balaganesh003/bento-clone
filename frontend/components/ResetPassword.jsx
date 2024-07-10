import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResetPassword = ({ email, setEmail, nextPanel }) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    validateEmail();
  }, [email]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidEmail) {
      try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, {
          email,
        });
        if (response.status === 200) {
          nextPanel(e); // Move to OTP entry screen
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(
            error.response.data.message ||
              'An error occurred. Please try again.'
          );
        } else if (error.request) {
          setErrorMessage('Network error. Please check your connection.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <React.Fragment>
      <h1 className="font-bold text-[32px] leading-[40px]">
        Reset your password
      </h1>
      <p className="mt-[1rem] font-normal text-[20px] leading-9 text-[#6c6c6c]">
        Enter your email address and we'll send you an OTP to reset your
        password.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-[5rem] rounded-xl w-full ">
          <div className="flex items-center w-full">
            <div className="w-full">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                className="w-full p-4 sm:p-3 rounded-xl focus:outline-none text-[16px] sm:text-[14px] leading-5 text-[#6c6c6c] bg-[#f7f7f7]"
              />
            </div>
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-[14px] mt-2">{errorMessage}</p>
        )}
        <div className="mt-4 h-[58px] sm:h-[48px]">
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            disabled={!isValidEmail}
            className={`transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white h-full w-full py-2 px-[0.625rem] rounded-xl ${
              isValidEmail
                ? 'bg-black hover:bg-black/80 hover:shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}>
            Send Reset OTP
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ResetPassword;
