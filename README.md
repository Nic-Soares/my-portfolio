# Portfolio Nicolas Soares

Um portfólio moderno desenvolvido com React, TypeScript e Material Design 3, apresentando projetos de visualização de dados e desenvolvimento web.

## 🏗️ Estrutura do Projeto

```
my-portfolio/
├── client/                         # Frontend React
│   ├── index.html                  # Template HTML (raiz do app Vite)
│   ├── vite.config.ts              # Configuração Vite (local ao client)
│   ├── public/                     # Assets estáticos servidos como estão
│   └── src/
│       ├── app/                    # Bootstrap, App.tsx, rotas, páginas raiz
│       ├── components/             # Componentes reutilizáveis (layout, ui)
│       ├── features/               # Módulos por domínio (home, work)
│       ├── styles/                 # CSS global, temas, tipografia
│       ├── types/                  # Tipos e module declarations globais
│       └── main.tsx                # Entry point
│
├── docs/adr/                       # Architecture Decision Records
│
├── deno.json                       # Manifesto único: deps, tasks, compilerOptions
├── deno.lock                       # Lockfile do Deno
├── biome.json                      # Configuração de lint/format (Biome)
└── README.md
```

> `server/` (backend) ainda não existe neste repositório — vai ser adicionado como um workspace separado quando começar a ser desenvolvido.

## 🚀 Tecnologias Utilizadas

- **Runtime**: Deno
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite (rodando via `npm:vite` sob Deno, sem Node instalado)
- **UI Framework**: Material Design 3 (Material Web Components)
- **Styling**: CSS Modules
- **Lint/Format**: Biome
- **Icons**: Material Symbols, SVG Components (via `vite-plugin-svgr`)

## 📦 Instalação e Execução

### Pré-requisitos
- [Deno](https://deno.com) 2.x

Não é necessário Node.js, npm nem `node_modules` gerenciado manualmente — o Deno resolve as dependências `npm:` declaradas em `deno.json` sob demanda.

### Comandos

```bash
# Modo desenvolvimento (hot reload)
deno task dev

# Build para produção
deno task build

# Preview da build de produção
deno task preview

# Checagem de tipos (deno check)
deno task typecheck

# Lint (Biome)
deno task lint

# Format (Biome)
deno task format

# Lint + format + organização de imports, com fixes
deno task check
```

## 🎨 Sistema de Design

O projeto utiliza Material Design 3 com:
- **Componentes**: Material Web Components
- **Tipografia**: Roboto
- **Ícones**: Material Symbols Outlined
- **Cores**: Esquema de cores baseado no Material 3
- **Layout**: Sistema flexível e responsivo

## 📁 Aliases de Importação

O projeto está configurado com aliases para facilitar imports, declarados tanto no import map do `deno.json` quanto no `resolve.alias` do `client/vite.config.ts`:

```typescript
// Componentes e código fonte (client/src/*)
import Sidebar from "@/components/layout/Sidebar/Sidebar.tsx";

// Assets (logos, ícones, imagens)
import Logo from "@assets/logos/logo.svg?react";
```

Imports relativos e por alias usam **extensão explícita** (`.ts`/`.tsx`/`/index.ts`) — é assim que `deno check` resolve módulos, ao contrário do `moduleResolution: "bundler"` do `tsc`, que infere extensões automaticamente.

## 🔧 Configuração

### Deno
- `deno.json` é o único manifesto do projeto: import map (dependências via `npm:`), `compilerOptions` e `tasks`.
- `nodeModulesDir: "auto"` — o Deno gerencia um `node_modules/` internamente apenas para compatibilidade com o Vite e seus plugins, que ainda esperam esse layout.
- `deno check` é o único typechecker (não há `tsc`/`typescript` no projeto).

### Vite
- Config em `client/vite.config.ts`, com raiz implícita em `client/` (onde fica o `index.html`).
- **Public**: `client/public/` — assets estáticos.
- **Build**: `dist/client/` — build compilado, resolvido relativo ao `client/`.
- **Plugins**: React, SVGR para importar SVGs como componentes.
- As tasks do `deno.json` fazem `cd client && vite` via shell nativo do Deno (`deno_task_shell`), não bash/Node.

### TypeScript
- `compilerOptions` vive dentro do `deno.json` (não há `tsconfig.json`).
- `jsx: "react-jsx"` com `jsxImportSource: "react"`.
- Módulos ambientes (`*.svg?react`, `*.mp4`) declarados em `client/src/types/assets.d.ts` e `client/src/custom.d.ts`, referenciados explicitamente no entry point via `/// <reference path>` — o Deno não inclui `.d.ts` automaticamente como o `tsc` faz.
- Strict mode habilitado.

## 🎯 Funcionalidades

- [x] Layout responsivo com sidebar de navegação
- [x] Roteamento client-side (react-router-dom)
- [x] Seção Hero com informações pessoais
- [x] Showcase de empresas parceiras
- [x] Carousel de projetos
- [x] Listagem e detalhe de projetos com blocos de conteúdo
- [x] Path aliases configurados (`@/`, `@assets/`)
- [x] Importação de SVGs como React components
- [ ] Seção de serviços
- [ ] Página sobre mim
- [ ] Sistema de temas (claro/escuro)
- [ ] Internacionalização (pt/en)
- [ ] Backend (`server/`)

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e feedback são sempre bem-vindos!

## 📄 Licença

Este projeto está sob licença privada. Todos os direitos reservados.

---

**Nicolas Soares** - Data Visualization & Frontend Developer
