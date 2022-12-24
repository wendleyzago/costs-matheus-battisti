import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"


import styles from "./Project.module.css"

const Project = () => {

    const { id } = useParams()

    const [project, setProject] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setProject(data)
        })
        .catch((err)=> console.log(err))
    }, [id])
    

    return (
        <div>
            {id}
        </div>
    )


}

export default Project