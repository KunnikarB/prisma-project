import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5500/userlanguages';

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    languages: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(API_URL);
        setUsers(res.data);
      } catch {
        toast.error('Failed to fetch users');
      }
    }
    fetchUsers();
  }, []);

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, {
        name: form.name,
        email: form.email,
        languages: form.languages.split(',').map((l) => l.trim()),
        age: Number(form.age),
      });
      toast.success('User added successfully!');
      setForm({ name: '', email: '', languages: '', age: '' });
      fetchUsers();
    } catch {
      toast.error('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  // Update user languages
  const updateUser = async (email) => {
    const newLanguages = prompt('Enter new languages (comma separated):');
    if (!newLanguages) return;
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${email}`, {
        languages: newLanguages.split(',').map((l) => l.trim()),
      });
      toast.success('User updated!');
      fetchUsers();
    } catch {
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  // Delete user by email
  const deleteUser = async (email) => {
    if (!confirm(`Delete user ${email}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${email}`);
      toast.success('User deleted!');
      fetchUsers();
    } catch {
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  // Delete all users under 18
  const deleteUnderage = async () => {
    if (!confirm('Delete all users under 18?')) return;
    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/under18`);
      toast.success(res.data.message);
      fetchUsers();
    } catch {
      toast.error('Failed to delete underage users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users again
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch {
      toast.error('Failed to fetch users');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 font-sans">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-primary mb-6">
        UserLanguage Dashboard
      </h1>

      {/* Add User Form */}
      <form
        onSubmit={addUser}
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

      {/* Delete underage users */}
      <button
        onClick={deleteUnderage}
        disabled={loading}
        className="mb-6 bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-300 transition"
      >
        Delete Users Under 18
      </button>

      {/* Users List */}
      <h2 className="text-2xl font-semibold text-primary mb-4">All Users</h2>
      <ul className="space-y-4">
        {users.map((u) => (
          <li
            key={u.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2"
          >
            <span className="font-bold text-primary">{u.name}</span>
            <span>Email: {u.email}</span>
            <span>Age: {u.age}</span>
            <span>
              Languages:{' '}
              {Array.isArray(u.languages)
                ? u.languages.join(', ')
                : u.languages}
            </span>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateUser(u.email)}
                disabled={loading}
                className="bg-pink-400 text-white px-3 py-1 rounded-md hover:bg-pink-600 transition"
              >
                Update Languages
              </button>
              <button
                onClick={() => deleteUser(u.email)}
                disabled={loading}
                className="bg-pink-400 text-white px-3 py-1 rounded-md hover:bg-pink-300 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
