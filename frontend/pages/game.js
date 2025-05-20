import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Game() {
  const [game, setGame] = useState(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    axios.post('/api/game/start', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setGame(res.data));
  }, []);

  const move = async () => {
    const res = await axios.post('/api/game/move', { sessionId: game._id }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setGame(res.data);
    setPosition(res.data.players.find(p => p.user_id === res.data.players[0].user_id)?.position || 0);
  };

  if (!game) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Монополия</h1>
      <p>Вы на клетке: {game.board[position]}</p>
      <button onClick={move} className="bg-blue-500 text-white px-4 py-2 rounded">Сделать ход</button>
    </div>
  );
}