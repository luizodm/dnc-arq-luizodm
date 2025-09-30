import { useContext, useState, useEffect } from 'react'
import './ProjectsList.css'

// ASSETS
import LikeOutline from '../..//assets/like.svg'
import LikeFilled from '../..//assets/like-filled.svg'

// COMPONENTS
import Button from '../Button/Button'

// CONTEXT
import { AppContext } from '../../contexts/AppContext'

// UTILS
import { getApiData } from '../../services/apiServices'

function ProjectsList() {
    const [projects, setProjects] = useState([])
    const [favProjects, setFavProject] = useState([])
    const appContext = useContext(AppContext)
    const handleFavProjects = (id) => {
        setFavProject((prevFavProjects) => {
            if (prevFavProjects.includes(id)) {
                const filtedArray = prevFavProjects.filter((projectId) => projectId !== id)
                sessionStorage.setItem('favProjects', JSON.stringify(filtedArray))
                return prevFavProjects.filter((projectId) => projectId !== id)
            } else {
                sessionStorage.setItem('favProjects', JSON.stringify([...prevFavProjects, id]))
                return [...prevFavProjects, id]
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getApiData('projects')

                const list =
                    Array.isArray(res) ? res :
                        Array.isArray(res?.projects) ? res.projects :
                            Array.isArray(res?.items) ? res.items :
                                []

                setProjects(list)
            } catch {
                setProjects([])
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const savedFavProjects = JSON.parse(sessionStorage.getItem("favProjects"))
        if (savedFavProjects) {
            setFavProject(savedFavProjects)
        }
    }, [])

    return (
        <div className="projects-section">
            <div className="projects-hero">
                <h2>{appContext.languages[appContext.language].projects.title}</h2>
                <p>{appContext.languages[appContext.language].projects.subtitle}</p>
            </div>
            <div className="projects-grid">
                {
                    projects ?
                        projects.map((project) => (
                            <div className="project-card d-flex jc-center al-center fd-column" key={project.id}>
                                <div
                                    className="thumb tertiary-background"
                                    style={{ backgroundImage: `url(${project.thumb})` }}
                                ></div>
                                <h3>{project.title}</h3>
                                <p>{project.subtitle}</p>
                                <Button buttonStyle="unstyled" onClick={() => handleFavProjects(project.id)}>
                                    <img src={favProjects.includes(project.id) ? LikeFilled : LikeOutline} height="20px" />
                                </Button>
                            </div>
                        )) : null
                }
            </div>
        </div>
    )
}

export default ProjectsList