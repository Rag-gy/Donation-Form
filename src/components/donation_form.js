import "./form.css";
// import "./form_tail.css";
import { useState } from "react";
import { POST } from "../utils";


function Donform(props) {

    let [dname_valid, isDnameValid] = useState(true);
    let [rname_valid, isRnameValid] = useState(true);
    let [date_valid, isDateValid] = useState(true);
    let [data_valid, isDataValid] = useState(true);
    let [remark_valid, isRemarkValid] = useState(true);
    let [formData,setformData] = useState({type:'Blood'})
    let {rerender} = props.props

    function submitHandler(e){
        let time = dateString + " " + timeString
        let name = e.target.name
        let value = e.target.value
        setformData(formData=>({...formData,[name]:value, ["ADD_TIME"]:time}))
    }

    
    function submitForm(){

        var isValid = true;

        
        if(formData.dname === undefined || formData.dname.trim().length === 0){
            isDnameValid(false);
            isValid = false;
        }
        else{
            isDnameValid(true);
        }

        if(formData.rname === undefined || formData.rname.trim().length === 0){
            isRnameValid(false);
            isValid = false;
        }
        else{
            isRnameValid(true);
        }

        if(formData.data === undefined || formData.data.trim().length === 0){
            isDataValid(false);
            isValid = false;
        }
        else{
            isDataValid(true);
        }

        if(formData.remark === undefined || formData.remark.trim().length === 0){
            isRemarkValid(false);
            isValid = false;
        }
        else{
            isRemarkValid(true);
        }

        if(formData.date === undefined || formData.date.trim().length === 0){
            isDateValid(false);
            isValid = false;
        }
        else{
            isDateValid(true);
        }
        
        if(isValid === true){
            console.log(formData)
            let query = `INSERT INTO LIST VALUES (${parseInt(Math.random()*10000000)},'${formData.dname}','${formData.rname}','${formData.date}','${formData.type}','${formData.data}','${formData.remark}', '${formData.ADD_TIME}')`
            console.log(query)
            POST('/data',{query})
            rerender()
            setformData({type:'Blood'})
        }
    }

    let date = new Date()
    let formatOptions = {
        'year' : 'numeric',
        'month' : 'numeric',
        'day' : 'numeric',

        'hour' :'numeric',
        'minute' : 'numeric',
        'second' : 'numeric',
        'hourCycle' :'h24'
    }
    let f = new Intl.DateTimeFormat('hi',formatOptions)
    let [dateString,timeString] = f.format(date).split(',')
    let maxDate = new Date().toISOString().split("T")[0];
    console.log(dateString,timeString)

    return (
        <div className="main-form">
            <form id="form" onReset={(e)=>{e.target.reset()}}><br />
                <label className = {`${!dname_valid ? 'invalid': ''}`}>Donor Name: </label>
                <input className = {`${!dname_valid ? 'invalid': ''}`} type="text" id="donor_name" name="dname" placeholder="Donor Name" required onChange={submitHandler}/><br /><br />
                <label className = {`${!rname_valid ? 'invalid': ''}`}>Reciever Name: </label>
                <input className = {`${!rname_valid ? 'invalid': ''}`} type="text" id="reciever_name" placeholder="Reciever Name" name="rname" required onChange={submitHandler}/><br /><br />
                <label className = {`${!date_valid ? 'invalid': ''}` }>Date: </label>
                <input className = {`${!date_valid ? 'invalid': ''}` } type="date" id="date" name="date" required min="2000-01-01" max={maxDate} onChange={submitHandler}/><br /><br />
                <label>Type of Donation: </label>
                <select name="type" id="type" required onChange={submitHandler}>
                    <option value="Blood">Blood</option>
                    <option value="Money">Money</option>
                    <option value="Toys">Toys</option>
                    <option value="Others">Others</option>
                </select>
                <input className = {`${!data_valid ? 'invalid': ''}` } type="text" placeholder="Context of Donation" name="data" id="data" required onChange={submitHandler}/><br /><br />
                <label className = {`${!remark_valid ? 'invalid': '' }`}>Remarks: </label>
                <input className = {`${!remark_valid ? 'invalid': '' }`} type="text" placeholder="Summary"id = "remark" name="remark" onChange={submitHandler}/><br /><br />
                <input type="reset" onClick={submitForm} id="submitButton" value="Submit"/>
            </form>
        </div>
    );
}

export default Donform;