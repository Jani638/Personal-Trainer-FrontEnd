import { useEffect, useState } from "react";
import type { Ttrainings, ActivityStats } from "../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { groupBy, sumBy } from "lodash";
import { Box, CircularProgress, Typography } from "@mui/material";

function Statistics() {
  const [data, setData] = useState<ActivityStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch trainings: ${response.statusText}`);
      }
      const trainings: Ttrainings[] = await response.json();

      const grouped = groupBy(trainings, "activity");
      const stats: ActivityStats[] = Object.keys(grouped).map((activity) => ({
        activity,
        totalDuration: sumBy(grouped[activity], "duration"),
      }));

      setData(stats);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 500, display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Training Statistics by Activity
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: "Duration (minutes)", angle: -90, position: "insideLeft" }} />
          <Tooltip 
            formatter={(value) => `${value} min`}
            labelFormatter={(label) => `Activity: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="totalDuration"
            fill="#6366f1"
            name="Total Duration (minutes)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default Statistics;
