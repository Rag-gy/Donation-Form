import "./form.css"
// import "./form_tail.css"
import {POST} from "../utils"

function DonationList(props){

    let {listData, rerender} = props.props

    function deleteRecord(id){
        let query = `DELETE FROM LIST WHERE ID = ${id}`;
        POST('/data', {query})
        rerender()
    }

    let rows = listData.map((row, INDEX)=>{
        return (
            <tr key={row.id} onDoubleClick={()=>{deleteRecord(row.id)}}>
                <td>{INDEX+1}</td>
                <td>{row.date}</td>
                <td>{row.dname}</td>
                <td>{row.rname}</td>
                <td>{row.type}</td>
                <td>{row.data}</td>
                <td>{row.remark}</td>
            </tr>
        )
    })
    
    return(
        <div className="" >
            <table className="list">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Date</th>
                        <th>Donor Name</th>
                        <th>Reciever Name</th>
                        <th>Donation Type</th>
                        <th>Details</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default DonationList;