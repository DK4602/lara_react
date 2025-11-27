import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#1447E6", "#31D492"];

export default function UserPieCharts({
  data,
}: {
  data: { employees: number; clients: number };
}) {
  const chartData = [
    { name: "Employees", value: data.employees },
    { name: "Clients", value: data.clients },
  ];

  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          User Overview
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
