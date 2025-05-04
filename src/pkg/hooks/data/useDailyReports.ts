import { useEffect, useState } from "react";

export type ReportObject = {
  title: string;
  summary: string;
  tags: string[];
  url: string;
  date: string;
  relevance: number;
  images?: string[];
};

export type UseDailyReportsParams = {
  max?: number;
  index?: number;
  q?: string;
  relevance?: number;
};

export function useDailyReports({
  max = 30,
  index,
  q,
  relevance,
}: UseDailyReportsParams = {}) {
  const [reports, setReports] = useState<ReportObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const params = new URLSearchParams();
        if (q) params.append("q", q);
        if (typeof index === "number") params.append("index", index.toString());
        if (typeof max === "number") params.append("max", max.toString());
        if (typeof relevance === "number")
          params.append("relevance", relevance.toString());

        const baseServer = "https://daily-reports.onrender.com/reports";
        const res = await fetch(`${baseServer}?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const data: ReportObject[] = await res.json();
        setReports(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [q, index, max, relevance]);

  return { reports, loading, error };
}
