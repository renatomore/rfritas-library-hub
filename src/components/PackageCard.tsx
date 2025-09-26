import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Package, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

interface PackageCardProps {
  name: string;
  version: string;
  description: string;
  lastUpdated: string;
  downloads?: number;
}

export const PackageCard = ({ name, version, description, lastUpdated, downloads }: PackageCardProps) => {
  return (
    <Card className="group transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30 border-border/50">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  v{version}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <GitBranch className="h-3 w-3" />
                  {lastUpdated}
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button asChild className="flex-1" variant="default">
            <Link to={`/package/${name}`}>
              Ver Detalhes
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href={`https://npmjs.com/package/${name}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};