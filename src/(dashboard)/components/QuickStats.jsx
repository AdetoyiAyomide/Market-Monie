import { FiTrendingUp, FiArrowDown, FiCreditCard, FiActivity } from "react-icons/fi";

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
      {/* Background Bars */}
      {data.map((d, i) => (
        <line
          key={`bar-${i}`}
          x1={getX(i)}
          y1={100}
          x2={getX(i)}
          y2={getY(d.v)}
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      
      {/* Smooth Line */}
      <path 
        d={pathD}
        fill="none" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.9"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

const QuickStats = () => {
  const stats = [
    { 
      label: "Loan Balance", 
      value: "₦2,450,000", 
      trend: "+12.5%", 
      isPositive: false, // Balance increasing is usually 'negative' in a loan context
      icon: <FiActivity />,
      color: "emerald",
      chartData: [
        { v: 80 }, { v: 100 }, { v: 90 }, { v: 130 }, { v: 120 }, { v: 150 }, { v: 180 }, { v: 160 }, { v: 200 }
      ]
    },
    { 
      label: "Next Repayment", 
      value: "₦45,000", 
      trend: "In 15 days", 
      isPositive: true,
      icon: <FiCreditCard />,
      color: "blue",
      chartData: [
        { v: 180 }, { v: 160 }, { v: 170 }, { v: 150 }, { v: 140 }, { v: 160 }, { v: 130 }, { v: 140 }, { v: 110 }
      ]
    },
    { 
      label: "Credit Score", 
      value: "740", 
      trend: "Excellent", 
      isPositive: true,
      icon: <FiTrendingUp />,
      color: "purple",
      chartData: [
        { v: 620 }, { v: 640 }, { v: 635 }, { v: 660 }, { v: 690 }, { v: 680 }, { v: 710 }, { v: 730 }, { v: 740 }
      ]
    },
    { 
      label: "Limit Used", 
      value: "4.5%", 
      trend: "₦450k / ₦10M", 
      isPositive: true,
      icon: <FiArrowDown className="rotate-180" />,
      color: "orange",
      chartData: [
        { v: 15 }, { v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }, { v: 28 }, { v: 35 }, { v: 40 }, { v: 45 }
      ]
    },
  ];

  const themeColors = {
    emerald: "text-emerald-600 border-emerald-100 bg-emerald-50/20",
    blue: "text-blue-600 border-blue-100 bg-blue-50/20",
    purple: "text-purple-600 border-purple-100 bg-purple-50/20",
    orange: "text-orange-600 border-orange-100 bg-orange-50/20"
  };

  const lineColors = {
    emerald: "#10b981",
    blue: "#3b82f6",
    purple: "#a855f7",
    orange: "#f97316"
  };

  const overlayBgColors = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="relative overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          
          {/* Background Layer: Pattern & Charts */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            
            {/* Refined Pattern Overlay using Mask to tint the SVG with theme color */}
            <div 
              className={`absolute inset-0 opacity-[0.90] ${overlayBgColors[stat.color]} pointer-events-none mix-blend-multiply`}
              style={{ 
                WebkitMaskImage: 'url(/Pattern.svg)',
                WebkitMaskSize: '180px',
                WebkitMaskRepeat: 'repeat',
                maskImage: 'url(/Pattern.svg)',
                maskSize: '180px',
                maskRepeat: 'repeat'
              }}
            />
            
            {/* Subtle gradient overlay for depth */}
            <div className={`absolute inset-0 opacity-[0.03] bg-linear-to-br from-white via-transparent to-black/10`} />

            {/* Native SVG Combo Chart */}
            <div className="absolute inset-x-0 bottom-0 h-24 opacity-[0.18] group-hover:opacity-[0.28] transition-opacity duration-500 px-2 pb-1">
              <CustomComboChart data={stat.chartData} color={lineColors[stat.color]} />
            </div>
          </div>
          
          {/* Foreground Content */}
          <div className="relative z-10 pointer-events-auto h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className={`h-11 w-11 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm shadow-gray-200 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${themeColors[stat.color]}`}>
                {stat.icon}
              </div>
              {stat.isPositive !== null && (
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border bg-white/50 backdrop-blur-md shadow-sm ${
                    stat.isPositive ? "border-emerald-100 text-emerald-600" : "border-red-100 text-red-600"
                  }`}>
                    {stat.trend}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-auto">
               <p className="text-[10px] text-gray-500 font-bold tracking-[1.5px] group-hover:text-gray-700 transition-colors">{stat.label}</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1 font-poppins tracking-tight group-hover:translate-x-1 transition-transform duration-300">{stat.value}</h3>
               {(stat.isPositive === null) && (
                  <p className="text-[9px] text-gray-400 font-bold mt-1.5 tracking-wider">{stat.trend}</p>
               )}
            </div>
          </div>

          <div className={`absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-3xl opacity-[0.12] pointer-events-none group-hover:opacity-[0.2] transition-opacity duration-500 ${overlayBgColors[stat.color]} `} />
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
