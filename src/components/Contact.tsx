const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr,2fr] gap-10">
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Contact</h2>
        </div>
        <div className="space-y-6">
          <p className="text-xl text-gray-800">
            Have a question or want to work on something together? Drop me a message.
          </p>
          <div className="text-blue-600">
            <a href="https://github.com/Prawaldev" target="_blank" className="hover:underline">
              github.com/Prawaldev
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
