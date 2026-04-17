import { FiTrendingUp, FiArrowUpRight, FiBarChart2, FiDollarSign, FiCalendar } from "react-icons/fi";

const Analytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins">Business Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Detailed insights into your business performance and loan cycles.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <FiCalendar /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-500 transition-all">
            Export Report
          </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsHeroCard 
          title="Revenue Growth" 
          value="₦8,245,000" 
          trend="+22.4%" 
          description="Total revenue generated this month"
          icon={<FiTrendingUp />}
          color="emerald"
        />
        <AnalyticsHeroCard 
          title="Loan Utilization" 
          value="45%" 
          trend="In Control" 
          description="Percentage of your loan limit currently in use"
          icon={<FiBarChart2 />}
          color="blue"
        />
        <AnalyticsHeroCard 
          title="Repayment Health" 
          value="98.2%" 
          trend="Great" 
          description="Your score based on prompt repayments"
          icon={<FiDollarSign />}
          color="purple"
        />
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartBox title="Revenue Trends" />
        <ChartBox title="Repayment Schedule" />
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Historical Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Month</th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Repayment</th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { month: "March 2026", revenue: "₦2.1M", repayment: "₦45k", status: "Paid" },
                { month: "February 2026", revenue: "₦1.8M", repayment: "₦45k", status: "Paid" },
                { month: "January 2026", revenue: "₦2.4M", repayment: "₦45k", status: "Paid" },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-sm font-bold text-gray-900">{row.month}</td>
                  <td className="py-4 text-sm font-medium text-gray-600">{row.revenue}</td>
                  <td className="py-4 text-sm font-medium text-gray-600">{row.repayment}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CustomComboChart = ({ data, color }) => {
  const values = data.map(d => d.v);
  const max = Math.max(...values);
  const min = Math.min(...values) * 0.7; 
  const range = max - min || 1;

  const getX = (i) => (i / (data.length - 1)) * 100;
  const getY = (val) => 100 - ((val - min) / range) * 80;

  const points = data.map((d, i) => [getX(i), getY(d.v)]);
  
  const generateCurve = (pts) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      
      const cp1x = p1[0] + (p2[0] - p0[0]) * 0.15;
      const cp1y = p1[1] + (p2[1] - p0[1]) * 0.15;
      
      const cp2x = p2[0] - (p3[0] - p1[0]) * 0.15;
      const cp2y = p2[1] - (p3[1] - p1[1]) * 0.15;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  };

  const pathD = generateCurve(points);

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
      {data.map((d, i) => (
        <line
          key={`bar-${i}`}
          x1={getX(i)}
          y1={100}
          x2={getX(i)}
          y2={getY(d.v)}
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path 
        d={pathD}
        fill="none" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.9"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

const AnalyticsHeroCard = ({ title, value, trend, description, icon, color }) => {
  const chartData = [
    { v: 60 }, { v: 80 }, { v: 70 }, { v: 90 }, { v: 100 }, { v: 85 }, { v: 110 }
  ];

  const themes = {
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-600",
    blue: "bg-blue-50/50 border-blue-100 text-blue-600",
    purple: "bg-purple-50/50 border-purple-100 text-purple-600"
  };

  const iconBg = {
    emerald: "bg-emerald-600 text-white shadow-emerald-200",
    blue: "bg-blue-600 text-white shadow-blue-200",
    purple: "bg-purple-600 text-white shadow-purple-200"
  };

  const overlayBgColors = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500"
  };

  const lineColors = {
    emerald: "#10b981",
    blue: "#3b82f6",
    purple: "#a855f7"
  };

  return (
    <div className={`relative overflow-hidden p-8 rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 bg-white group ${themes[color]}`}>
      
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Pattern Mask */}
        <div 
          className={`absolute inset-0 opacity-[0.4] ${overlayBgColors[color]} pointer-events-none mix-blend-multiply`}
          style={{ 
            WebkitMaskImage: 'url(/Pattern.svg)',
            WebkitMaskSize: '150px',
            WebkitMaskRepeat: 'repeat',
            maskImage: 'url(/Pattern.svg)',
            maskSize: '150px',
            maskRepeat: 'repeat'
          }}
        />

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 opacity-[0.03] bg-linear-to-br from-white via-transparent to-black/10`} />

        {/* Custom Chart in Background */}
        <div className="absolute inset-x-0 bottom-0 h-28 opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-700 px-2 pb-1">
          <CustomComboChart data={chartData} color={lineColors[color]} />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${iconBg[color]}`}>
            {icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-sm text-gray-900 group-hover:border-gray-200 transition-colors">
            {trend}
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 font-poppins">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 truncate font-poppins tracking-tight group-hover:translate-x-1 transition-transform">{value}</h3>
          <p className="text-[11px] text-gray-600 font-medium mt-4 leading-relaxed line-clamp-2 transition-colors group-hover:text-gray-900">
            {description}
          </p>
        </div>
      </div>
      
      {/* Decorative Gradient Blob */}
      <div className={`absolute -bottom-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-[0.08] pointer-events-none group-hover:opacity-[0.14] transition-opacity duration-700 ${overlayBgColors[color]}`} />
    </div>
  );
};

const ChartBox = ({ title }) => (
  <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-80 flex flex-col">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h3>
      <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
        <FiArrowUpRight className="text-gray-400" />
      </button>
    </div>
    <div className="flex-1 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center flex-col gap-2">
       <div className="h-10 w-10 text-gray-300">
         <FiBarChart2 size={40} />
       </div>
       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visual Data Coming Soon</p>
    </div>
  </div>
);

export default Analytics;
