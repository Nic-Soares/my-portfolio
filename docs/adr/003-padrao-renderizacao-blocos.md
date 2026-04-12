# ADR-003 — Padrão de Renderização de Blocos

**Status:** Proposto  
**Data:** 2026-04-12
**Autor:** Nicolau  
**Contexto:** Refatoração guiada pelo catálogo de Fowler — branch `refactor/architecture-foundations`

## Contexto
Atualmente, o componente `BlockRender.tsx` é responsável por ler os dados de conteúdo dos projetos e renderizá-los dinamicamente. Para fazer isso, ele utiliza uma estrutura condicional muito extensa (`switch`), avaliando a propriedade `block.type` para renderizar `header`, `paragraph`, `image`, `code`, `list` ou `content-group`. Essa abordagem cria dois *code smells* catalogados por Fowler: *Long Function* e *Repeated Switches*. 

Além de inflar o arquivo, essa estrutura viola o Princípio Aberto/Fechado (Open/Closed Principle) do SOLID: cada vez que precisarmos suportar um novo tipo de bloco, o código do `BlockRender.tsx` precisará ser modificado, o que aumenta o risco de regressões e dificulta a manutenção e a escalabilidade estrutural da plataforma de conteúdo.

## Alternativas consideradas
1. **Manter o grande bloco `switch` (Status Quo):** Continuar adicionando novos `cases` conforme novos blocos surgirem. A curto prazo é mais rápido, mas a longo prazo torna o arquivo impossível de dar manutenção e testar isoladamente.
2. **Implementar o Padrão *Strategy* Clássico via Classes:** Criar uma interface base `IBlockRenderer` e classes concretas para cada tipo que possuam um método `render()`. Isso resolveria a extensibilidade, mas é excessivamente burocrático e verboso para o ecossistema funcional e declarativo do React.
3. **Padrão de Mapa/Registro de Componentes (Component Map):** Criar um objeto dicionário (ou mapa) de configuração estática que associe as chaves `block.type` (ex: `'header'`) diretamente a componentes React puros. O `BlockRender.tsx` passa a atuar apenas como um orquestrador genérico que faz o *lookup* (busca) no mapa e repassa a prop `block` para o componente correspondente renderizar o conteúdo.

## Decisão
Foi decidido adotar a estratégia de **Mapa de Registro de Componentes (Component Map)**. 

Embora ainda não implementada (daí o status "Proposto"), a próxima sessão de refatoração deverá quebrar os blocos do `switch` em componentes React isolados (ex: `HeaderBlock`, `ImageBlock`, `CodeBlock`, etc.), todos implementando uma mesma interface (ex: `BlockComponentProps`). O `BlockRender.tsx` importará esses sub-componentes e os mapeará em um objeto estático, substituindo todo o `switch` por um mapeamento em complexidade O(1) e delegando a renderização para o componente específico.

## Consequências
**Positivas:**
- Aderência ao Princípio Aberto/Fechado (OCP): novos tipos de blocos poderão ser adicionados criando um novo arquivo e registrando-o no mapa, sem alterar a lógica do iterador principal.
- Eliminação dos code smells *Repeated Switches* e *Long Function*.
- O código de cada bloco passará a ser isolado e facilmente testável.

**Negativas / Trade-offs:**
- Requer uma etapa de configuração (registro) inicial.
- Exigirá a padronização de todos os sub-componentes para aceitarem um contrato comum de *props*, forçando uma pequena sobrecarga arquitetural antes da criação de qualquer novo bloco visual.