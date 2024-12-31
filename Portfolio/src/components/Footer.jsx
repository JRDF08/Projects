// Components
import { ButtonPrimary } from "./Button";

const sitemap = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Project",
    href: "#project",
  },
  {
    label: "Contact me",
    href: "#contact",
  },
];

const socials = [
  {
    label: "GitLab",
    href: "https://gitlab.com/JRDF",
  },
  {
    label: "GitHub",
    href: "https://github.com/JRDF08",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jrdf",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/fernandez.johnrey08/",
  },
];

const Footer = () => {
  return (
    <footer className="section">
      <div className="container">
        <div className="lg:grid lg:grid-cols-2">
          <div className="mb-10">
            <h2 className="headline-1 mb-8 lg:max-w-[12ch] reveal-up">
              Let&apos;s work together today!
            </h2>
            <ButtonPrimary
              href="mailto:john.rey.d.fernandez08@gmail.com"
              label="Start Project"
              icon="chevron_right"
              classes="reveal-up"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:pl-20">
            <div>
              <p className="mb-2 reveal-up">Sitemap</p>
              <ul>
                {sitemap.map(({ label, href }, key) => (
                  <li key={key}>
                    <a
                      href={href}
                      className="block text-sm text-slate-400 py-1 transition-colors hover:text-slate-200 reveal-up"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 reveal-up">Socials</p>
              <ul>
                {socials.map(({ label, href }, key) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      className="block text-sm text-slate-400 py-1 transition-colors hover:text-slate-200 reveal-up"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-10 mb-8">
          <a href="/" className="logo reveal-up">
            <img src="/logo.png" width={40} height={40} alt="Logo" />
          </a>

          <p className="text-slate-500 text-sm reveal-up">
            &copy; 2024 <span className="text-slate-200">JRDF</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
