// Components
import ProjectCard from "./ProjectCard";

const projects = [
  {
    imgSrc: "/project-5.png",
    title: "ServiceSync",
    tags: ["Node.js", "MongoDB", "Express", "React", "TailwindCSS", "shadcn"],
    projectLink: "https://servicesync.onrender.com/",
    projectCode: "https://github.com/JRDF08/Projects/tree/main/MERN%20App",
  },
  {
    imgSrc: "/project-4.png",
    title: "SoundScape",
    tags: ["Node.js", "Express", "MongoDb", "React", "TailwindCSS"],
    projectLink: "https://p4-soundscape.onrender.com",
    projectCode: "https://github.com/JRDF08/Projects/tree/main/Backend%20App",
  },
  {
    imgSrc: "/project-3.png",
    title: "SoundScape",
    tags: ["React"],
    projectLink: "https://soundscape-07un.onrender.com",
    projectCode: "https://github.com/JRDF08/Projects/tree/main/React%20App",
  },
  {
    imgSrc: "/project-2.png",
    title: "SoundScape",
    tags: ["Javascript"],
    projectLink: "https://soundscape-86ox.onrender.com/",
    projectCode:
      "https://github.com/JRDF08/Projects/tree/main/Vanilla%20JS%20App",
  },
  {
    imgSrc: "/project-1.png",
    title: "Web Dev Portfolio",
    tags: ["React"],
    projectLink: "https://portfolio-clwv.onrender.com/",
    projectCode: "https://github.com/JRDF08/Projects/tree/main/Portfolio",
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
