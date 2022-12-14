import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import styles from "./Projects.module.css"

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "./ProjectCard"
import Loader from "../layout/Loader"



const Projects = () => {

  const [projects, setProjects] = useState([])
  const [removeLoader, setRemoveLoader] = useState(false)
  const [projectMessage, setProjectMessage] = useState()
  const [message, setMessage] = useState()

 
  const location = useLocation()

    useEffect(() => {
      setTimeout(() => {
        fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setProjects(data)
        setRemoveLoader(true)

        if(location.state){
          setMessage(location.state.message)
        }

      })
      .catch((err) => console.log(err))
      }, 1000);
      
    }, [])  

    const removeProject = (id) => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage("Projeto removido com sucesso!")
      })
      .catch((err) => console.log(err))
    }


  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto"/>
      </div>
      {message && <Message msg={message} type="success"/>}
      {projectMessage && <Message msg={projectMessage} type="success"/>}
      <Container customClass="start">
        {projects.length > 0 && (
          projects.map((project) => <ProjectCard 
            id={project.id}
            name={project.name}
            budget={project.budget}
            category={project.category.name}
            key={project.id}
            handleRemove={removeProject}
          />
        ))}
        {!removeLoader && <Loader />}
        {removeLoader && projects.length === 0 && (
          <p>N??o h?? projetos cadastrados</p>
        )}
      </Container>
    </div>
  )
}

export default Projects