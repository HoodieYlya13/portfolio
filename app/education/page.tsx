import TimelineContainer from "@/components/education/TimelineContainer";
import EducationCard from "@/components/education/EducationCard";
import DotField from "@/components/education/DotField";
import ResumeButton from "@/components/layout/ResumeButton";

const educationData = [
  {
    year: "2023 - 2026",
    title: "Engineer in IARN (Informatics, Automatic, Robotics, Networks)",
    school: "Polytech Nancy",
    location: "Vandœuvre-lès-Nancy",
    description:
      "Specializing in computer science, automation, robotics, and networks. This advanced engineering degree focuses on integrating software with hardware systems.",
    isHero: true,
  },
  {
    year: "2022 - 2023",
    title: "Diploma of Higher Education in Engineering Science",
    school: "F.R.U. Mathematics, computer science, mechanics",
    location: "Metz",
    description:
      "Focused on foundational engineering principles including advanced mathematics, computer science fundamentals, and classical mechanics.",
  },
  {
    year: "2021 - 2022",
    title: "BTEC Higher National Diploma in Physics Measures",
    school: "U.I.T. Department of Measures",
    location: "Metz",
    description:
      "Studies in physical measurements, instrumentation, and applied physics. Developed strong practical skills in data acquisition and analysis.",
  },
  {
    year: "2019 - 2021",
    title: "PeiP (Polytech engineering schools course)",
    school: "Polytech Nancy",
    location: "Vandœuvre-lès-Nancy",
    description:
      "Preparatory cycle for the Polytech network engineering schools, focusing on intensive mathematics, physics, and introductory engineering concepts.",
  },
];

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
            isHero={item.isHero}
          />
        ))}
      </TimelineContainer>

      <div className="flex justify-center">
        <ResumeButton />
      </div>
    </div>
  );
}
