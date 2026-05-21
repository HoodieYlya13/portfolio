import { Suspense } from "react";
import TimelineContainer from "@/components/timeline/TimelineContainer";
import TimelineCard from "@/components/timeline/TimelineCard";
import ExperienceTimelineManager from "@/components/experience/ExperienceTimelineManager";
import SkillsMatrix from "@/components/experience/SkillsMatrix";
import PlacementPreferences from "@/components/experience/PlacementPreferences";
import ScrollReveal from "@/components/timeline/ScrollReveal";
import DotField from "@/components/education/DotField";
import ResumeButton from "@/components/layout/ResumeButton";
import { getFullProfile } from "@/lib/github";

async function EngineeringTimeline() {
  const profileData = await getFullProfile();
  const engineeringData = profileData?.timeline_engineering || [];

  if (engineeringData.length === 0)
    return (
      <div className="text-center text-muted-foreground py-10">
        No engineering experience found.
      </div>
    );

  return (
    <TimelineContainer>
      {engineeringData.map((item, index) => (
        <TimelineCard
          key={index}
          range={item.range}
          title={item.role}
          subtitle={item.company}
          location={item.location}
          bullets={item.bullets}
          align={index % 2 === 0 ? "left" : "right"}
          isHero={item.main}
          meta={item.meta}
        />
      ))}
    </TimelineContainer>
  );
}

async function FoundationalTimeline() {
  const profileData = await getFullProfile();
  const foundationalData = profileData?.timeline_foundational || [];

  if (foundationalData.length === 0)
    return (
      <div className="text-center text-muted-foreground py-10">
        No foundational experience found.
      </div>
    );

  return (
    <TimelineContainer>
      {foundationalData.map((item, index) => (
        <TimelineCard
          key={index}
          range={item.range}
          title={item.role}
          subtitle={item.company}
          location={item.location}
          bullets={item.bullets}
          align={index % 2 === 0 ? "left" : "right"}
          isHero={false}
        />
      ))}
    </TimelineContainer>
  );
}

async function ExperienceContent() {
  return (
    <ExperienceTimelineManager
      engineeringTimeline={<EngineeringTimeline />}
      foundationalTimeline={<FoundationalTimeline />}
    />
  );
}

export default async function ExperiencePage() {
  const profileData = await getFullProfile();

  const skills = profileData?.skills_matrix || {
    primary_web_stack: [],
    backend_and_data: [],
    polyglot_languages: [],
    devops_and_systems: [],
    ai_engineering: [],
    ecosystem_tools: [],
    leadership_traits: [],
  };

  const preferences = profileData?.placement_preferences || {
    target_regions: [],
    preference: "",
    technical_domains: [],
  };

  return (
    <div className="min-h-screen bg-background py-20 padding-footer relative overflow-hidden flex flex-col gap-16 sm:gap-24">
      <div className="absolute inset-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(255, 100, 0, 0.6)"
          gradientTo="rgba(255, 50, 0, 0.2)"
          glowColor="rgba(255, 100, 0, 0.3)"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Experience
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          My professional engineering path and foundational career milestones.
        </p>
      </div>

      <div className="relative">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          }
        >
          <ExperienceContent />
        </Suspense>
      </div>

      <div className="relative">
        <SkillsMatrix skills={skills} />
      </div>

      <div className="relative">
        <PlacementPreferences preferences={preferences} />
      </div>

      <ScrollReveal className="flex justify-center relative">
        <ResumeButton />
      </ScrollReveal>
    </div>
  );
}
