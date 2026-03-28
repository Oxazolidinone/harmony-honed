import { ThemeName } from "@/contexts/ThemeContext";

// Default backgrounds
import bgHome from "@/assets/bg-home.jpg";
import bgDiscover from "@/assets/bg-discover.jpg";
import bgArtists from "@/assets/bg-artists.jpg";
import bgSearch from "@/assets/bg-search.jpg";
import bgCharts from "@/assets/bg-charts.jpg";
import bgLibrary from "@/assets/bg-library.jpg";
import bgAuthDock from "@/assets/bg-auth-dock.jpg";
import heroBg from "@/assets/hero-bg.jpg";

// Japanese backgrounds
import jpAuth from "@/assets/themes/japanese-auth.jpg";
import jpHero from "@/assets/themes/japanese-hero.jpg";
import jpHome from "@/assets/themes/jp-home.jpg";
import jpDiscover from "@/assets/themes/jp-discover.jpg";
import jpArtists from "@/assets/themes/jp-artists.jpg";
import jpSearch from "@/assets/themes/jp-search.jpg";
import jpCharts from "@/assets/themes/jp-charts.jpg";
import jpLibrary from "@/assets/themes/jp-library.jpg";

// Dark Fantasy backgrounds
import dfAuth from "@/assets/themes/dark-fantasy-auth.jpg";
import dfHero from "@/assets/themes/dark-fantasy-hero.jpg";
import dfHome from "@/assets/themes/df-home.jpg";
import dfDiscover from "@/assets/themes/df-discover.jpg";
import dfArtists from "@/assets/themes/df-artists.jpg";
import dfSearch from "@/assets/themes/df-search.jpg";
import dfCharts from "@/assets/themes/df-charts.jpg";
import dfLibrary from "@/assets/themes/df-library.jpg";

export interface ThemeBackgrounds {
  hero: string;
  auth: string;
  sections: {
    home: string;
    discover: string;
    artists: string;
    search: string;
    charts: string;
    library: string;
  };
}

const themeBackgrounds: Record<ThemeName, ThemeBackgrounds> = {
  default: {
    hero: heroBg,
    auth: bgAuthDock,
    sections: {
      home: bgHome,
      discover: bgDiscover,
      artists: bgArtists,
      search: bgSearch,
      charts: bgCharts,
      library: bgLibrary,
    },
  },
  japanese: {
    hero: jpHero,
    auth: jpAuth,
    sections: {
      home: jpHome,
      discover: jpDiscover,
      artists: jpArtists,
      search: jpSearch,
      charts: jpCharts,
      library: jpLibrary,
    },
  },
  "dark-fantasy": {
    hero: dfHero,
    auth: dfAuth,
    sections: {
      home: dfHome,
      discover: dfDiscover,
      artists: dfArtists,
      search: dfSearch,
      charts: dfCharts,
      library: dfLibrary,
    },
  },
};

export function getThemeBackgrounds(theme: ThemeName): ThemeBackgrounds {
  return themeBackgrounds[theme];
}
