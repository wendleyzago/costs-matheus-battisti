import { useEffect, useState } from "react"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

import styles from "./ProjectForm.module.css"


const ProjectForm = ({btnText, handleSubmit, projectData}) => {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        setCategories(data)
    })
    .catch((err) => console.log(err))
  }, [])


  const submit = (e) => {
    e.preventDefault()

    handleSubmit(project)
  }

  const handleChange = (e) => {
    setProject({...project, [e.target.name]: e.target.value})
  }

  const handleCategory = (e) => {
    setProject({...project, 
        category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
  }

  return (
    <form className={styles.form} onSubmit={submit}>
        <Input 
            type="text" 
            text="Nome do projeto" 
            placeholder="Insira o nome do projeto"
            name="name"
            handleOnChange={handleChange}
            value={project.name ? project.name : ""}
        />
        <Input 
            type="number" 
            text="Orçamento do projeto" 
            placeholder="Insira o orçamento total"
            name="budget"
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ""}
        />
        <Select 
            name="category_id" 
            text="Selecione a categoria" 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ""}
        />

        <SubmitButton 
            type="submit" 
            text={btnText} 
        /> 
    </form>
  )
}

export default ProjectForm