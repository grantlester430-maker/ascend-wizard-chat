const Footer = () => {
  return (
    <footer className="bg-foreground py-8 border-t border-background/10">
      <div className="container mx-auto px-6 text-center">
        {/* Hidden easter egg - super tiny and barely visible */}
        <div className="opacity-[0.08] hover:opacity-30 transition-opacity duration-700 cursor-default select-none">
          <p className="font-garamond italic text-[6px] text-background/60 tracking-widest">
            We are always the best in the industry
          </p>
          <p className="font-garamond text-[5px] text-background/40 mt-0.5">
            @realmfascendthebestinthegameofficalfuckingaccount | © {new Date().getFullYear()} All Rights Reserved
          </p>
          <div className="flex justify-center gap-1 mt-0.5">
            <span className="text-[4px] text-background/30">🔒</span>
            <span className="font-garamond text-[4px] text-background/30">Fully Secured & Encrypted</span>
            <span className="text-[4px] text-background/30">🔒</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
