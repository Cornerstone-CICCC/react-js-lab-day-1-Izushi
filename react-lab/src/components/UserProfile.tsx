import { User } from "../types/user.types"

type Props = {
  user: User
}

const UserProfile = (props: Props) => {
  const { user } = props
  return (
    <>
      <h2>User Profile</h2>
      <div>
        <p>id: {user.id}</p>
        <p>fullname: {user.fullname}</p>
        <p>age: {user.age}</p>
        <p>education: {user.education}</p>
        <p>gender: {user.gender}</p>
        <p>skills: {user.skills.join(', ')}</p>
        <p>bio: {user.bio}</p>
      </div>
    </>
  )
}

export default UserProfile