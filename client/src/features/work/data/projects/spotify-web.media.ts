// Spotify Web media, shared by the en / pt / es data files. Screens and the
// hero come in 800 and 1600px so phones (and the 3-up screens row) don't
// download the full size; `sizes` is the width each one is shown at.
import architectureDiagram from "@assets/images/projects/spotify-web/architecture.webp";
import hero1600 from "@assets/images/projects/spotify-web/hero.webp";
import hero800 from "@assets/images/projects/spotify-web/hero-800.webp";
import screenArtist1600 from "@assets/images/projects/spotify-web/screen-artist.webp";
import screenArtist800 from "@assets/images/projects/spotify-web/screen-artist-800.webp";
import screenHome1600 from "@assets/images/projects/spotify-web/screen-home.webp";
import screenHome800 from "@assets/images/projects/spotify-web/screen-home-800.webp";
import screenPlayer1600 from "@assets/images/projects/spotify-web/screen-player.webp";
import screenPlayer800 from "@assets/images/projects/spotify-web/screen-player-800.webp";
import type { ResponsiveImage } from "../project-data.types.ts";

const SCREENS_ROW = "(width < 600px) 100vw, 33vw"; // stacked on Compact
const HERO = "(width < 600px) 100vw, 50vw"; // stacked on Compact

const responsive = (
  small: string,
  large: string,
  sizes: string,
): ResponsiveImage => ({
  src: large,
  srcSet: `${small} 800w, ${large} 1600w`,
  sizes,
});

export const spotifyWebMedia = {
  hero: responsive(hero800, hero1600, HERO),
  screenHome: responsive(screenHome800, screenHome1600, SCREENS_ROW),
  screenArtist: responsive(screenArtist800, screenArtist1600, SCREENS_ROW),
  screenPlayer: responsive(screenPlayer800, screenPlayer1600, SCREENS_ROW),
  architecture: { src: architectureDiagram },
};
