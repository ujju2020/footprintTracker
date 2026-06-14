import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './CategoryChart.css';

const defaultData = [
  { name: 'Transport', value: 1.8, color: '#0ea5e9' },
  { name: 'Diet', value: 1.2, color: '#22c55e' },
  { name: 'Home Energy', value: 0.8, color: '#d97706' },
  { name: 'Shopping', value: 0.4, color: '#8b5cf6' },
];

const CategoryChart = ({ data = defaultData }) => {
  return (
    <div className="category-chart glass-panel">
      <h3>Emissions by Category</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }} 
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '14px', color: '#94a3b8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
