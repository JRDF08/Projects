const aboutItems = [
  {
    label: "Project done",
    number: 5,
  },
  {
    label: "Tools Used",
    number: 10,
  },
];

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="bg-slate-800/50 p-7 rounded-2xl md:p-12 reveal-up">
          <p className="text-slate-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch]">
            Hello! I&apos;m John Rey, an aspiring web developer and a student at
            Uplift Bootcamp. As a career shifter, I&apos;m passionate about
            transitioning into the technology field and building a fulfilling
            career.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-7">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key}>
                <div className="flex items-center md:mb-2">
                  <span className="text-2xl font-semibold md:text-4xl">
                    {number}
                  </span>
                  <span className="text-slate-400 font-semibold md:text-3xl">
                    +
                  </span>
                </div>

                <p className="text-sm text-slate-400">{label}</p>
              </div>
            ))}

            <img
              src="/logo.png"
              alt="logo"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
