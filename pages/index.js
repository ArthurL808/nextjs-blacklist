import Head from 'next/head'
import {useState} from 'react'


export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showForm, setShowForm] = useState(true)
  const handleChange = (e) =>{
  setFormData({...formData,[e.target.name]:e.target.value})
}
const handleLogin = async (e) =>{
  e.preventDefault();
  const user = await fetch(`http://localhost:3000/api/auth`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(formData),
  })
  const res = await defendant.json()
  setFormData({
    email: '',
    password: '',
  })
}

const handleRegistration = async (e) =>{
  console.log(formdata)
}


  return (
    <div>
      <Head>
        <title>Hawaii Bail Blacklist</title>
      </Head>
      <h1>Welcome to Hawaii Bail Blacklist</h1>
      {showForm ? 

      <form onSubmit={handleLogin}>
        <label>
          Email: 
          <input type="email" name="email" onChange={handleChange}/>
        </label>
        <label>
          Password: 
          <input type="password" name="password" onChange={handleChange}/>
        </label>
        <input type="submit" name="submit" value="submit"/>
        <p>Register a new account</p>
        <button onClick={()=>setShowForm(!showForm)}>Register account here!</button>
      </form> :

      <form onSubmit={handleRegistration}>
        <label>
          Email: 
          <input type="email" name="email" onChange={handleChange}/>
        </label>
        <label>
          Password: 
          <input type="password" name="password" onChange={handleChange}/>
        </label>
        <label>
          Confirm Password: 
          <input type="password" name="passwordConfirm" onChange={handleChange}/>
        </label>
        <input type="submit" name="submit" value="submit"/>
        <p>Already have an account</p>
        <button onClick={()=>setShowForm(!showForm)}>Login Here</button>
      </form>}
    </div>
  )
}
