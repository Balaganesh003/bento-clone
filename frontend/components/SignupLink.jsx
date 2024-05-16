import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const SignupLink = ({ name, setName, nextPanel }) => {
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    if (name) {
      axios
        .get(`${API_URL}/auth/checkusername/${name}`)
        .then((res) => {
          if (res.status === 400) {
            // Username already exists
            setIsAlreadyExist(true);
          } else if (res.status === 200) {
            // Username is available
            setIsAlreadyExist(false);
          }
        })
        .catch((error) => {
          // Handle any network errors or other issues
          if (error.response) {
            // The request was made and the server responded with a status code
            if (error.response.status === 400) {
              setIsAlreadyExist(true); // Username already exists
            } else {
              console.log('Server error:', error.response.data.message);
              // Handle other server errors if needed
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.log('Network error:', error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.log('Error:', error.message);
          }
        });
    }
  }, [name]);

  return (
    <React.Fragment>
      <h1 className="font-bold text-[32px] leading-[40px]">
        First, claim your unique link
      </h1>
      <p className="mt-[1rem] font-normal text-[20px] leading-9 text-[#6c6c6c]">
        The good ones are still available!
      </p>
      <form className="w-full">
        <div className="mt-[5rem] rounded-xl w-full ">
          <div className="flex items-center w-full">
            <div className="pl-3 py-4 sm:py-3 rounded-l-xl h-full text-[#6c6c6c] text-[16px] sm:text-[14px] leading-5 bg-[#f7f7f7] -mr-[0.625rem] z-[2]">
              bento.me/
            </div>
            <div className="w-full">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="yourname"
                type="text"
                className="w-full p-4 sm:p-3 rounded-r-xl focus:outline-none text-[16px] sm:text-[14px] leading-5 text-[#6c6c6c] bg-[#f7f7f7]"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 h-[58px] sm:h-[48px]">
          {name && !isAlreadyExist && (
            <button
              onClick={nextPanel}
              className="hover:shadow-lg transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white bg-black hover:bg-black/80 h-full w-full py-2 px-[0.625rem] rounded-xl">
              Grab my Link
            </button>
          )}
          {isAlreadyExist && (
            <p className="text-red-500 text-[14px] mt-2">
              This username seems to be taken already... <br /> Try something
              similar.
            </p>
          )}
        </div>
      </form>
      <Link
        href="/login"
        className="text-[#6c6c6c] mt-[2rem] inline-block text-[12px] leading-4">
        or Log in
      </Link>
    </React.Fragment>
  );
};

export default SignupLink;
