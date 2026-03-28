const SiteFooter = () => {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-border">
      <div className="grid md:grid-cols-4 gap-8 md:gap-12">
        <div>
          <a href="#" className="font-display text-xl tracking-[0.3em] text-foreground">
            SONO
          </a>
          <p className="text-muted-foreground text-xs mt-3 leading-relaxed">
            Independent Music Label
            <br />
            Crafting Sound Since 2024
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs tracking-wider mb-3">NAVIGATE</p>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-foreground/70 text-sm hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-foreground/70 text-sm hover:text-primary transition-colors">About</a>
            <a href="#releases" className="text-foreground/70 text-sm hover:text-primary transition-colors">Releases</a>
            <a href="#news" className="text-foreground/70 text-sm hover:text-primary transition-colors">News</a>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-xs tracking-wider mb-3">LISTEN</p>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-foreground/70 text-sm hover:text-primary transition-colors">Spotify</a>
            <a href="#" className="text-foreground/70 text-sm hover:text-primary transition-colors">Apple Music</a>
            <a href="#" className="text-foreground/70 text-sm hover:text-primary transition-colors">YouTube Music</a>
            <a href="#" className="text-foreground/70 text-sm hover:text-primary transition-colors">SoundCloud</a>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-xs tracking-wider mb-3">CONNECT</p>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-foreground/70 text-sm hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="text-foreground/70 text-sm hover:text-primary transition-colors">Twitter</a>
            <a href="#contact" className="text-foreground/70 text-sm hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
        <p className="text-muted-foreground text-xs">
          © 2024 SONO. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
