import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Github,
  Package,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Types
interface PackageProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PackageInfo {
  name: string;
  version: string;
  description: string;
  longDescription: string;
  lastUpdated: string;
  downloads: number;
  size: string;
  dependencies: string[];
  installation: string;
  usage: string;
  props: PackageProp[];
}

// Constants
const GITHUB_BASE_URL = "https://github.com/renatomore/rfritas-ui-libraries/tree/main/packages";
const NPM_BASE_URL = "https://npmjs.com/package/@rfritas";
const COPY_TIMEOUT = 2000;

// Mock data
const packageData: Record<string, PackageInfo> = {
  "thoc-ui": {
    name: "thoc-ui",
    version: "0.2.0",
    description:
      "Thoc UI é um conjunto de componentes React reutilizáveis projetados para acelerar o desenvolvimento de aplicações web.",
    longDescription:
      "Thoc UI é um conjunto de componentes React reutilizáveis projetados para acelerar o desenvolvimento de aplicações web. É construído com TypeScript e styled-components, oferecendo uma ótima experiência de desenvolvimento e alta customização.",
    lastUpdated: "25/05/2025",
    downloads: 53,
    size: "89.1kb",
    dependencies: [],
    installation: "npm install @rfritas-ui/thoc-ui",
    usage: `import { MainButton } from '@rfritas-ui/thoc-ui';

function App() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}`,
    props: [
      {
        name: "variant",
        type: "string",
        default: "default",
        description: "Variação visual do botão",
      },
      {
        name: "size",
        type: "string",
        default: "md",
        description: "Tamanho do botão",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Estado desabilitado",
      },
    ],
  },
  "rfritas-input": {
    name: "rfritas-input",
    version: "1.8.2",
    description:
      "Campo de entrada com validação automática e feedback visual para melhor UX.",
    longDescription:
      "Input component com validação em tempo real, suporte a máscaras, ícones e estados de erro/sucesso integrados.",
    lastUpdated: "há 1 semana",
    downloads: 8930,
    size: "18.7kb",
    dependencies: ["react", "react-hook-form", "tailwindcss"],
    installation: "npm install rfritas-input",
    usage: `import { Input } from 'rfritas-input';

function App() {
  return (
    <Input 
      placeholder="Digite seu email"
      type="email"
      required
    />
  );
}`,
    props: [
      {
        name: "type",
        type: "string",
        default: "text",
        description: "Tipo do input HTML",
      },
      {
        name: "required",
        type: "boolean",
        default: "false",
        description: "Campo obrigatório",
      },
      {
        name: "placeholder",
        type: "string",
        default: "",
        description: "Texto de placeholder",
      },
    ],
  },
};

// Componente reutilizável para código copiável
interface CopyableCodeProps {
  content: string;
  type: "install" | "usage";
  copiedType: "install" | "usage" | null;
  onCopy: (text: string, type: "install" | "usage") => void;
  isPreformatted?: boolean;
}

const CopyableCode = ({
  content,
  type,
  copiedType,
  onCopy,
  isPreformatted = false,
}: CopyableCodeProps) => (
  <div className="bg-muted p-4 rounded-lg relative group">
    {isPreformatted ? (
      <pre className="text-sm font-mono overflow-x-auto">
        <code>{content}</code>
      </pre>
    ) : (
      <code className="text-sm font-mono">{content}</code>
    )}
    <Button
      size="sm"
      variant="ghost"
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={() => onCopy(content, type)}
    >
      {copiedType === type ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  </div>
);

export default function PackageDetails() {
  const { packageName } = useParams();
  const [copiedType, setCopiedType] = useState<"install" | "usage" | null>(
    null
  );

  const packageInfo = packageData[packageName || ""];

  if (!packageInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pacote não encontrado</h1>
          <Button asChild>
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, type: "install" | "usage") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast.success("Copiado para a área de transferência!");
    setTimeout(() => setCopiedType(null), COPY_TIMEOUT);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar aos pacotes
            </Link>
          </Button>

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-primary">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{packageInfo.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="default">v{packageInfo.version}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {packageInfo.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`${GITHUB_BASE_URL}/${packageInfo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`${NPM_BASE_URL}/${packageInfo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {packageInfo.longDescription}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Instalação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CopyableCode
                  content={packageInfo.installation}
                  type="install"
                  copiedType={copiedType}
                  onCopy={copyToClipboard}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exemplo de Uso</CardTitle>
              </CardHeader>
              <CardContent>
                <CopyableCode
                  content={packageInfo.usage}
                  type="usage"
                  copiedType={copiedType}
                  onCopy={copyToClipboard}
                  isPreformatted
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Propriedades</CardTitle>
                <CardDescription>
                  Lista de props disponíveis para o componente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-4 font-medium">
                          Nome
                        </th>
                        <th className="text-left py-2 px-4 font-medium">
                          Tipo
                        </th>
                        <th className="text-left py-2 px-4 font-medium">
                          Padrão
                        </th>
                        <th className="text-left py-2 px-4 font-medium">
                          Descrição
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {packageInfo.props.map(
                        (prop: PackageProp, index: number) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="py-3 px-4 font-mono text-sm">
                              {prop.name}
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{prop.type}</Badge>
                            </td>
                            <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                              {prop.default}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {prop.description}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Downloads</span>
                  <span className="font-medium">
                    {packageInfo.downloads.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tamanho</span>
                  <span className="font-medium">{packageInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Versão</span>
                  <span className="font-medium">v{packageInfo.version}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dependências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {packageInfo.dependencies.map((dep, index) => (
                    <Badge key={index} variant="secondary">
                      {dep}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
