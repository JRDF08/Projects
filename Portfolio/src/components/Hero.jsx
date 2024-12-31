// Components
import { ButtonPrimary } from "./Button";
import { ButtonOutline } from "./Button";

const Hero = () => {
  return (
    <section id="home" className="pt-28 lg:pt-36">
      <div className="container lg:grid lg:grid-cols-2 items-center lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <figure className="img-box w-9 h-9 rounded-lg">
              <img
                src="/avatar1.jpg"
                width={40}
                height={40}
                alt="John Rey Fernandez Avatar"
                className="img-cover"
              />
            </figure>

            <div className="flex items-center gap-1.5 text-slate-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>

          <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10">
            Creating scalable and future-ready modern websites.
          </h2>
          <div className="flex items-center gap-3">
            <ButtonPrimary
              href="/cv.pdf"
              label="Download CV"
              icon="download"
              download={true}
            />
            <ButtonPrimary
              label="Preview CV"
              icon="visibility"
              onClick={() => window.open("/cv.pdf", "_blank")}
            />
            <ButtonOutline
              href="#about"
              label="Scroll down"
              icon="arrow_downward"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <figure className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-slate-400 via-25% via-slate-400/40 to-65% rounded-[60px] overflow-hidden">
            <img
              src="/me.png"
              width={656}
              height={800}
              alt="John Rey Fernandez"
              className="w-full"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
