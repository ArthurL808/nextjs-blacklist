import Styles from '../styles/DefendantsList.module.scss'
import {useState} from 'react'
import {unstable_getServerSession} from 'next-auth/next'
import {authOptions} from './api/auth/[...nextauth]'
import {getDefendants} from '../services/defendantService'

const DefendantList = ({defendants,session}) =>{
    
    const [defendantSearch, setDefendantSearch] = useState('')

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        feet: null,
        inches: null,
        weight: null,
        gender: '',
        race: '',
        reason: '',
    })
    const [editFormData, setEditFormData] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        feet: null,
        inches: null,
        weight: null,
        gender: '',
        race: '',
        reason: '',
    })

    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const filteredDefendantsList = defendants.filter(defendant =>{
        if(defendant.first_name.toLowerCase().concat(" ",defendant.last_name.toLowerCase()).includes(defendantSearch.toLowerCase())){
            return defendant
        }
    })
     
    const convertFeetToInches = (data) => {
      const height = Number(data.feet) * 12 + Number(data.inches);
      delete data.feet
      delete data.inches
      data.height = height
      return data
    }

    const convertInchesToFeet = (defendant) =>{
        let feet = Math.floor(Number(defendant.height) / 12);
        let inches = defendant.height % 12;
        return defendant.feet = feet, defendant.inches = inches;
    }

    const handleChange = (e) =>{
        e.target.type === "number" ? setFormData({...formData,[e.target.name]:parseInt(e.target.value)}) :  setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleEditChange = (e) =>{
        e.target.type === "number" ? setEditFormData({...editFormData,[e.target.name]:parseInt(e.target.value)}) :  setEditFormData({...editFormData,[e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        convertFeetToInches(formData)
        const defendant = await fetch(`http://localhost:3000/api/defendants`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(formData),
        })
        const res = await defendant.json()
        setFormData({
            first_name: '',
            last_name: '',
            dob: '',
            feet: null,
            inches: null,
            weight: null,
            gender: '',
            race: '',
            reason: '',
        })
        setShow(false)
        defendants.push(res)
    }
    const handleEditSubmit = async (e) =>{
        e.preventDefault();
        convertFeetToInches(editFormData)
        const defendant = await fetch(`http://localhost:3000/api/defendants`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(editFormData),
        })
        const res = await defendant.json()
        setFormData({
            first_name: '',
            last_name: '',
            dob: '',
            feet: null,
            inches: null,
            weight: null,
            gender: '',
            race: '',
            reason: '',
        })
        setShowEdit(false)
    }

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:3000/api/defendants`,{
            method: 'DELETE',
            body: id
        })
        const deletedDefendant = await res.json()
    }
    
    return <div className={Styles.DefendantsListContainer}>
        {/* SearchBar Start */}
        <label htmlFor="defendantSearch">Defendant Search: </label>
        <input name='defendantSearch' type="search" placeholder='Search Name' onChange={(e)=>{
            setDefendantSearch(e.target.value)
        }}></input>
        <button onClick={()=> setShow(true)}>Add Defendant</button>
        {/* SearchBar End */}

    <table className={Styles.defendantList}>
        {/* Table Head Start */}
        <thead className={Styles.defendantListHeader}>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Gender</th>
            <th>Race</th>
            <th>Blacklist Reason</th>
        </tr>
        </thead>
        {/* Table Head End */}

        { defendantSearch ? <tbody className={Styles.defendantListBody}>
        {filteredDefendantsList.map((defendant)=>{
            return( <tr className={Styles.defendantRow} key={defendant.id}>
                <td>{defendant.first_name}</td>
                <td>{defendant.last_name}</td>
                <td>{defendant.dob}</td>
                <td>{defendant.height} Inches</td>
                <td>{defendant.weight} Lbs</td>
                <td>{defendant.gender}</td>
                <td>{defendant.race}</td>
                <td>{defendant.reason}</td>

                {/* Delete Defendant Button */}
                <td><button onClick={()=> handleDelete(defendant.id)}>Delete</button></td>

                {/* Open Edit Form Button */}
                <td><button onClick={()=> {
                    setEditFormData(defendant)
                    setShowEdit(true);}}>Edit</button></td>

            </tr>)
        })}
        </tbody> : <tbody className={Styles.defendantListBody}>
        {/* Full Defendants list Start */}
        {defendants.map((defendant)=>{
            convertInchesToFeet(defendant)
            return( <tr className={Styles.defendantRow} key={defendant.id}>
                <td>{defendant.first_name}</td>
                <td>{defendant.last_name}</td>
                <td>{defendant.dob}</td>
                <td>{`${defendant.feet}' ${defendant.inches} "`}</td>
                <td>{defendant.weight} Lbs</td>
                <td>{defendant.gender}</td>
                <td>{defendant.race}</td>
                <td>{defendant.reason}</td>

                {/* Delete Defendant Button */}
                <td><button onClick={()=> handleDelete(defendant.id)}>Delete</button></td>
                
                <td><button onClick={()=> {
                    setEditFormData(defendant)
                    setShowEdit(true);}}>Edit</button></td>
            </tr>)
        })}
        </tbody>}
        {/* Full Defendants list End */}
    </table>

    {/*Post defendant Form Start*/}
    {show ? <form className={Styles.defendantForm} onSubmit={handleSubmit}>
        <button onClick={()=>setShow(false)}>close</button>
        <label>
            First Name:
            <input type="text" name="first_name" onChange={handleChange}/>
        </label>
        <label>
            Last Name:
            <input type="text" name="last_name" onChange={handleChange}/>
        </label>
        <label>
            Date of Birth:
            <input type="date" name="dob" onChange={handleChange}/>
        </label>
        <label>
            Height: 
            <input type="number" name="feet" min={1} max={9} placeholder="Feet" onChange={handleChange} /> 
            <input type="number" name="inches" min={0} max={11} placeholder="Inches" onChange={handleChange} />
        </label>
        <label>
            Weight: 
            <input type="number" name="weight" placeholder="Lbs" onChange={handleChange}/>
        </label>
        <label>
           <p>Gender:</p>
           <label>Male:
            <input type="radio" name="gender" value="male" onChange={handleChange}/>
           </label>
            <label>Female:
            <input type="radio" name="gender" value="female" onChange={handleChange}/>
            </label>
            <label>Other:
            <input type="radio" name="gender" value="other" onChange={handleChange}/>
            </label>
        </label>
        <label>
            Race:
            <input type="text" name="race" onChange={handleChange}/>
        </label>
        <label>
            Reason:
            <input type="text" name="reason" onChange={handleChange}/>
        </label>
        <input type="submit" value="submit"/>
    </form> : null}
    {/* Post Defendant Form End */}
    
    {/*Edit Defendant Form Start */}
    {showEdit ? <form className={Styles.defendantForm} onSubmit={handleEditSubmit}>
        <button onClick={()=>setShowEdit(false)}>close</button>
        <label>
            First Name:
            <input type="text" name="first_name" defaultValue={editFormData.first_name} onChange={handleEditChange}/>
        </label>
        <label>
            Last Name:
            <input type="text" name="last_name" defaultValue={editFormData.last_name} onChange={handleEditChange}/>
        </label>
        <label>
            Date of Birth:
            <input type="date" name="dob" defaultValue={editFormData.dob} onChange={handleEditChange}/>
        </label>
        <label>
            Height: 
            <input type="number" name="feet" min={1} max={9} defaultValue={editFormData.feet} onChange={handleEditChange}placeholder="Feet" /> 
            <input type="number" name="inches" min={0} max={11} defaultValue={editFormData.inches} placeholder="Inches" onChange={handleEditChange} />
        </label>
        <label>
            Weight: 
            <input type="number" name="weight" placeholder="Lbs" defaultValue={editFormData.weight} onChange={handleEditChange}/>
        </label>
        <label>
           <p>Gender:</p>
           <label>Male:
            <input type="radio" name="gender" value="male" onChange={handleEditChange}/>
           </label>
            <label>Female:
            <input type="radio" name="gender" value="female" onChange={handleEditChange}/>
            </label>
            <label>Other:
            <input type="radio" name="gender" value="other" onChange={handleEditChange}/>
            </label>
        </label>
        <label>
            Race:
            <input type="text" name="race" defaultValue={editFormData.race} onChange={handleEditChange}/>
        </label>
        <label>
            Reason:
            <input type="text" name="reason" defaultValue={editFormData.reason} onChange={handleEditChange}/>
        </label>
        <input type="submit" value="submit"/>
    </form> : null}
    {/* Edit Defendant Form End */}
        </div>
}

export const getServerSideProps = async (context)=>{
    const session = await unstable_getServerSession(context.req,context.res,authOptions)
    if (!session) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
      const res = await getDefendants()
      const defendants = JSON.parse(JSON.stringify(res))

    return {
        props:{defendants,session}
    }
}

export default DefendantList