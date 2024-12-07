import { useState } from "react";

export type Insert = {
  summary: string;
  description: string;
  embeddYoutube?: string;
  wide?: boolean;
};

const HRTMInsertsFromDB: Insert[] = [
  {
    summary: "HRTM Consulting Inc",
    description:
      "Proven success across business sectors with experience in varied industries.",
    wide: true,
  },
  {
    summary: "HRTM Consulting Inc",
    description: "HRTM on Workforce TeleStaff and Public Safety",
    embeddYoutube:
      "https://www.youtube.com/watch?v=XG589HMXcSw&ab_channel=HRTMConsulting",
  },
];

export default function useFeedInserts() {
  const [inserts] = useState<Insert[]>(HRTMInsertsFromDB);

  return {
    inserts,
  };
}
