import { Suspense } from "react";
import TimelineContainer from "@/components/education/TimelineContainer";
import EducationCard from "@/components/education/EducationCard";
import LanguagesSection from "@/components/education/LanguagesSection";
import CodingSince from "@/components/education/CodingSince";
import ScrollReveal from "@/components/education/ScrollReveal";
import DotField from "@/components/education/DotField";
import ResumeButton from "@/components/layout/ResumeButton";
import { getFullProfile } from "@/lib/github";

async function EducationContent() {
  const profileData = await getFullProfile();
  const educationData = profileData?.education || [];
  const languages = profileData?.professional_summary?.languages || [];
  const codingSince = profileData?.professional_summary?.coding_experience_since;

  return (
    <>
      {educationData.length > 0 && (
        <TimelineContainer>
          {educationData.map((item, index) => (
            <EducationCard
              key={index}
              year={item.year}
              title={item.title}
              school={item.school}
              location={item.location}
              description={item.description}
              align={index % 2 === 0 ? "left" : "right"}
              isHero={item.is_hero}
            />
          ))}
        </TimelineContainer>
      )}

      {languages.length > 0 && <LanguagesSection languages={languages} />}

      {codingSince != null && <CodingSince since={codingSince} />}

      <ScrollReveal className="flex justify-center">
        <ResumeButton />
      </ScrollReveal>
    </>
  );
}

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background py-20 pb-40 relative overflow-hidden flex flex-col gap-8 sm:gap-16">
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

      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Education
        </h1>
        <p className="text-muted-foreground text-lg">
          My academic journey and qualifications.
        </p>
      </div>

      <Suspense fallback={null}>
        <EducationContent />
      </Suspense>
    </div>
  );
}
