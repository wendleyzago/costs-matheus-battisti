import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import Loader from "../layout/Loader"
import Container from "../layout/Container"


import styles from "./Project.module.css"

const Project = () => {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setProject(data)
            })
            .catch((err)=> console.log(err))
        }, 300);
    }, [id])
    
    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }

    return (
       <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>
                            {!showProjectForm ? "Editar projeto" : "Fechar"}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name }
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <p>detalhes do projeto</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loader />
        )}
       </>
    )
}

export default Project