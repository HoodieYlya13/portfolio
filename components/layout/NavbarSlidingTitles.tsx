import { getFullProfile } from "@/lib/github";

export default async function NavbarSlidingTitles() {
  const profileData = await getFullProfile();

  const fallbackTitles = [
    "Full Stack Developer",
    "•",
    "Senior Software Engineer",
    "•",
    "Next.js & React Expert",
    "•",
    "GenAI & RAG Systems Engineer",
    "•",
  ];

  let titles: string[] = fallbackTitles;

  if (profileData?.hero_marquee?.length) {
    const singleLoop = profileData.hero_marquee.flatMap((item) => [item, "•"]);

    titles = [...singleLoop, ...singleLoop];
  }

  return (
    <div className="overflow-hidden whitespace-nowrap w-full mask-marquee">
      <div className="scroll-marquee gap-2 items-center">
        {titles.map((text, index) => (
          <span
            key={`${text}-${index}`}
            className="text-xs md:text-sm opacity-70 uppercase font-medium shrink-0"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
