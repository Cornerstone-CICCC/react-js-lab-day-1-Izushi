import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { User } from "../types/user.types"

type Props = {
  onSubmit: (user: Omit<User, 'id'>) => void
  userForEdit?: User | null
}

const UserForm = (props: Props) => {
  const { onSubmit, userForEdit } = props
  const [formData, setFormData] = useState<User>({
    id: '',
    fullname: '',
    age: 0,
    education: '',
    gender: '',
    skills: [],
    bio: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement
      const checked = target.checked
      const skill = target.value
      setFormData(prevState => {
      if (checked) {
        return {
          ...prevState,
          skills: [...prevState.skills, skill]
        }
      } else {
        return {
          ...prevState,
          skills: prevState.skills.filter(skill => skill !== skill)
        }
      }
    })
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleClear = () => {
    setFormData({
      id: '',
      fullname: '',
      age: 0,
      education: '',
      gender: '',
      skills: [],
      bio: ''
    })
  }

  useEffect(() => {
    if (userForEdit) {
      setFormData(userForEdit)
    }
  }, [userForEdit])

  return (
    <>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" onChange={handleChange} value={formData.fullname} placeholder="Full Name" />
        <input type="number" name="age" onChange={handleChange} value={formData.age} placeholder="Age" />
        <select name="education" onChange={handleChange} value={formData.education}>
          <option value="">Select your education</option>
          <option value="GradeSchool">Grade School</option>
          <option value="HighSchool">High School</option>
          <option value="College">College</option>
        </select>
        <div>
          <p>Gender</p>
          <label>
            Male
            <input type="radio" name="gender" onChange={handleChange} value="Male" checked={formData.gender === 'Male'} />
          </label>
          <label>
            Female
            <input type="radio" name="gender" onChange={handleChange} value="Female" checked={formData.gender === "Female"} />
          </label>
          <label>
            Other
            <input type="radio" name="gender" onChange={handleChange} value="Other" checked={formData.gender === "Other"} />
          </label>
        </div>
        <div>
          <p>Skills</p>
          <label>
            TypeScript
            <input type="checkbox" name="skills" value="TypeScript" onChange={handleChange} checked={formData.skills.includes("TypeScript")} />
          </label>
          <label>
            React
            <input type="checkbox" name="skills" value="React" onChange={handleChange} checked={formData.skills.includes("React")} />
          </label>
          <label>
            Node
            <input type="checkbox" name="skills" value="Node" onChange={handleChange} checked={formData.skills.includes("Node")} />
          </label>
          <label>
            NoSQL
            <input type="checkbox" name="skills" value="NoSQL" onChange={handleChange} checked={formData.skills.includes("NoSQL")} />
          </label>
        </div>
        <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
        <button>Submit</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
    </>
  )
}

export default UserForm