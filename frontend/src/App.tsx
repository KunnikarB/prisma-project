import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import AddUserForm from "./components/UserForm";
import UsersList from "./components/UsersList";

export interface User {
  id: number;
  name: string;
  email: string;
  languages: string[];
  age: number;
}

const API_URL = "http://localhost:5500/userlanguages";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get<User[]>(API_URL);
        setUsers(res.data);
      } catch {
        toast.error("Failed to fetch users");
      }
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>(API_URL);
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  const addUser = async (data: Omit<User, "id">) => {
    setLoading(true);
    try {
      await axios.post(API_URL, data);
      toast.success("User added successfully!");
      fetchUsers();
    } catch {
      toast.error("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (email: string) => {
    const newLanguages = prompt("Enter new languages (comma separated):");
    if (!newLanguages) return;
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${email}`, {
        languages: newLanguages.split(",").map((l) => l.trim()),
      });
      toast.success("User updated!");
      fetchUsers();
    } catch {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (email: string) => {
    if (!confirm(`Delete user ${email}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${email}`);
      toast.success("User deleted!");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUnderage = async () => {
    if (!confirm("Delete all users under 18?")) return;
    setLoading(true);
    try {
      const res = await axios.delete<{ message: string }>(`${API_URL}/under18`);
      toast.success(res.data.message);
      fetchUsers();
    } catch {
      toast.error("Failed to delete underage users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 font-sans">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-primary mb-6">UserLanguage Dashboard</h1>

      <AddUserForm addUser={addUser} loading={loading} />

      <button
        onClick={deleteUnderage}
        disabled={loading}
        className="mb-6 bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-300 transition"
      >
        Delete Users Under 18
      </button>

      <UsersList users={users} loading={loading} updateUser={updateUser} deleteUser={deleteUser} />
    </div>
  );
}
