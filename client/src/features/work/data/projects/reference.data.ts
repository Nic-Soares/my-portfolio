import { ProjectData } from "../project-data.types";

export const referenceData: ProjectData = {
  slug: "reference",
  name: "Reference",
  description: "Elevation is the distance between two surfaces on the z-axis",
  hero: {
    type: "image",
    src: "https://kstatic.googleusercontent.com/files/e6ea31bb6dd2afb85d0b22d03faaafd95ccea9f5c1cca45028d33c33cc6488c7f770b455d43968d9fdb2ae5123d300663d1471dd050f18f8ed023b1b1a614477",
    alt: "Elevation",
  },
  tabs: [
    {
      id: "overview",
      title: "Overview",
      sidebarItems: [
        { label: "Availability & resources", anchorId: "availability" },
        { label: "Differences from M2", anchorId: "differences" },
        { label: "All surfaces and components", anchorId: "surfaces" },
      ],
      content: [
        {
          id: "elevation",
          type: "list",
          items: [
            "Elevation is applied to all surfaces and components",
            "Tokens codify the distance on the z-axis to ensure components appear consistently relative to each other",
            "Tokens have no shadows or color; each platform determines the specific shadows and values to use at each elevation level",
            "Elevation can be shown as tonal surface colors or shadows",
            "Avoid changing the default elevation of Material 3 components",
            "Stick to using a small amount of elevation levels",
          ],
        },
        {
          type: "paragraph",
          text: "Elevation is measured as the distance between components along the z-axis in density-independent pixels (dps).",
          snug: true,
        },
        {
          type: "image",
          src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykafum-1.png?alt=media&token=686eda7a-aed0-4d34-a749-0b01f2a50a86",
          alt: "1 diagram shows a light purple square and a darker purple square. A second one shows a side view of the squares in elevation, showing that the light square is lower in elevation than the dark square.",
          aspectRatio: "3.413333 / 1",
          caption: `<p>Elevation represents the distance between elements. The product applies color to represent elevation.</p>
          <ol class="decimal">
              <li>
                  <p>One surface at 1dp elevation and another surface at 8dp elevation, as viewed from the front</p>
              </li>
              <li>
                  <p>The difference in elevation between the two surfaces is 7dp, as viewed from the side</p>
              </li>
          </ol>`,
        },
        {
          id: "availability",
          type: "header",
          level: 2,
          text: "Availability & resources",
        },
        {
          type: "table",
          headers: ["", "Resource", "Status"],
          rows: [
            ["Design", "Design Kit (Figma)", "Available"],
            ["Implementation", "Flutter", "Available"],
            ["", "Jetpack Compose", "Available"],
            ["", "MDC - Android", "Available"],
            ["", "MWC - Web", "Available"],
          ],
        },
        {
          id: "differences",
          type: "header",
          level: 2,
          text: "Differences from M2",
        },
        {
          type: "columns",
          columns: [
            [
              {
                type: "list",
                items: [
                  "<strong>Shadows:</strong> Instead of applying shadows by default to all levels, use shadows only when required to create additional protection against a background or to encourage interaction",
                  "<strong>Color:</strong> New color mappings and compatibility with dynamic color",
                  "<strong>Levels:</strong> Elevation is now described in terms of levels",
                ],
              },
            ],
            [
              {
                type: "image",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykc8yv-2.png?alt=media&token=7c4a4e4e-ff37-47d2-a375-579c3f945893",
                alt: "Diagram of 2 concentric squares. The inner square is at 12dp and has a larger shadow than the outer square, which is at 3dp. M2: Shadows applied at all levels",
                caption: "<p>M2: Shadows applied at all levels</p>",
              },
            ],
            [
              {
                type: "image",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykckey-3.png?alt=media&token=fd1c5548-7048-4d2c-9123-17308e339731",
                alt: "Diagram of 2 concentric squares without shadows. Instead, the inner square is at level and tonally darker than the outer square, which is at level 2. M3: Using color instead of shadows to communicate elevation",
                caption:
                  "<p>M3: Using color instead of shadows to communicate elevation</p>",
              },
            ],
          ],
        },
        {
          id: "surfaces",
          type: "header",
          level: 2,
          text: "All surfaces and components have elevation values",
        },
        {
          type: "columns",
          layout: "1-2",
          columns: [
            [
              {
                type: "paragraph",
                text: "Surfaces at different elevations do the following:",
              },
              {
                type: "list",
                ordered: true,
                items: [
                  "Allow surfaces to move in front of and behind other surfaces, such as content scrolling behind app bars",
                  "Reflect spatial relationships, such as how a FAB's shadow indicates it's separate from a card collection",
                  "Focus attention on the highest elevation, such as a dialog temporarily appearing in front of other surfaces",
                ],
              },
            ],
            [
              {
                type: "video",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykjf69-GM3-Styles-Elevation-Overview-1-v01.mp4?alt=media&token=6a6f026f-2264-474b-9b2d-cab3cd08393e",
                aspectRatio: "1.194346 / 1",
                caption:
                  "<p>Elevation can be depicted using shadows or other visual cues, such as surface fills with a tone difference</p>",
              },
            ],
          ],
        },
        {
          type: "header",
          level: 3,
          text: "Resting elevation (default)",
        },
        {
          type: "columns",
          layout: "1-2",
          columns: [
            [
              {
                type: "paragraph",
                text: "All components have a default resting elevation. Avoid changing the default elevation of Material components.",
              },
            ],
            [
              {
                type: "image",
                src: "https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwykcxkh-5.png?alt=media&token=d0b226cf-0e17-4719-9f5c-8a186936d003",
                alt: "A floating action button with a shadow. All components have a default elevation which should be used",
                caption:
                  "<p>All components have a default elevation which should be used</p>",
              },
            ],
          ],
        },
        {
          type: "header",
          level: 3,
          text: "Changing elevation",
        },
        {
          type: "paragraph",
          text: "Components should change elevation in response to system events or user interaction, like hovering. This elevation change should be consistent across all similar elements.",
        },
        {
          type: "paragraph",
          text: "For example, hovering a FAB temporarily increases the elevation by 1 level, from level 3 to level 4. All Material buttons increase elevation by 1 level when hovered.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Hovering",
          alt: "Hovering over a button increases its elevation to show user interaction",
        },
      ],
    },
    {
      id: "applying-elevation",
      title: "Applying elevation",
      sidebarItems: [
        { label: "Applying elevation", anchorId: "applying" },
        { label: "Depicting elevation", anchorId: "depicting" },
        { label: "Tonal difference", anchorId: "tonal" },
        { label: "Surface color roles & elevation", anchorId: "surface" },
        { label: "Shadows", anchorId: "shadows" },
        { label: "When to use visible shadows", anchorId: "when-to-use" },
        { label: "Scrims", anchorId: "scrims" },
      ],
      content: [
        {
          id: "applying",
          type: "header",
          level: 2,
          text: "Applying elevation",
        },
        {
          type: "paragraph",
          text: "Material 3’s elevation system is deliberately limited to just a handful of levels. This creative constraint means you need to make thoughtful decisions about your UI’s elevation story.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Diagram+5+elevation+levels",
          alt: "Diagram showing the 5 elevation levels and their respective dp values.",
        },
        {
          type: "paragraph",
          text: "Material uses six levels of elevation, each with a corresponding dp value. These values are named for their relative distance above the UI’s surface: 0, +1, +2, +3, +4, and +5. An element’s resting state can be on levels 0 to +3, while levels +4 and +5 are reserved for user-interacted states such as hover and dragged.",
        },
        {
          id: "depicting",
          type: "header",
          level: 2,
          text: "Depicting elevation",
        },
        {
          type: "paragraph",
          text: "Elevation can be depicted using shadows or other visual cues, such as surface fills with a tone difference or scrims.",
        },
        {
          type: "paragraph",
          text: "To successfully depict elevation, a surface must show:",
        },
        {
          type: "list",
          items: [
            "Surface edges, contrasting the surface from its surroundings",
            "Overlap with other surfaces, either at rest or in motion",
            "Distance from other surfaces",
          ],
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Overlapping+surfaces",
          alt: "3 images. The first shows a violet square overlapping a white square. The second shows 2 overlapping squares with the same color, but with shadows beneath the top square. The third shows a violet square overlapping a dark gray square.",
        },
        {
          type: "list",
          items: [
            "Two overlapping surfaces with distinct tonal values",
            "Two overlapping surfaces with the same tonal values separated via shadow",
            "Two overlapping surfaces with the same tonal values separated via scrim",
          ],
        },
        {
          id: "tonal",
          type: "header",
          level: 2,
          text: "Tonal difference",
        },
        {
          type: "paragraph",
          text: "Tonal difference between surfaces helps to express the tactile quality of Material surfaces. They show where one surface ends and another begins by separating different parts of a UI into identifiable components. For example, the edges of an app bar show that it's separate from a grid list, communicating to the user that the grid list scrolls independently of the app bar.",
        },
        {
          type: "paragraph",
          text: "By default, Material 3's surfaces use tonal difference to indicate separation. Other methods can be used to indicate edges, such as:",
        },
        {
          type: "list",
          items: [
            "Giving surfaces a drop shadow",
            "Placing a scrim behind a surface",
          ],
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Separation+methods",
          alt: "Elevation, scrim, and tonal differences used to indicate separation.",
        },
        {
          type: "paragraph",
          text: "For interactive components, edges must create sufficient contrast between surfaces (by meeting or exceeding accessible contrast ratios) for them to be seen as separate from one another.",
        },
        {
          id: "surface",
          type: "header",
          level: 2,
          text: "Surface color roles & elevation",
        },
        {
          type: "paragraph",
          text: "You can pick from a range of surface and surface container color roles. These roles are not tied to elevation, and provide flexibility for defining containment areas.",
        },
        {
          type: "paragraph",
          text: "Any overlapping containment areas or components should have different color roles in order to visually communicate separation.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Surface+color+roles",
          alt: "Diagram of email home screen with 1 indicating the list item background color and 2 indicating the navigation bar background color.",
        },
        {
          id: "shadows",
          type: "header",
          level: 2,
          text: "Shadows",
        },
        {
          type: "paragraph",
          text: "Shadows can express the degree of elevation between surfaces in ways that other techniques can't.",
        },
        {
          type: "paragraph",
          text: "Both a shadow’s size and amount of softness or diffusion express the degree of distance between two surfaces. For example, a surface with a shadow that's small and sharp indicates a surface’s close proximity to the surface behind it. Larger, softer shadows express more distance.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Podcast+app+shadows+1",
          alt: "Podcast app with each show displayed as a card separated from the background using small dark shadows.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Podcast+app+shadows+2",
          alt: "Podcast app with each show displayed as a card separated from the background using more fuzzy and diffused shadows.",
        },
        {
          type: "paragraph",
          text: "When it comes to applying shadows, less is more. The fewer levels in your UI, the more power they have to direct attention and action.",
        },
        {
          id: "when-to-use",
          type: "header",
          level: 2,
          text: "When to use visible shadows",
        },
        {
          type: "paragraph",
          text: "<strong>Protect elements:</strong> When a background is patterned or visually busy, the hairline style might not provide sufficient protection. In these cases, use elevation to separate and emphasize elements such as cards, chips, or buttons.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Buttons+with+shadows",
          alt: "Buttons with shadows separating them from a background image.",
        },
        {
          type: "paragraph",
          text: "<strong>Encourage interaction:</strong> Elements can temporarily lift on focus, selection, or another kind of interaction, like swipe. A raised element can also lower when a higher element appears.",
        },
        {
          id: "scrims",
          type: "header",
          level: 2,
          text: "Scrims",
        },
        {
          type: "paragraph",
          text: "A scrim can bring focus to specific elements by increasing the visual contrast of a large layered surface. Use the scrim beneath elements like modals and expanded navigation menus.",
        },
        {
          type: "paragraph",
          text: "Scrims use the scrim color role at an opacity of 32%.",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=News+app+scrim",
          alt: "Large screen news app with a navigation rail separated from the body content by a scrim.",
        },
      ],
    },
    {
      id: "tokens",
      title: "Tokens",
      sidebarItems: [
        { label: "Tokens", anchorId: "tokens-intro" },
        { label: "Component elevation", anchorId: "component-elevation" },
        { label: "Resting level", anchorId: "resting-level" },
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
          text: "Elevation levels can be implemented with tokens. Surface tint color is deprecated. Use elevation level tokens (0–5) instead. Learn more about design tokens",
        },
        {
          type: "image",
          src: "https://placehold.co/800x400/e0e0e0/000000?text=Elevation+Tokens",
          alt: "Elevation levels 0 to +5 with Surface tint color",
        },
        {
          id: "component-elevation",
          type: "header",
          level: 2,
          text: "Component elevation",
        },
        {
          type: "paragraph",
          text: "Most components have a default elevation. Component elevation is only used to determine where the component sits in relation to other components, including when hovered or focused (which usually raises elevation by one level). Elevation has no shadow or value of its own by default.",
        },
        {
          id: "resting-level",
          type: "header",
          level: 3,
          text: "Resting level",
        },
        {
          type: "list",
          items: [
            "<strong>Level 5 (12dp):</strong> (not assigned as resting level)",
            "<strong>Level 4 (8dp):</strong> (not assigned as resting level)",
            "<strong>Level 3 (6dp):</strong> Date pickers, Dialogs (modal), Extended FAB, FAB, FAB menu (close button), Search, Time pickers",
            "<strong>Level 2 (3dp):</strong> App bar (scrolled), Menu, Navigation bar, Rich tooltip, Toolbar",
            "<strong>Level 1 (1dp):</strong> Banner, Bottom sheet (modal), Button (elevated), Card (elevated), Chips (elevated), Navigation drawer (modal), Side sheet (modal)",
            "<strong>Level 0 (0dp):</strong> App bar (not scrolled), Buttons (filled, tonal, outlined), Button groups, Cards (filled, outlined), Carousel, Chips, Dialog (full-screen), Extended FAB (in navigation rail), FAB (in navigation rail), FAB menu (list items), Icon buttons, List, Navigation rail, Segmented button, Side sheet (docked), Slider, Split button, Tabs",
          ],
        },
      ],
    },
  ],
};
