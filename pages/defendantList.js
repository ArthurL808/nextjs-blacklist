import Styles from '../styles/DefendantsList.module.scss'
import {useState} from 'react'

const DefendantList = (props) =>{
    const [defendantSearch, setDefendantSearch] = useState('')
    const defendants = props.defendants
    return <div className={Styles.DefendantsListContainer}>

        <label htmlFor="defendantSearch">Defendant Search: </label>
        <input name='defendantSearch' type="search" placeholder='Search Name' onChange={(e)=>{
            setDefendantSearch(e.target.value)
        }}></input>


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
        <tbody className={Styles.defendantListBody}>
        {defendants.map((defendant)=>{
            return( <tr className={Styles.defendantRow} key={defendant.id}>
                <td>{defendant.first_name}</td>
                <td>{defendant.last_name}</td>
                <td>{defendant.dob}</td>
                <td>{defendant.height} Inches</td>
                <td>{defendant.weight} Lbs</td>
                <td>{defendant.gender}</td>
                <td>{defendant.race}</td>
                <td>{defendant.reasons}</td>
            </tr>)
        })}
        </tbody>
    </table>
        </div>
}

export const getStaticProps= async ()=>{
    const res = await fetch(`http://localhost:3000/api/defendants`)
    const defendants = await res.json();
    return {
        props:{
            defendants
        }
    }
}

export default DefendantList