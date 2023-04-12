import React, { useEffect, useState } from 'react'
import { Link,useLocation, useParams, useNavigate } from "react-router-dom";
import RunningTask from "./RunningTask";

const backEndUrl='http://localhost:3000'

const MoreFunctions = () => {
    const navigate=useNavigate()
    let deviceId=useParams()
    const location = useLocation();

    const [properties, setproperties] = useState({deviceName: 'pc'})
    const RefreshPage =()=>{
        window.location.reload()
    }
    
    const loadPage =async () =>{
        try {
            const data={
                userName: "golu@gmail.com"
            }
            const token=localStorage.getItem('techshillaauthtoken')
    
            const options={
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": token

                },
                body: JSON.stringify(data)
            }

            const urlOfHit=backEndUrl+"/api/devices/getdetailpc/"+deviceId.objectId
            const response = await fetch(urlOfHit, options)
            const res= await response.json()

            if(res){
                setproperties({res})
            }
            
        } catch (error) {
            console.log(error)
            navigate('/')
        }
    }

    useEffect(()=>{
        loadPage()
    }, [])

    console.log(properties.res)


    return (
            <div className="morefunctions">
            <div className="pc-details">
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <span className="material-symbols-outlined computer-icon">computer</span>
                    <span className="Desktop-Name" >{properties.res?.deviceName}</span>
                </div>
                <div className="shutdown-hybernate-Btn">
                    <Link to="#"><button className="common-func-btn"><span className="material-symbols-outlined">power_settings_new</span></button></Link>
                    <Link to="#"><button className="common-func-btn hibernate-btn"><span className="material-symbols-outlined">error</span></button></Link>
                </div>
            </div>
            <div className="pcfunctions">
            <span className="material-symbols-outlined battery-icon">battery_horiz_075</span>
            <span className="material-symbols-outlined refresh-btn" onClick={RefreshPage}>refresh</span>
                <div className="allpcfunc">
                    <RunningTask deviceId={deviceId} backEndUrl={backEndUrl} properties={properties}/>
                </div>
            </div>
        </div>
    )
}

export default MoreFunctions;