// Components
import ProjectCard from "./ProjectCard";

const projects = [
  {
    imgSrc: "/project-5.png",
    title: "ServiceSync (MERN App)",
    tags: ["API", "MVC", "Development"],
    projectLink: "https://servicesync.onrender.com/",
    projectCode:
      "https://gitlab.com/uplift-code-camp/students/batch-22/grouping/projects/group-2",
  },
  {
    imgSrc: "/project-4.png",
    title: "SoundScape (Backend App)",
    tags: ["API", "SPA"],
    projectLink: "https://p4-soundscape.onrender.com",
    projectCode:
      "https://gitlab.com/uplift-code-camp/students/batch-22/john-rey-fernandez/projects/-/tree/p4-node-app/p4-node-app?ref_type=heads",
  },
  {
    imgSrc: "/project-3.png",
    title: "SoundScape (React App)",
    tags: ["Development", "API"],
    projectLink: "https://soundscape-07un.onrender.com",
    projectCode:
      "https://gitlab.com/uplift-code-camp/students/batch-22/john-rey-fernandez/projects/-/tree/p3-react-app/p3-react-app",
  },
  {
    imgSrc: "/project-2.png",
    title: "SoundScape (Vanilla JS App)",
    tags: ["Development", "API"],
    projectLink: "https://soundscape-86ox.onrender.com/",
    projectCode:
      "https://gitlab.com/uplift-code-camp/students/batch-22/john-rey-fernandez/projects/-/tree/p2-js-api-app/p2-js-api-app",
  },
  {
    imgSrc: "/project-1.png",
    title: "Web Dev Portfolio",
    tags: ["Web-design", "Development"],
    projectLink: "https://my-portfolio-e290.onrender.com",
    projectCode:
      "https://gitlab.com/uplift-code-camp/students/batch-22/john-rey-fernandez/projects/-/tree/p1-web-dev-portfolio/p1-web-dev-portfolio",
  },
];

const Project = () => {
  return (
    <section id="project" className="section">
      <div className="container">
        <h2 className="headline-2 mb-8 reveal-up">My Portfolio Highlights</h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))]">
          {projects.map(
            ({ imgSrc, title, tags, projectLink, projectCode }, key) => (
              <ProjectCard
                key={key}
                imgSrc={imgSrc}
                title={title}
                tags={tags}
                projectLink={projectLink}
                projectCode={projectCode}
                classes="reveal-up"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Project;
