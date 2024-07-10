import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import { uiActions } from '@/store/ui-slice';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();

  const handelLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log('Please fill all the fields');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/signin`, {
        email: email,
        password: password,
      });

      const token = res.data.token;

      // Set the JWT token as a cookie with a 15-day expiry using js-cookie
      Cookies.set('jwt', token, {
        expires: 15, // Expires in 15 days
        path: '/', // Cookie path (all paths)
        secure: true, // Secure cookie (requires HTTPS)
        sameSite: 'None', // SameSite attribute for cross-site requests
      });

      toast.success('Logged in successfully');
      dispatch(uiActions.setFirstTime(false));
      dispatch(profileActions.setFirstTime(false));
      router.push(`/${res.data.username}`);
    } catch (error) {
      toast.error(error.response.data.message || 'Server error ');
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-fit max-w-[448px] w-full">
      <Toaster />
      <h1 className="font-bold text-[32px] leading-[40px] mt-2">
        Log in to your Bento
      </h1>
      <p className="mt-[1rem] font-normal text-[20px] leading-9 text-[#6c6c6c]">
        Good to have you back!
      </p>
      <form className="w-full">
        <div className="mt-[5rem]  rounded-xl w-full">
          <div className="flex flex-col sm:flex-row items-center w-full gap-3">
            <div className="w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full p-4 sm:p-3 bg-[#f7f7f7] rounded-lg focus:outline-none text-[16px] sm:text-[14px]  leading-5 text-[#6c6c6c]"
              />
            </div>
            <div className="w-full flex bg-[#f7f7f7] rounded-r-lg pr-[0.5rem] items-center rounded-l-lg">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full  p-4 sm:p-3 rounded-r-lg focus:outline-none text-[16px] sm:text-[14px] bg-[#f7f7f7]  leading-5 text-[#6c6c6c] rounded-l-md"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="rounded bg-white shadow px-[15px] sm:px-3 py-[9px] sm:py-[5px] text-[0.75rem] font-bold leading-[1rem] w-[60px] h-fit cursor-pointer">
                Show
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/reset-password"
          className="mt-3 ml-[2px] text-[13px] leading-[1rem] underline text-[#768CFF] ">
          Reset Password
        </Link>
        <div className="ml-[0.125rem] h-[64px] flex items-center text-sm leading-6 font-bold">
          OR
        </div>
        <div className=" h-[58px] sm:h-[45px]">
          {email ? (
            <button
              onClick={handelLogin}
              className="hover:shadow-lg transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white bg-black hover:bg-black/80 h-full w-full py-2 px-[0.625rem] rounded-xl">
              Log in
            </button>
          ) : (
            <button className="hover:shadow-lg transition-all duration-150 text-[14px] leading-[1.25rem] font-bold text-white bg-[#1D9BF0] h-full w-full py-2 px-[0.625rem] rounded-xl flex items-center justify-center">
              <FaGoogle className="inline-block mr-2 text-[16px]" />
              Sign in with Google
            </button>
          )}
        </div>
      </form>
      <Link
        href="/signup"
        className="text-[#6c6c6c] mt-8 ml-[2px] text-[12px] leading-4 ">
        or sign up
      </Link>
    </div>
  );
};

export default LoginForm;
