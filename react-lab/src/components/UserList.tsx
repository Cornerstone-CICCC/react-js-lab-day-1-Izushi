import { User } from "../types/user.types"

type Props = {
  users: User[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const UserList = (props: Props) => {
  const { users, onView, onEdit, onDelete } = props
  return (
    <>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>id: {user.id}</p>
            <p>fullname: {user.fullname}</p>
            <button type="button" onClick={() => onView(user.id)}>View</button>
            <button type="button" onClick={() => onEdit(user.id)}>Edit</button>
            <button type="button" onClick={() => onDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserList