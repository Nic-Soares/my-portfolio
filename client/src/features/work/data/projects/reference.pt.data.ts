import type { ProjectData } from "../project-data.types.ts";

// pt-BR translation of reference.data.ts
export const referenceDataPt: ProjectData = {
  slug: "reference",
  name: "Referência",
  description: "Elevação é a distância entre duas superfícies no eixo z",
  areas: ["Design", "Frontend"],
  context: "Página de referência",
  hero: {
    type: "image",
    src: "https://kstatic.googleusercontent.com/files/e6ea31bb6dd2afb85d0b22d03faaafd95ccea9f5c1cca45028d33c33cc6488c7f770b455d43968d9fdb2ae5123d300663d1471dd050f18f8ed023b1b1a614477",
    alt: "Elevação",
  },
  tabs: [
    {
      id: "overview",
      title: "Visão geral",
      sidebarItems: [
        { label: "Disponibilidade & recursos", anchorId: "availability" },
        { label: "Diferenças em relação ao M2", anchorId: "differences" },
        { label: "Todas as superfícies e componentes", anchorId: "surfaces" },
      ],
      content: [
        {
          id: "elevation",
          type: "list",
          items: [
            "A elevação é aplicada a todas as superfícies e componentes",
            "Os tokens codificam a distância no eixo z para garantir que os componentes apareçam de forma consistente uns em relação aos outros",
            "Os tokens não têm sombras nem cor; cada plataforma define as sombras e os valores específicos a usar em cada nível de elevação",
            "A elevação pode ser representada por cores tonais de superfície ou por sombras",
            "Evite alterar a elevação padrão dos componentes do Material 3",
            "Use apenas uma pequena quantidade de níveis de elevação",
          ],
        },
        {
          type: "paragraph",
          text: "A elevação é medida como a distância entre componentes ao longo do eixo z, em pixels independentes de densidade (dps).",
          snug: true,
        },
        {
          type: "image",
          src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykafum-1.png?alt=media&token=686eda7a-aed0-4d34-a749-0b01f2a50a86",
          alt: "Um diagrama mostra um quadrado roxo claro e um quadrado roxo mais escuro. Um segundo mostra uma vista lateral dos quadrados em elevação, indicando que o quadrado claro está em uma elevação menor que o quadrado escuro.",
          aspectRatio: "3.413333 / 1",
          caption: `<p>A elevação representa a distância entre elementos. O produto aplica cor para representar a elevação.</p>
          <ol class="decimal">
              <li>
                  <p>Uma superfície com 1dp de elevação e outra com 8dp de elevação, vistas de frente</p>
              </li>
              <li>
                  <p>A diferença de elevação entre as duas superfícies é de 7dp, vista de lado</p>
              </li>
          </ol>`,
        },
        {
          id: "availability",
          type: "header",
          level: 2,
          text: "Disponibilidade & recursos",
        },
        {
          type: "table",
          headers: ["", "Recurso", "Status"],
          rows: [
            ["Design", "Design Kit (Figma)", "Disponível"],
            ["Implementação", "Flutter", "Disponível"],
            ["", "Jetpack Compose", "Disponível"],
            ["", "MDC - Android", "Disponível"],
            ["", "MWC - Web", "Disponível"],
          ],
        },
        {
          id: "differences",
          type: "header",
          level: 2,
          text: "Diferenças em relação ao M2",
        },
        {
          type: "columns",
          columns: [
            [
              {
                type: "list",
                items: [
                  "<strong>Sombras:</strong> Em vez de aplicar sombras por padrão em todos os níveis, use sombras apenas quando for necessário criar proteção adicional contra um fundo ou incentivar a interação",
                  "<strong>Cor:</strong> Novos mapeamentos de cor e compatibilidade com cor dinâmica",
                  "<strong>Níveis:</strong> A elevação agora é descrita em termos de níveis",
                ],
              },
            ],
            [
              {
                type: "image",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykc8yv-2.png?alt=media&token=7c4a4e4e-ff37-47d2-a375-579c3f945893",
                alt: "Diagrama de 2 quadrados concêntricos. O quadrado interno está a 12dp e tem uma sombra maior que o quadrado externo, que está a 3dp. M2: sombras aplicadas em todos os níveis",
                caption: "<p>M2: sombras aplicadas em todos os níveis</p>",
              },
            ],
            [
              {
                type: "image",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykckey-3.png?alt=media&token=fd1c5548-7048-4d2c-9123-17308e339731",
                alt: "Diagrama de 2 quadrados concêntricos sem sombras. Em vez disso, o quadrado interno está em um nível e é tonalmente mais escuro que o quadrado externo, que está no nível 2. M3: usando cor em vez de sombras para comunicar elevação",
                caption:
                  "<p>M3: usando cor em vez de sombras para comunicar elevação</p>",
              },
            ],
          ],
        },
        {
          id: "surfaces",
          type: "header",
          level: 2,
          text: "Todas as superfícies e componentes têm valores de elevação",
        },
        {
          type: "columns",
          layout: "1-2",
          columns: [
            [
              {
                type: "paragraph",
                text: "Superfícies em diferentes elevações fazem o seguinte:",
              },
              {
                type: "list",
                ordered: true,
                items: [
                  "Permitem que superfícies se movam na frente e atrás de outras superfícies, como conteúdo rolando por trás de app bars",
                  "Refletem relações espaciais, como a sombra de um FAB indicando que ele está separado de uma coleção de cards",
                  "Concentram a atenção na elevação mais alta, como um diálogo aparecendo temporariamente na frente de outras superfícies",
                ],
              },
            ],
            [
              {
                type: "video",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykjf69-GM3-Styles-Elevation-Overview-1-v01.mp4?alt=media&token=6a6f026f-2264-474b-9b2d-cab3cd08393e",
                aspectRatio: "1.194346 / 1",
                caption:
                  "<p>A elevação pode ser representada com sombras ou outros sinais visuais, como preenchimentos de superfície com diferença de tom</p>",
              },
            ],
          ],
        },
        {
          type: "header",
          level: 3,
          text: "Elevação em repouso (padrão)",
        },
        {
          type: "columns",
          layout: "1-2",
          columns: [
            [
              {
                type: "paragraph",
                text: "Todos os componentes têm uma elevação padrão em repouso. Evite alterar a elevação padrão dos componentes do Material.",
              },
            ],
            [
              {
                type: "image",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykcxkh-5.png?alt=media&token=d0b226cf-0e17-4719-9f5c-8a186936d003",
                alt: "Um floating action button com sombra. Todos os componentes têm uma elevação padrão que deve ser usada",
                caption:
                  "<p>Todos os componentes têm uma elevação padrão que deve ser usada</p>",
              },
            ],
          ],
        },
        {
          type: "header",
          level: 3,
          text: "Alterando a elevação",
        },
        {
          type: "paragraph",
          text: "Os componentes devem mudar de elevação em resposta a eventos do sistema ou à interação do usuário, como o hover. Essa mudança de elevação deve ser consistente em todos os elementos semelhantes.",
        },
        {
          type: "paragraph",
          text: "Por exemplo, passar o cursor sobre um FAB aumenta temporariamente a elevação em 1 nível, do nível 3 para o nível 4. Todos os botões do Material aumentam a elevação em 1 nível no hover.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Hovering",
          alt: "Passar o cursor sobre um botão aumenta sua elevação para indicar a interação do usuário",
        },
      ],
    },
    {
      id: "applying-elevation",
      title: "Aplicando elevação",
      sidebarItems: [
        { label: "Aplicando elevação", anchorId: "applying" },
        { label: "Representando elevação", anchorId: "depicting" },
        { label: "Diferença tonal", anchorId: "tonal" },
        {
          label: "Papéis de cor de superfície & elevação",
          anchorId: "surface",
        },
        { label: "Sombras", anchorId: "shadows" },
        { label: "Quando usar sombras visíveis", anchorId: "when-to-use" },
        { label: "Scrims", anchorId: "scrims" },
      ],
      content: [
        {
          id: "applying",
          type: "header",
          level: 2,
          text: "Aplicando elevação",
        },
        {
          type: "paragraph",
          text: "O sistema de elevação do Material 3 é deliberadamente limitado a poucos níveis. Essa restrição criativa exige decisões cuidadosas sobre a história de elevação da sua UI.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Diagram+5+elevation+levels",
          alt: "Diagrama mostrando os 5 níveis de elevação e seus respectivos valores em dp.",
        },
        {
          type: "paragraph",
          text: "O Material usa seis níveis de elevação, cada um com um valor em dp correspondente. Esses valores são nomeados pela distância relativa acima da superfície da UI: 0, +1, +2, +3, +4 e +5. O estado de repouso de um elemento pode estar nos níveis 0 a +3, enquanto os níveis +4 e +5 são reservados para estados de interação do usuário, como hover e arrastar.",
        },
        {
          id: "depicting",
          type: "header",
          level: 2,
          text: "Representando elevação",
        },
        {
          type: "paragraph",
          text: "A elevação pode ser representada com sombras ou outros sinais visuais, como preenchimentos de superfície com diferença de tom ou scrims.",
        },
        {
          type: "paragraph",
          text: "Para representar bem a elevação, uma superfície precisa mostrar:",
        },
        {
          type: "list",
          items: [
            "Bordas da superfície, que a contrastam com o entorno",
            "Sobreposição com outras superfícies, em repouso ou em movimento",
            "Distância em relação a outras superfícies",
          ],
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Overlapping+surfaces",
          alt: "3 imagens. A primeira mostra um quadrado violeta sobreposto a um quadrado branco. A segunda mostra 2 quadrados sobrepostos com a mesma cor, mas com sombras sob o quadrado de cima. A terceira mostra um quadrado violeta sobreposto a um quadrado cinza-escuro.",
        },
        {
          type: "list",
          items: [
            "Duas superfícies sobrepostas com valores tonais distintos",
            "Duas superfícies sobrepostas com os mesmos valores tonais, separadas por sombra",
            "Duas superfícies sobrepostas com os mesmos valores tonais, separadas por scrim",
          ],
        },
        {
          id: "tonal",
          type: "header",
          level: 2,
          text: "Diferença tonal",
        },
        {
          type: "paragraph",
          text: "A diferença tonal entre superfícies ajuda a expressar a qualidade tátil das superfícies do Material. Ela mostra onde uma superfície termina e outra começa, separando partes diferentes de uma UI em componentes identificáveis. Por exemplo, as bordas de uma app bar mostram que ela está separada de uma grid list, comunicando ao usuário que a grid list rola de forma independente da app bar.",
        },
        {
          type: "paragraph",
          text: "Por padrão, as superfícies do Material 3 usam diferença tonal para indicar separação. Outros métodos podem ser usados para indicar bordas, como:",
        },
        {
          type: "list",
          items: [
            "Aplicar uma sombra projetada às superfícies",
            "Colocar um scrim atrás de uma superfície",
          ],
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Separation+methods",
          alt: "Elevação, scrim e diferenças tonais usados para indicar separação.",
        },
        {
          type: "paragraph",
          text: "Em componentes interativos, as bordas precisam criar contraste suficiente entre as superfícies (atingindo ou superando as taxas de contraste acessíveis) para que sejam percebidas como separadas umas das outras.",
        },
        {
          id: "surface",
          type: "header",
          level: 2,
          text: "Papéis de cor de superfície & elevação",
        },
        {
          type: "paragraph",
          text: "Você pode escolher entre vários papéis de cor de superfície e de surface container. Esses papéis não estão vinculados à elevação e oferecem flexibilidade para definir áreas de contenção.",
        },
        {
          type: "paragraph",
          text: "Áreas de contenção ou componentes sobrepostos devem ter papéis de cor diferentes para comunicar visualmente a separação.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Surface+color+roles",
          alt: "Diagrama da tela inicial de um app de e-mail, com 1 indicando a cor de fundo do item de lista e 2 indicando a cor de fundo da barra de navegação.",
        },
        {
          id: "shadows",
          type: "header",
          level: 2,
          text: "Sombras",
        },
        {
          type: "paragraph",
          text: "As sombras conseguem expressar o grau de elevação entre superfícies de formas que outras técnicas não conseguem.",
        },
        {
          type: "paragraph",
          text: "Tanto o tamanho de uma sombra quanto seu grau de suavidade ou difusão expressam a distância entre duas superfícies. Por exemplo, uma superfície com uma sombra pequena e nítida indica que ela está bem próxima da superfície atrás dela. Sombras maiores e mais suaves expressam mais distância.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Podcast+app+shadows+1",
          alt: "App de podcast com cada programa exibido como um card separado do fundo por pequenas sombras escuras.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Podcast+app+shadows+2",
          alt: "App de podcast com cada programa exibido como um card separado do fundo por sombras mais suaves e difusas.",
        },
        {
          type: "paragraph",
          text: "Na hora de aplicar sombras, menos é mais. Quanto menos níveis na sua UI, mais força eles têm para direcionar a atenção e a ação.",
        },
        {
          id: "when-to-use",
          type: "header",
          level: 2,
          text: "Quando usar sombras visíveis",
        },
        {
          type: "paragraph",
          text: "<strong>Proteger elementos:</strong> Quando um fundo tem padrões ou é visualmente carregado, o estilo de linha fina pode não oferecer proteção suficiente. Nesses casos, use a elevação para separar e destacar elementos como cards, chips ou botões.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Buttons+with+shadows",
          alt: "Botões com sombras que os separam de uma imagem de fundo.",
        },
        {
          type: "paragraph",
          text: "<strong>Incentivar a interação:</strong> Elementos podem se elevar temporariamente ao receber foco, seleção ou outro tipo de interação, como o swipe. Um elemento elevado também pode descer quando um elemento mais alto aparece.",
        },
        {
          id: "scrims",
          type: "header",
          level: 2,
          text: "Scrims",
        },
        {
          type: "paragraph",
          text: "Um scrim pode direcionar o foco para elementos específicos, aumentando o contraste visual de uma grande superfície em camadas. Use o scrim sob elementos como modais e menus de navegação expandidos.",
        },
        {
          type: "paragraph",
          text: "Os scrims usam o papel de cor scrim com opacidade de 32%.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=News+app+scrim",
          alt: "App de notícias em tela grande com um navigation rail separado do conteúdo principal por um scrim.",
        },
      ],
    },
    {
      id: "tokens",
      title: "Tokens",
      sidebarItems: [
        { label: "Tokens", anchorId: "tokens-intro" },
        { label: "Elevação de componentes", anchorId: "component-elevation" },
        { label: "Nível em repouso", anchorId: "resting-level" },
      ],
      content: [
        {
          id: "tokens-intro",
          type: "header",
          level: 2,
          text: "Tokens",
        },
        {
          type: "paragraph",
          text: "Os níveis de elevação podem ser implementados com tokens. A cor surface tint está obsoleta. Use os tokens de nível de elevação (0–5) no lugar. Saiba mais sobre design tokens",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Elevation+Tokens",
          alt: "Níveis de elevação de 0 a +5 com a cor surface tint",
        },
        {
          id: "component-elevation",
          type: "header",
          level: 2,
          text: "Elevação de componentes",
        },
        {
          type: "paragraph",
          text: "A maioria dos componentes tem uma elevação padrão. A elevação de um componente serve apenas para determinar onde ele fica em relação a outros componentes, inclusive no hover ou no foco (o que normalmente eleva a elevação em um nível). Por padrão, a elevação não tem sombra nem valor próprios.",
        },
        {
          id: "resting-level",
          type: "header",
          level: 3,
          text: "Nível em repouso",
        },
        {
          type: "list",
          items: [
            "<strong>Nível 5 (12dp):</strong> (não atribuído como nível em repouso)",
            "<strong>Nível 4 (8dp):</strong> (não atribuído como nível em repouso)",
            "<strong>Nível 3 (6dp):</strong> Date pickers, Dialogs (modal), Extended FAB, FAB, FAB menu (botão de fechar), Search, Time pickers",
            "<strong>Nível 2 (3dp):</strong> App bar (com rolagem), Menu, Navigation bar, Rich tooltip, Toolbar",
            "<strong>Nível 1 (1dp):</strong> Banner, Bottom sheet (modal), Button (elevated), Card (elevated), Chips (elevated), Navigation drawer (modal), Side sheet (modal)",
            "<strong>Nível 0 (0dp):</strong> App bar (sem rolagem), Buttons (filled, tonal, outlined), Button groups, Cards (filled, outlined), Carousel, Chips, Dialog (full-screen), Extended FAB (no navigation rail), FAB (no navigation rail), FAB menu (itens de lista), Icon buttons, List, Navigation rail, Segmented button, Side sheet (docked), Slider, Split button, Tabs",
          ],
        },
      ],
    },
  ],
};
