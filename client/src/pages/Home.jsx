import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/users', form);
    setUsers(prev => [...prev, res.data]);
    setForm({ name: '', email: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Users</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {users.map(u => <li key={u.id}>{u.name} — {u.email}</li>)}
      </ul>
    </div>
  );
}
