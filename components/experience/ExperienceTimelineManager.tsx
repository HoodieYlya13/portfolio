"use client";

import { useState } from "react";
import TimelineToggle, { TimelineTab } from "./TimelineToggle";

interface ExperienceTimelineManagerProps {
  engineeringTimeline: React.ReactNode;
  foundationalTimeline: React.ReactNode;
}

export default function ExperienceTimelineManager({
  engineeringTimeline,
  foundationalTimeline,
}: ExperienceTimelineManagerProps) {
  const [activeTab, setActiveTab] = useState<TimelineTab>("engineering");

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <div className="px-4">
        <TimelineToggle activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div key={activeTab}>
        {activeTab === "engineering"
          ? engineeringTimeline
          : foundationalTimeline}
      </div>
    </div>
  );
}
