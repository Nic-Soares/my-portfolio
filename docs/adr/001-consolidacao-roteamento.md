# ADR-001 — Consolidação do Roteamento

**Status:** Aceito  
**Data:** 2026-04-12
**Autor:** Nicolau  
**Contexto:** Refatoração guiada pelo catálogo de Fowler — branch `refactor/architecture-foundations`

## Contexto
O projeto possuía duas fontes de verdade concorrentes para o roteamento da aplicação: `App.tsx` (usando `BrowserRouter` e `Routes`) e `router.tsx` (usando `createBrowserRouter`). Isso gerava uma divergência arquitetural (*Divergent Change* e *Duplicated Code*), além de inconsistências nos caminhos definidos (ex: `/work` vs `/projects`, `:id` vs `:slug`). Essa duplicidade tornava a manutenção confusa e propensa a erros caso uma nova rota fosse adicionada em um arquivo e esquecida no outro.

## Alternativas consideradas
1. **Migrar totalmente para `router.tsx`**: Utilizar a API de Data Router (`createBrowserRouter`) do React Router v6, o que permitiria o uso de loaders e actions. Exigiria refatorar a montagem do app no `main.tsx` (usando `RouterProvider`) e mover a estrutura de layout (`Sidebar`) para dentro de uma rota pai (layout route).
2. **Consolidar no `App.tsx`**: Manter o uso clássico de componentes `<Routes>` e `<Route>` agrupados no `App.tsx`, que já possuía a estrutura base com o layout `Sidebar` funcionando de forma simples e direta para o escopo atual do portfólio.

## Decisão
Foi decidido consolidar o roteamento no `App.tsx`, eliminando a definição em `router.tsx`. As rotas foram padronizadas para usar o prefixo `/projects` e o parâmetro `:slug`. Essa decisão foi tomada pois o `App.tsx` já continha a estrutura de layout acoplada (`Sidebar`) de forma funcional, e a complexidade adicional do Data Router não se justificava para um projeto de portfólio majoritariamente estático no momento. O arquivo `router.tsx` foi esvaziado, deixando apenas um comentário instrutivo.

## Consequências
**Positivas:**
- Fonte única de verdade para todas as rotas da aplicação.
- Eliminação de código duplicado e caminhos divergentes (`/work` vs `/projects`).
- Facilita a manutenção e entendimento do fluxo de navegação.

**Negativas / Trade-offs:**
- Não utilizaremos, a curto prazo, as funcionalidades avançadas do React Router v6 (loaders/actions) sem antes refatorar novamente a estrutura raiz para um `RouterProvider`.