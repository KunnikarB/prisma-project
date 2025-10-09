import UserItem from './UserItem';

export default function UserList({ users, loading, updateUser, deleteUser }) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-primary mb-4">All Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            loading={loading}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        ))}
      </ul>
    </>
  );
}
