import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SetNewPassword = ({ nextPanel, otp, email }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const validatePasswords = () => {
    if (password.length < 8) {
      setIsValid(false);
      setErrorMessage('Password must be at least 8 characters long');
    } else if (password !== confirmPassword) {
      setIsValid(false);
      setErrorMessage('Passwords do not match');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      const res = await axios.post(`${API_URL}/auth/reset-password`, {
        otp,
        email,
        newPassword: password,
      });

      if (res.status === 200) {
        router.push('/login');
      }
    }
  };

  return (
    <React.Fragment>
      <h1 className="font-bold text-[32px] leading-[40px]">Set New Password</h1>
      <p className="mt-[1rem] font-normal text-[20px] leading-9 text-[#6c6c6c]">
        Please enter your new password and confirm it below.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-[3rem] space-y-4">
          <div className="rounded-xl w-full">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              type="password"
              className="w-full p-4 sm:p-3 rounded-xl focus:outline-none text-[16px] sm:text-[14px] leading-5 text-[#6c6c6c] bg-[#f7f7f7]"
            />
          </div>
          <div className="rounded-xl w-full">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              type="password"
              className="w-full p-4 sm:p-3 rounded-xl focus:outline-none text-[16px] sm:text-[14px] leading-5 text-[#6c6c6c] bg-[#f7f7f7]"
            />
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-[14px] mt-2">{errorMessage}</p>
        )}

        <div className="mt-4 h-[58px] sm:h-[48px]">
          <button
            type="submit"
            disabled={!isValid}
            className={`transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white h-full w-full py-2 px-[0.625rem] rounded-xl ${
              isValid
                ? 'bg-black hover:bg-black/80 hover:shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}>
            Set New Password
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SetNewPassword;
