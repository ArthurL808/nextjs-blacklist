import defendants from '../defendants.json'
const DefendantList = () =>{

    return <table>
        <thead>
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
        <tbody>
        {defendants.map((defendant)=>{
           return( <tr key={defendant.id}>
                <td>{defendant.first_name}</td>
                <td>{defendant.last_name}</td>
                <td>{defendant.dob}</td>
                <td>{defendant.height}</td>
                <td>{defendant.weight}</td>
                <td>{defendant.gender}</td>
                <td>{defendant.race}</td>
                <td>{defendant.reasons}</td>
            </tr>)
        })}
        </tbody>
    </table>
}

export default DefendantList