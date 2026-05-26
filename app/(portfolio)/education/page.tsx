import { Suspense } from "react";
import TimelineContainer from "@/components/timeline/TimelineContainer";
import TimelineCard from "@/components/timeline/TimelineCard";
import LanguagesSection from "@/components/education/LanguagesSection";
import CodingSince from "@/components/education/CodingSince";
import ScrollReveal from "@/components/timeline/ScrollReveal";
import DotField from "@/components/education/DotField";
import ResumeButton from "@/components/layout/ResumeButton";
import { getFullProfile } from "@/lib/github";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";


async function EducationContent() {
  const profileData = await getFullProfile();
  const educationData = profileData?.academic_history || [];
  const languages = profileData?.communication?.languages || [];
  const codingSince = profileData?.identity?.coding_experience_since || 2019;

  return (
    <>
      {educationData.length > 0 && (
        <TimelineContainer>
          {educationData.map((item, index) => (
            <TimelineCard
              key={index}
              range={item.range}
              title={item.degree}
              subtitle={item.institution}
              location={item.location}
              summary={item.summary}
              align={index % 2 === 0 ? "left" : "right"}
              isHero={item.main}
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
    <div className="flex-1 py-20 padding-footer relative overflow-hidden flex flex-col gap-8 sm:gap-16">
      <DotField />

      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Education
        </h1>
        <p className="text-muted-foreground text-lg">
          My academic journey and qualifications.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <EducationContent />
      </Suspense>
    </div>
  );
}
