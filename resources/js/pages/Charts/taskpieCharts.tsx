import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#6366F1", "#F59E0B", "#10B981"];

export default function TaskpieCharts({
  data,
}: {
  data: { ip_task: number; pending_task: number; completed_task: number };
}) {
  const chartData = [
    { name: "In Progress", value: data.ip_task },
    { name: "Pending", value: data.pending_task },
    { name: "Completed", value: data.completed_task },
  ];

  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Task Status Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <PieChart width={350} height={270}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            label
            outerRadius={80}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
}
