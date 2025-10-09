export default function UserItem({ user, loading, updateUser, deleteUser }) {
  return (
    <li className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2">
      <span className="font-bold text-primary">{user.name}</span>
      <span>Email: {user.email}</span>
      <span>Age: {user.age}</span>
      <span>
        Languages:{' '}
        {Array.isArray(user.languages)
          ? user.languages.join(', ')
          : user.languages}
      </span>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => updateUser(user.email)}
          disabled={loading}
          className="bg-pink-400 text-white px-3 py-1 rounded-md hover:bg-pink-600 transition"
        >
          Update Languages
        </button>
        <button
          onClick={() => deleteUser(user.email)}
          disabled={loading}
          className="bg-pink-400 text-white px-3 py-1 rounded-md hover:bg-pink-300 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
