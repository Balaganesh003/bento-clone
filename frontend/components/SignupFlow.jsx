import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import SignUpMail from '@/components/SignUpMail';
import SignupLink from '@/components/SignupLink';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { uiActions } from '@/store/ui-slice';
import Cookies from 'js-cookie';

const SignupFlow = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword1] = useState(false);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextPanel = (e) => {
    e.preventDefault();

    if (index < 1) {
      setIndex(index + 1);
      setDirection(1);
    }
  };

  const prevPanel = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDirection(-1);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      console.log('Please fill all the fields');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        email: email,
        password: password,
        username: name,
      });

      // Set JWT token to expire in 15 days
      const token = res.data.token;
      // Set the JWT token as a cookie with a 15-day expiry using js-cookie
      Cookies.set('jwt', token, {
        expires: 15, // Expires in 15 days
        path: '/', // Cookie path (all paths)
        secure: true, // Secure cookie (requires HTTPS)
        sameSite: 'None', // SameSite attribute for cross-site requests
      });

      dispatch(uiActions.setFirstTime(true));
      console.log(token);
      toast.success('Signed up successfully');

      router.push(`/${name}`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="flex flex-col h-fit max-w-[448px]">
      <Toaster />
      {/* Slides */}
      <AnimatePresence initial={false} custom={index} mode={`wait`}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}>
          {index === 1 && (
            <SignUpMail
              email={email}
              name={name}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword1}
              prevPanel={prevPanel}
              handelSignUp={handleSignUp}
            />
          )}
          {index === 0 && (
            <SignupLink nextPanel={nextPanel} name={name} setName={setName} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignupFlow;
