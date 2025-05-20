import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/user/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user.username}</h1>
      <p>Опыт: {user.experience}</p>
      <p>Уровень: {user.level}</p>
    </div>
  );
}