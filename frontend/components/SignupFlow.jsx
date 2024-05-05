import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import SignUpMail from '@/components/SignUpMail';
import SignupLink from '@/components/SignupLink';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

const SignupFlow = () => {
  const router = useRouter();
  const [name, setName] = useState('');

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

  const handelSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      console.log('Please fill all the fields');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/auth/signup`, {
        email: email,
        password: password,
        username: name,
      });
      // document.cookie = `jwt=${res.data.token}`;
      console.log(res.data.token);

      toast.success('Signed up successfully');
      router.push(`/${name}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'Server error ');
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
              handelSignUp={handelSignUp}
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
