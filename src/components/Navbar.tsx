const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <div className="text-lg font-bold text-gray-900 tracking-tighter">/prawal.dev</div>
        <div className="space-x-6 text-sm text-gray-600">
          <a href="#about" className="hover:text-black">about</a>
          <a href="#projects" className="hover:text-black">projects</a>
          <a href="#contact" className="hover:text-black">contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
