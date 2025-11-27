import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProjectData {
  name: string;
  tasks: number;
}

export default function ProjectBarChart({ data }: { data: ProjectData[] }) {
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        name: item.name,
        value: item.tasks,
      }))
    : [];

  // Dynamic height: each bar ~40px
  const chartHeight = chartData.length * 40;

  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Tasks per Project
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-y-auto" style={{ height: 500 }}>
        <div style={{ height: chartHeight, minHeight: "100%" }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart layout="vertical" data={chartData}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tickFormatter={(value: string) =>
                  value.length > 20 ? value.slice(0, 20) + "..." : value
                }
              />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
