import React, { useEffect, useState } from 'react'
const RunningTask = (props) => {
    const deviceId=props.deviceId.objectId
    const userName='golu@gmail.com', properties = props.properties

    const [listOfTasks, setListOfTasks] = useState([
        {taskName: "task1", memory:"5MB"},
        {taskName: "tasqfqk1", memory:"5MB"},
        {taskName: "task1", memory:"5MB"},
        {taskName: "taskwefqf", memory:"5MB"},
        {taskName: "tasqgk1", memory:"5MB"},
        {taskName: "task1", memory:"5MB"},
    ])

    const loadTasks = async() =>{
        console.log("loading tasks", deviceId, properties)
        //API POST request to the URL
    }

    const terminateTask= async (taskName) =>{
        console.log("Terminating", taskName)
        //API delete request
        loadTasks()
    }
    loadTasks()

    return (
        <>
            {listOfTasks?.map((props,index) => (
                <div className="functionNameBlock" key={index}>
                    <span className="details-box">
                        <span style={{display:"flex"}} className="runningTaskName" >{props.taskName}</span>
                        <span className="momary-use-details">{props.memory}</span>
                    </span>
                    <span className="material-symbols-outlined delete-btn" onClick = {()=>{terminateTask(props.taskName)}}>delete</span>
                </div>
            ))
            }

        </>
    )
}
export default RunningTask;