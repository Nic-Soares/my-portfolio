# Portfolio Nicolas Soares

Um portfólio moderno desenvolvido com React, TypeScript e Material Design 3, apresentando projetos de visualização de dados e desenvolvimento web.

## 🏗️ Estrutura do Projeto

```
my-portfolio/
├── client/                         # Frontend React
│   ├── assets/                     # Assets estáticos
│   │   ├── favicon/               # Favicons e manifesto
│   │   ├── icons/                 # Ícones SVG
│   │   ├── images/                # Imagens do projeto
│   │   └── logos/                 # Logos de empresas
│   ├── public/                    # Arquivos públicos
│   ├── src/                       # Código fonte React
│   │   ├── components/            # Componentes React

│   │   │   ├── common/           # Componentes reutilizáveis
│   │   │   ├── layout/           #
 Componentes de layout
│   │   │   └── sections/         # Seções específicas
│   │   ├── style/                # Estilos globais
│   │   ├── main.tsx              # Entry point
│   │   └── App.tsx               # Componente principal
│   ├── index.html                 # Template HTML
│   ├── tsconfig.json             # Config TypeScript (client)
│   └── tsconfig.node.json        # Config TypeScript (Node)
│
├── server/                        # Backend (futuro)
│   └── [estrutura do servidor]
│
├── shared/                        # Código compartilhado
│   └── types/                     # Tipos TypeScript
│       └── types.ts              # Interfaces e tipos
│
├── dist/                          # Build compilado
│
├── .gitignore
├── package.json                   # Dependências principais
├── tsconfig.json                  # Config TypeScript raiz
├── vite.config.ts                # Configuração Vite
└── README.md
```

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material Design 3 (Material Web Components)
- **Styling**: CSS Modules
- **Icons**: Material Symbols, SVG Components
- **Fonts**: Roboto, Material Symbols

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Comandos

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Sistema de Design

O projeto utiliza Material Design 3 com:
- **Componentes**: Material Web Components
- **Tipografia**: Roboto
- **Ícones**: Material Symbols Outlined
- **Cores**: Esquema de cores baseado no Material 3
- **Layout**: Sistema flexível e responsivo

## 📁 Aliases de Importação

O projeto está configurado com aliases para facilitar imports:

```typescript
// Componentes e código fonte
import Component from '@/components/Component'

// Assets (logos, ícones, imagens)
import Logo from '@assets/logos/logo.svg?react'

// Tipos compartilhados
import type { Company } from '@shared/types/types'
```

### Vantagens dos Path Aliases:
- ✅ **Imports mais limpos**: `@shared/types/types` ao invés de `../../../shared/types/types`
- ✅ **Facilita refatoração**: Não quebra quando você move arquivos
- ✅ **Melhor organização**: Separa tipos compartilhados em `shared/`
- ✅ **Autocompletar**: Funciona perfeitamente no VS Code
- ✅ **Menos erros**: Não precisa contar `../../../`

## 🔧 Configuração

### Vite
- **Root**: `client/` - Todo o código frontend
- **Public**: `client/public/` - Assets estáticos
- **Build**: `dist/client/` - Build compilado
- **Plugins**: React, SVGR para importar SVGs como componentes

### TypeScript
- Configuração modular com `tsconfig.json` na raiz e específico no client
- Path mapping configurado para aliases
- Strict mode habilitado
- Suporte completo para JSX e React

## 📋 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build local
- `npm run lint` - Executa linting (se configurado)

## 🎯 Funcionalidades

- [x] Layout responsivo com sidebar de navegação
- [x] Sistema de roteamento por estado
- [x] Seção Hero com informações pessoais
- [x] Showcase de empresas parceiras
- [x] Carousel de projetos
- [x] Path aliases configurados (@/, @assets, @shared)
- [x] Importação de SVGs como React components
- [ ] Seção de serviços
- [ ] Página sobre mim
- [ ] Sistema de temas (claro/escuro)
- [ ] Internacionalização (pt/en)

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e feedback são sempre bem-vindos!

## 📄 Licença

Este projeto está sob licença privada. Todos os direitos reservados.

---

**Nicolas Soares** - Data Visualization & Frontend Developer