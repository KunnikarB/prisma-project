import { useState, FormEvent } from 'react';
import { User } from '../App';

interface Props {
  addUser: (data: Omit<User, 'id'>) => void;
  loading: boolean;
}

export default function AddUserForm({ addUser, loading }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    languages: '',
    age: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addUser({
      name: form.name,
      email: form.email,
      languages: form.languages.split(',').map((l) => l.trim()),
      age: Number(form.age),
    });
    setForm({ name: '', email: '', languages: '', age: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col gap-3 max-w-md"
    >
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        placeholder="Languages (comma separated)"
        value={form.languages}
        onChange={(e) => setForm({ ...form, languages: e.target.value })}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-pink-400 text-white p-2 rounded-md hover:bg-pink-600 transition"
      >
        Add User
      </button>
    </form>
  );
}
