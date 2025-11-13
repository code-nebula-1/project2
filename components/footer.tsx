export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>© {new Date().getFullYear()} Sam Reig Research Lab. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a 
              href="/contact" 
              className="transition-colors hover:text-foreground"
            >
              Contact
            </a>
            <a 
              href="/publication" 
              className="transition-colors hover:text-foreground"
            >
              Publications
            </a>
            <a 
              href="/teams" 
              className="transition-colors hover:text-foreground"
            >
              Team
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

