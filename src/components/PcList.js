import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import "./pc.css"
const PcList = () => {
  const navigate= useNavigate()
  const backEndUrl='http://localhost:3000'
  const handleShutdown = async (deviceId) => {
    console.log("shuttng down", deviceId)
  }

  const handleHibernate = async (deviceId) => {
    console.log("hibernating", deviceId)
  }
  

  const dummy=[
    {
      deviceName: "Desktop 1",
      batteryPercentage: "93",
      batteryStatus: "193",
      deviceId: "6435ff2ceef41be206eb8615",
      properties: {
        brand: "HP",
        processor: "Intel Core i5",
        RAM: "8GB",
        storage: "256GB SSD",
        display: "23.8-inch",
      },
    },
    {
      deviceName: "Desktop 2",
      batteryPercentage: "93",
      deviceId: "234",
      batteryStatus: "193",
      properties: {
        brand: "Dell",
        processor: "Intel Core i7",
        RAM: "16GB",
        storage: "512GB SSD",
        display: "27-inch",
      },
    },
    {
      deviceName: "Desktop 3",
      batteryPercentage: "93",
      deviceId: "23wrgr4",
      batteryStatus: "193",
      properties: {
        brand: "Lenovo",
        processor: "AMD Ryzen 5",
        RAM: "12GB",
        storage: "1TB HDD",
        display: "21.5-inch",
      },
    },
  ]
  const [computers, setcomputers] = useState([])
  
  const loadPage = async ()=>{
    const token =localStorage.getItem('techshillaauthtoken');
    if(!token)
        navigate('/login')

    try {
        const data={
            userName: "golu@gmail.com"
        }

        const options={
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token": token

            },
            body: JSON.stringify(data)
        }

        const urlOfHit=backEndUrl+"/api/devices/devicelist"
        
        const response = await fetch(urlOfHit, options)
        const res= await response.json()
        console.log("server se ye aaya", res)

        if(res){
            setcomputers(res)
        }
    } catch (error) {
        console.log(error)
        navigate('/login')
    }  
}


  useEffect(()=>{
    loadPage()
  }, [])

    console.log(computers, 'f')
      
   

    return (
        <div className="pclist">
            {computers?.map((computer, index) => (
                <div className="pc-card" key={index}>
                    <div className="pcName">{computer.deviceName}</div>
                    <div className="pcFunc">
                        <button className="pcFuncBtn" onClick={()=>{handleShutdown(computer._id)}}>Shut Down</button>
                        <button className="pcFuncBtn" onClick={()=>{handleHibernate(computer._id)}}>Hibernate</button>
                    </div>
                    <Link to={`/moreinfo/${computer._id}`} ><button className="MoreInfoBtn">MoreInfo</button></Link>
                </div>
            ))
            }
        </div>
    )
}
export default PcList;