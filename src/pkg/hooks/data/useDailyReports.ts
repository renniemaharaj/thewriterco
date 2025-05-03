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

export function useDailyReports() {
  const [reports, setReports] = useState<ReportObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // const baseServer = "http://localhost:4000/reports";
        const baseServer = "https://daily-reports.onrender.com/reports";
        const res = await fetch(baseServer);
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
  }, []);

  return { reports, loading, error };
}
