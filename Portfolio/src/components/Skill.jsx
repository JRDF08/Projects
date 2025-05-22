// Components
import SkillCard from "./SkillCard";

const skillItem = [
  {
    imgSrc: "/figma.png",
    label: "Figma",
    desc: "Design Tool",
  },
  {
    imgSrc: "/vscode.png",
    label: "VSCode",
    desc: "Code Editor",
  },
  {
    imgSrc: "/gitlab.png",
    label: "GitLab",
    desc: "Git Repository",
  },
  {
    imgSrc: "/github.png",
    label: "Github",
    desc: "Git Repository",
  },
  {
    imgSrc: "/css.png",
    label: "CSS",
    desc: "User Interface",
  },
  {
    imgSrc: "/tailwindcss.png",
    label: "TailwindCSS",
    desc: "User Interface",
  },
  {
    imgSrc: "javascript.png",
    label: "JavaScript",
    desc: "Interaction",
  },
  {
    imgSrc: "/react.png",
    label: "React",
    desc: "Library",
  },
  {
    imgSrc: "/angular.png",
    label: "Angular",
    desc: "Framework",
  },
  {
    imgSrc: "/nodejs.png",
    label: "NodeJS",
    desc: "Web Server",
  },
  {
    imgSrc: "/expressjs.png",
    label: "ExpressJS",
    desc: "Node Framework",
  },
  {
    imgSrc: "/mongodb.png",
    label: "MongoDB",
    desc: "Database",
  },
];

const Skill = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 reveal-up">Essential Tools I use</h2>

        <p className="text-slate-400 mt-3 mb-8 max-w-[50ch] reveal-up">
          Explore the advanced tools and technologies I leverage to craft
          outstanding, high-performance websites and applications.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
          {skillItem.map(({ imgSrc, label, desc }, key) => (
            <SkillCard
              key={key}
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              classes="reveal-up"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
