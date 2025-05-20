import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }).then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Админ-панель</h1>
      <table className="w-full text-white">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Баланс</th>
            <th>Уровень</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.telegram_id}>
              <td>{user.username}</td>
              <td>{user.balance}</td>
              <td>{user.level}</td>
              <td>
                <button onClick={() => banUser(user.telegram_id)} className="bg-red-500 px-2 py-1 rounded">Забанить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}