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
import ResetPassword from './ResetPassword';
import OtpConfirmation from './OtpConfirmation';
import SetNewPassword from './SetNewPassword';

const ResetForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword1] = useState(false);

  const [otp, setOtp] = useState('');

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextPanel = (e) => {
    e.preventDefault();

    if (index < 2) {
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
          {index === 0 && (
            <ResetPassword
              nextPanel={nextPanel}
              email={email}
              setEmail={setEmail}
            />
          )}

          {index === 1 && (
            <OtpConfirmation
              prevPanel={prevPanel}
              nextPanel={nextPanel}
              otp={otp}
              setOtp={setOtp}
            />
          )}

          {index === 2 && (
            <SetNewPassword
              nextPanel={nextPanel}
              password={password}
              setPassword={setPassword}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ResetForm;
