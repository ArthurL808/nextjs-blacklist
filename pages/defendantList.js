import Styles from '../styles/DefendantsList.module.scss'
import {useState} from 'react'

const DefendantList = (props) =>{
    const defendants = props.defendants
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
    const [show, setShow] = useState(false)
    
    const filteredDefendantsList = defendants.filter(defendant =>{
        if(defendant.first_name.toLowerCase().concat(" ",defendant.last_name.toLowerCase()).includes(defendantSearch.toLowerCase())){
            return defendant
        }
    })

    const handleChange = (e) =>{
        e.target.type === "number" ? setFormData({...formData,[e.target.name]:parseInt(e.target.value)}) :  setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
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
    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:3000/api/defendants`,{
            method: 'DELETE',
            body: id
        })
        const deletedDefendant = await res.json()
    }

    return <div className={Styles.DefendantsListContainer}>
        <label htmlFor="defendantSearch">Defendant Search: </label>
        <input name='defendantSearch' type="search" placeholder='Search Name' onChange={(e)=>{
            setDefendantSearch(e.target.value)
        }}></input>
        <button onClick={()=> setShow(true)}>Add Defendant</button>


    <table className={Styles.defendantList}>
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
                <td><button onClick={()=> handleDelete(defendant.id)}>Delete</button></td>
            </tr>)
        })}
        </tbody> : <tbody className={Styles.defendantListBody}>
        {defendants.map((defendant)=>{
            return( <tr className={Styles.defendantRow} key={defendant.id}>
                <td>{defendant.first_name}</td>
                <td>{defendant.last_name}</td>
                <td>{defendant.dob}</td>
                <td>{defendant.height} Inches</td>
                <td>{defendant.weight} Lbs</td>
                <td>{defendant.gender}</td>
                <td>{defendant.race}</td>
                <td>{defendant.reason}</td>
                <td><button onClick={()=> handleDelete(defendant.id)}>Delete</button></td>
            </tr>)
        })}
        </tbody>}
    </table>

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
        </div>
}

export const getStaticProps = async ()=>{
    const res = await fetch(`http://localhost:3000/api/defendants`)
    const defendants = await res.json();
    return {
        props:{
            defendants
        }
    }
}

export default DefendantList