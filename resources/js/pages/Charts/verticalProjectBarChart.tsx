import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface ProjectData {
    name: string;
    tasks: number;
}

export default function VerticalProjectBarChart({
    data,
}: {
    data: ProjectData[];
}) {
    const chartData = Array.isArray(data)
        ? data.map((item) => ({
              name: item.name,
              value: item.tasks,
          }))
        : [];

    return (
        <Card className="p-4 shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Tasks per Project
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div style={{ height: 300, width: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />

                            {/* X-axis is now category (projects) */}
                            <XAxis
                                dataKey="name"
                                interval={0}
                                angle={-20}
                                textAnchor="end"
                                tickFormatter={(value: string) =>
                                    value.length > 15
                                        ? value.slice(0, 15) + '...'
                                        : value
                                }
                            />

                            {/* Y-axis is numeric */}
                            <YAxis type="number" allowDecimals={false} />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="#6366F1"
                                radius={[4, 4, 0, 0]}
                                barSize={35}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
