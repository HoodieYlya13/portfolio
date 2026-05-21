import { MapPin, Globe, Rocket } from "lucide-react";
import ScrollReveal from "@/components/timeline/ScrollReveal";

interface PlacementPreferencesProps {
  preferences: {
    target_regions: string[];
    preference: string;
    technical_domains: string[];
  };
}

export default function PlacementPreferences({
  preferences,
}: PlacementPreferencesProps) {
  const getFlagEmoji = (region: string) => {
    switch (region.toLowerCase()) {
      case "luxembourg":
        return "🇱🇺";
      case "switzerland":
        return "🇨🇭";
      case "north america":
        return "🌎";
      default:
        return "📍";
    }
  };

  return (
    <ScrollReveal className="max-w-5xl mx-auto px-4 w-full">
      <section className="flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Professional Preferences
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Work styles, relocation regions, and target engineering domains.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto w-full">
          <div className="p-6 rounded-2xl border border-foreground/15 backdrop-blur-md bg-linear-to-br from-background/50 to-primary/10 shadow-sm flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3 text-primary">
                <Globe className="w-5 h-5" />
                <h4 className="font-bold text-foreground">
                  Work Style Preference
                </h4>
              </div>
              <span className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold bg-primary/10 border border-primary/25 text-primary">
                {preferences.preference}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3 text-primary">
                <MapPin className="w-5 h-5" />
                <h4 className="font-bold text-foreground">
                  Target Geographies
                </h4>
              </div>
              <div className="flex flex-col gap-2.5">
                {preferences.target_regions.map((region) => (
                  <div
                    key={region}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-foreground/10 bg-background/30 hover:bg-background/50 transition-colors duration-300"
                  >
                    <span className="text-xl leading-none select-none">
                      {getFlagEmoji(region)}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {region}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-foreground/15 backdrop-blur-md bg-linear-to-br from-background/50 to-primary/10 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2 text-primary">
              <Rocket className="w-5 h-5" />
              <h4 className="font-bold text-foreground">
                Target Engineering Domains
              </h4>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              Sectors and technical domains where I actively direct my software
              development, research, and systems integration efforts.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {preferences.technical_domains.map((domain) => (
                <div
                  key={domain}
                  className="px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-center text-xs font-bold text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 cursor-default select-none"
                >
                  {domain}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
