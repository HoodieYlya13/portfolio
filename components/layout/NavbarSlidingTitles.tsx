import { getFullProfile } from "@/lib/github";

export default async function NavbarSlidingTitles() {
  const profileData = await getFullProfile();

  let titles: string[] = [];

  if (profileData?.professional_summary) {
    const { roles, specializations } = profileData.professional_summary;
    const baseItems = [...roles, ...specializations];
    const singleLoop = baseItems.flatMap((item) => [item, "•"]);
    titles = [...singleLoop, ...singleLoop];
  } else
    titles = [
      "Next.js Expert",
      "•",
      "Software Engineer",
      "•",
      "Full Stack Developer",
      "•",
      "Next.js Expert",
      "•",
      "Software Engineer",
      "•",
      "Full Stack Developer",
      "•",
    ];

  return (
    <div className="overflow-hidden whitespace-nowrap w-full mask-marquee">
      <div className="scroll-marquee gap-2 items-center">
        {titles.map((text, index) => (
          <span
            key={index}
            className="text-xs md:text-sm opacity-70 uppercase font-medium shrink-0"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
