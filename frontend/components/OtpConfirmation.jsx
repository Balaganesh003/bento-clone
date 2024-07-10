import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const OtpConfirmation = ({ otp, setOtp, nextPanel, email }) => {
  const [isValid, setIsValid] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Validate OTP (assuming it's a 6-digit number)
    setIsValid(otp.length === 6 && /^\d+$/.test(otp));
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      const res = await axios.post(`${API_URL}/auth/verify-reset-otp`, {
        otp,
        email,
      });

      if (res.status === 200) {
        nextPanel(e);
      }
    }
  };

  return (
    <React.Fragment>
      <h1 className="font-bold text-[32px] leading-[40px]">Enter OTP</h1>
      <p className="mt-[1rem] font-normal text-[20px] leading-9 text-[#6c6c6c]">
        We've sent a 6-digit code to your email. Please enter it below.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-[5rem] rounded-xl w-full ">
          <div className="flex items-center w-full">
            <div className="w-full">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                type="text"
                maxLength="6"
                className="w-full p-4 sm:p-3 rounded-xl focus:outline-none text-[16px] sm:text-[14px] leading-5 text-[#6c6c6c] bg-[#f7f7f7]"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 h-[58px] sm:h-[48px]">
          <button
            onClick={(e) => nextPanel(e)}
            type="submit"
            disabled={!isValid}
            className={`transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white h-full w-full py-2 px-[0.625rem] rounded-xl ${
              isValid
                ? 'bg-black hover:bg-black/80 hover:shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}>
            Verify OTP
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default OtpConfirmation;
