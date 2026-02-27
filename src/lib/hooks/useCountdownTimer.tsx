/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';
import type { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import authClient from '../api/clients/auth';

type Props = {
  minutes: number;
};

function getRemainingTime() {
  const savedEndTime = localStorage.getItem('countdownEndTime');
  const savedIsActive = localStorage.getItem('countdownIsActive');

  if (savedEndTime && savedIsActive === 'true') {
    const endTime = parseInt(savedEndTime);
    const now = Date.now();
    if (now < endTime) {
      return Math.ceil((endTime - now) / 1000);
    }
  }
  return 0;
}

function isStillActive() {
  const savedIsActive = localStorage.getItem('countdownIsActive');
  if (savedIsActive === 'true') {
    return true;
  }
  return false;
}
const useCountdownTimer = ({ minutes }: Props) => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());
  const [isActive, setIsActive] = useState(isStillActive());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startCountdown() {
    const duration = minutes * 60;
    const endTime = Date.now() + duration * 1000;

    setTimeLeft(duration);
    setIsActive(true);

    // Save to localStorage
    localStorage.setItem('countdownEndTime', endTime.toString());
    localStorage.setItem('countdownIsActive', 'true');
  }

  async function startCountdownAction() {
    try {
      const response = await authClient.verifyNow(localStorage.getItem('email') || '');

      if (response.statusCode === 200) {
        notifications.show({
          title: 'Verification Email Sent',
          message: response?.message,
          color: 'green',
        });
        startCountdown();
      }
    } catch (err) {
      const newError = err as AxiosError<{ message: string; success: boolean }>;
      const { message, success } = newError?.response?.data || {};
      notifications.show({
        title: success ? 'Verification Email Sent' : 'Failed to Send Verification Email',
        message: message,
        color: success ? 'green' : 'red',
      });
      console.error(err);
    }
  }

  useEffect(() => {
    const startVerification = localStorage.getItem('start-verification');
    const savedEndTime = localStorage.getItem('countdownEndTime');
    const savedIsActive = localStorage.getItem('countdownIsActive');

    if (startVerification === 'true' && !savedEndTime && !savedIsActive) {
      startCountdown();
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            localStorage.removeItem('countdownEndTime');
            localStorage.removeItem('countdownIsActive');
            localStorage.removeItem('start-verification');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isActive, timeLeft]);

  const resetCountdown = () => {
    setTimeLeft(0);
    setIsActive(false);
    clearInterval(intervalRef.current!);
    localStorage.removeItem('countdownEndTime');
    localStorage.removeItem('countdownIsActive');
    localStorage.removeItem('start-verification');
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendToken = async () => {
    resetCountdown();
    if (!isActive) {
      await startCountdownAction();
    }
  };

  return { timeLeft, isActive, formatTime, handleResendToken };
};

export default useCountdownTimer;
