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
import jpApp from "@/assets/themes/japanese-app.jpg";
import jpHero from "@/assets/themes/japanese-hero.jpg";

// Dark Fantasy backgrounds
import dfAuth from "@/assets/themes/dark-fantasy-auth.jpg";
import dfApp from "@/assets/themes/dark-fantasy-app.jpg";
import dfHero from "@/assets/themes/dark-fantasy-hero.jpg";

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
      home: jpApp,
      discover: jpApp,
      artists: jpApp,
      search: jpApp,
      charts: jpApp,
      library: jpApp,
    },
  },
  "dark-fantasy": {
    hero: dfHero,
    auth: dfAuth,
    sections: {
      home: dfApp,
      discover: dfApp,
      artists: dfApp,
      search: dfApp,
      charts: dfApp,
      library: dfApp,
    },
  },
};

export function getThemeBackgrounds(theme: ThemeName): ThemeBackgrounds {
  return themeBackgrounds[theme];
}
