/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';
import type { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import authClient from '../api/clients/auth';

type Props = {
  minutes: number;
};

const COUNTDOWN_END_TIME_KEY = 'countdownEndTime';
const COUNTDOWN_ACTIVE_KEY = 'countdownIsActive';
const START_VERIFICATION_KEY = 'start-verification';

function getSecondsLeftFromEndTime(endTime: number) {
  return Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
}

const useCountdownTimer = ({ minutes }: Props) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startCountdown() {
    const duration = minutes * 60;
    const endTime = Date.now() + duration * 1000;

    setTimeLeft(duration);
    setIsActive(true);

    // Save to localStorage
    localStorage.setItem(COUNTDOWN_END_TIME_KEY, endTime.toString());
    localStorage.setItem(COUNTDOWN_ACTIVE_KEY, 'true');
  }

  const clearCountdownStorage = () => {
    localStorage.removeItem(COUNTDOWN_END_TIME_KEY);
    localStorage.removeItem(COUNTDOWN_ACTIVE_KEY);
    localStorage.removeItem(START_VERIFICATION_KEY);
  };

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
    const startVerification = localStorage.getItem(START_VERIFICATION_KEY);
    const savedEndTime = localStorage.getItem(COUNTDOWN_END_TIME_KEY);
    const savedIsActive = localStorage.getItem(COUNTDOWN_ACTIVE_KEY);

    if (savedEndTime && savedIsActive === 'true') {
      const endTime = Number(savedEndTime);
      const remaining = Number.isNaN(endTime) ? 0 : getSecondsLeftFromEndTime(endTime);

      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsActive(true);
        return;
      }

      clearCountdownStorage();
    }

    if (startVerification === 'true') {
      startCountdown();
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        const savedEndTime = localStorage.getItem(COUNTDOWN_END_TIME_KEY);
        const endTime = savedEndTime ? Number(savedEndTime) : NaN;
        const remaining = Number.isNaN(endTime) ? 0 : getSecondsLeftFromEndTime(endTime);

        if (remaining <= 0) {
          setTimeLeft(0);
          setIsActive(false);
          clearCountdownStorage();
          return;
        }

        setTimeLeft(remaining);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const resetCountdown = () => {
    setTimeLeft(0);
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    clearCountdownStorage();
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
