//Node Modules
import PropTypes from "prop-types";

// Components
import { ButtonPrimary } from "./Button";

const ProjectCard = ({
  imgSrc,
  title,
  tags,
  projectLink,
  projectCode,
  classes,
}) => {
  return (
    <div
      className={
        "relative p-4 rounded-2xl bg-slate-800 hover:bg-slate-700/50 active:bg-slate-700/60 ring-1 ring-inset ring-slate-50/5 transition-colors " +
        classes
      }
    >
      <figure className="img-box aspect-square rounded-lg mb-4">
        <img src={imgSrc} alt={title} loading="lazy" className="img-cover" />
      </figure>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="title-1 mb-3">{title}</h3>

          <div className="flex flex-wrap items-center gap-2">
            {tags.map((label, key) => (
              <span
                key={key}
                className="h-8 text-sm text-slate-400 bg-slate-50/5 grid items-center px-3 rounded-lg"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <div className="flex items-center gap-3">
              <ButtonPrimary
                label="Demo"
                onClick={() => window.open(projectLink, "_blank")}
              />
              <ButtonPrimary
                label="Code"
                onClick={() => window.open(projectCode, "_blank")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  projectLink: PropTypes.string.isRequired,
  projectCode: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default ProjectCard;
