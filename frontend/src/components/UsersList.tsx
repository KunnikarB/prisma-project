import { User } from '../App';

interface Props {
  users: User[];
  loading: boolean;
  updateUser: (email: string) => void;
  deleteUser: (email: string) => void;
}

export default function UsersList({
  users,
  loading,
  updateUser,
  deleteUser,
}: Props) {
  return (
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
            {Array.isArray(u.languages) ? u.languages.join(', ') : u.languages}
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
  );
}
