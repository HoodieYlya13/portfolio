import { Suspense } from "react";
import TimelineContainer from "@/components/education/TimelineContainer";
import EducationCard from "@/components/education/EducationCard";
import DotField from "@/components/education/DotField";
import ResumeButton from "@/components/layout/ResumeButton";

interface EducationItem {
  year: string;
  title: string;
  school: string;
  location: string;
  description: string;
  is_hero?: boolean;
}

async function fetchEducationData(): Promise<EducationItem[] | null> {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/HoodieYlya13/HoodieYlya13/main/profile.json",
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch portfolio data");

    const data = await res.json();
    return data.education || [];
  } catch (error) {
    console.error("Education fetch error:", error);
    return null;
  }
}

async function EducationTimeline() {
  const educationData = await fetchEducationData();
  if (!educationData) return null;

  return (
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
        <EducationTimeline />
      </Suspense>

      <div className="flex justify-center">
        <ResumeButton />
      </div>
    </div>
  );
}
