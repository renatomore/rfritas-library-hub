import { PackageCard } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Package, GitFork } from "lucide-react";

// Mock data for demonstration
const packages = [
  {
    name: "thoc-ui",
    version: "0.2.0",
    description:
      "Thoc UI é um conjunto de componentes React reutilizáveis projetados para acelerar o desenvolvimento de aplicações web. É construído com TypeScript e styled-components, oferecendo uma ótima experiência de desenvolvimento e alta customização.",
    lastUpdated: "25/05/2025",
  },
];

const repositoryStats = {
  totalPackages: packages.length,
  forks: 89,
};

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Package className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                rfritas-ui-libraries
              </h1>
            </div>

            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              Coleção de componentes React modernos e reutilizáveis para
              acelerar o desenvolvimento de interfaces web elegantes e
              funcionais.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge
                variant="secondary"
                className="text-base px-4 py-2 bg-white/20 text-primary-foreground border-white/30"
              >
                {repositoryStats.totalPackages} Pacotes
              </Badge>
              <Badge
                variant="secondary"
                className="text-base px-4 py-2 bg-white/20 text-primary-foreground border-white/30"
              >
                <GitFork className="h-4 w-4 mr-1" />
                {repositoryStats.forks}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <a
                  href="https://github.com/renatomore/rfritas-ui-libraries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  Ver no GitHub
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
              >
                Documentação
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pacotes Disponíveis
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore nossos pacotes, projetados para auxiliar no seu
              desenvolvimento frontend.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                name={pkg.name}
                version={pkg.version}
                description={pkg.description}
                lastUpdated={pkg.lastUpdated}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-semibold">rfritas-ui-libraries</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/renatomore/rfritas-ui-libraries"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://npmjs.com/~rfritas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                NPM
              </a>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
