import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      const hash = window.Telegram.WebApp.initDataUnsafe.hash;

      axios.post('/api/auth', { ...user, hash })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          router.push('/game');
        })
        .catch(err => {
          console.error('Ошибка авторизации:', err);
        });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <p>Авторизация через Telegram...</p>
    </div>
  );
}