import React from "react";
import Donform from "./donation_form";
import DonationList from "./donation_list";
import { POST } from "../utils";


function DonationLayout(){
    let [listData, setData] = React.useState([]);
    let [reRender,setreRender] = React.useState(false)
    
    function rerender(){
        setTimeout(()=>{
            setreRender(!reRender)
        },500)
    }

    React.useEffect(()=>{
        POST('/data',{query:'SELECT * FROM list ORDER BY ADD_TIME DESC'},(data)=>{
            setData(data)
        })
    },[reRender])

    return(<>
        <Donform props = {{rerender}} />
        <DonationList props ={{listData, rerender}} />
    </>)
}

export default DonationLayout;