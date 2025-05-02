import UserForm from './components/UserForm'
import './App.css'
import { useState } from 'react'
import { User } from './types/user.types'
import { v4 as uuidv4 } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'

const App = () => {
  /* Your states here */
  const [users, setUsers] = useState<User[]>([])
  const [userForEdit, setUserForEdit] = useState<User | null>(null)
  const [userForView, setUserForView] = useState<User | null>(null)

  /* Your handlers here */
  const handleAddUser = (user: Omit<User, 'id'>) => {
    setUsers(prevState =>
      [...prevState, {
        ...user,
        id: uuidv4()
      }]
    )
    toast.success('User added successfully')
  }

  const handleFindUserForView = (id: string) => {
    const foundUser = users.find(user => user.id === id)
    if (foundUser) {
      setUserForView(foundUser)
    } else {
      setUserForView(null)
    }
  }

  const handleFindUserForEdit = (id: string) => {
    const foundUser = users.find(user => user.id === id)
    if (foundUser) {
      setUserForEdit(foundUser)
    } else {
      setUserForEdit(null)
    }
  }

  const handleDelete = (id: string) => {
    setUsers(prevState => prevState.filter(user => user.id !== id))
    toast.success('User deleted successfully')
  }

  return (
    <>
      <div><Toaster/></div>
      <UserForm onSubmit={handleAddUser} userForEdit={userForEdit} />
      <UserList users={users} onView={handleFindUserForView} onEdit={handleFindUserForEdit} onDelete={handleDelete} />
      {userForView && <UserProfile user={userForView} />}
    </>
  )
}

export default App