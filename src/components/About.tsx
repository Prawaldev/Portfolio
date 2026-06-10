const About = () => {
  return (
    <section id="about" className="py-20 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr,2fr] gap-10">
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Biography</h2>
        </div>
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            I'm a developer who enjoys creating websites, learning new technologies, and constantly improving my skills through hands-on projects. My journey started with curiosity and quickly turned into a passion for development, open-source, and Linux customization.
          </p>
          <p>
            I enjoy working on web applications, experimenting with different frameworks, and exploring ways to make technology more efficient and user-friendly. When I'm not coding, you'll probably find me tweaking my Linux setup, testing new tools, or working on personal projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
