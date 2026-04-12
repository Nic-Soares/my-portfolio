# ADR-002 — Camada Centralizada de Tipos

**Status:** Aceito  
**Data:** 2026-04-12
**Autor:** Nicolau  
**Contexto:** Refatoração guiada pelo catálogo de Fowler — branch `refactor/architecture-foundations`

## Contexto
Durante a análise do projeto, foi identificado o problema de *Inappropriate Intimacy* entre o componente de *feature* `ProjectCarousel.tsx` e o componente de UI puro `CarouselSlide.tsx`. Ambos definiam e compartilhavam localmente uma interface `Project` idêntica. Isso gerava acoplamento indesejado: um componente genérico de UI (`CarouselSlide`) dependia do formato de dados da *feature* (`ProjectCarousel`), o que tornava a manutenção duplicada (ao adicionar um campo na interface, era preciso atualizar os dois lugares) e violava a fronteira de que componentes de UI deveriam ser ignorantes sobre a estrutura de dados de domínio, ou ao menos se apoiar em um contrato único.

## Alternativas consideradas
1. **Passar os dados para a UI através de tipos primitivos (Flattening):** Substituir a propriedade `project: Project` em `CarouselSlide.tsx` por propriedades individuais (`title: string`, `description: string`, etc.).
2. **Criar uma camada centralizada `/types`:** Extrair a interface `Project` e movê-la para um diretório comum e central (ex: `/src/types/project.ts`), servindo como fonte única de verdade (contrato compartilhado) importada tanto pelas *features* quanto pelos componentes de UI, se estritamente necessário para coesão de dados mais complexos.

## Decisão
A decisão adotada foi criar o diretório `/src/types` e centralizar a interface `Project` em `project.ts`. Embora o "flattening" seja ideal para componentes primitivos (como `Button` ou `TabItem`), no caso de componentes de composição como o `CarouselSlide`, que podem precisar repassar várias informações de um domínio, a extração de um tipo compartilhado central resolve imediatamente o *smell* de duplicação (DRY) e estabelece um padrão para onde todos os contratos da aplicação devem residir. A interface foi ampliada para conter propriedades opcionais (`imageUrl`, `technologies`, etc.) que já eram previstas para o domínio.

## Consequências
**Positivas:**
- Eliminação da duplicação de interfaces e do acoplamento indireto entre arquivos que não deveriam se conhecer (DRY/Inappropriate Intimacy).
- Fundação estabelecida para uma camada global de contratos (Tipagem Centralizada), facilitando o crescimento das *features* no projeto sem gerar novas duplicações.
- Manutenção de tipos de domínio é feita em um único lugar.

**Negativas / Trade-offs:**
- Componentes da pasta `/components/ui` (como o `CarouselSlide`) agora importam arquivos da pasta `/types`. Idealmente, componentes de UI "puros" não dependeriam de entidades de domínio, mas sim de tipos genéricos (ex: `CarouselItemData`), mas a extração centralizada já representa um avanço estrutural enorme frente ao acoplamento *peer-to-peer* que existia.