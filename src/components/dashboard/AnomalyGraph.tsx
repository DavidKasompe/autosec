import React, { useState, useRef, useEffect } from 'react';
import { AnomalyData } from '../../types';
import { Card } from '../ui/Card';
import { BarChart3, Grid, Info } from 'lucide-react';

interface AnomalyGraphProps {
  data: AnomalyData[];
}

const GRAPH_HEIGHT = 160;
const GRAPH_PADDING = 20;
const TOOLTIP_OFFSET = 10;

function createHeatmapCells(data: AnomalyData[]) {
  const categories = Array.from(new Set(data.map(d => d.category)));
  const recentData = categories.map(category => {
    const categoryData = data
      .filter(d => d.category === category)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 25);
    return { category, data: categoryData };
  });
  return recentData;
}

interface TooltipData {
  x: number;
  y: number;
  value: number;
  timestamp: string;
  category: string;
}

export const AnomalyGraph: React.FC<AnomalyGraphProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<'graph' | 'heatmap'>('graph');
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const prepareGraphData = () => {
    const categories = Array.from(new Set(data.map(d => d.category)));
    const timestamps = Array.from(new Set(data.map(d => d.timestamp)))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-20);
    
    const formattedData = categories.map(category => {
      const values = timestamps.map(ts => {
        const point = data.find(d => d.category === category && d.timestamp === ts);
        return point?.value || 0;
      });
      return { category, values };
    });
    
    return { categories, timestamps, formattedData };
  };
  
  const { timestamps, formattedData } = prepareGraphData();
  const heatmapData = createHeatmapCells(data);
  const maxValue = Math.max(...data.map(d => d.value));
  
  const categoryColors = {
    'network_traffic': '#3B82F6',
    'authentication': '#10B981',
    'system_resources': '#F59E0B',
    'data_access': '#EC4899',
  };

  const getDataColor = (value: number) => {
    if (value < 0.3) return 'bg-green-900/80 hover:bg-green-800';
    if (value < 0.5) return 'bg-blue-900/80 hover:bg-blue-800';
    if (value < 0.7) return 'bg-amber-900/80 hover:bg-amber-800';
    return 'bg-red-900/80 hover:bg-red-800';
  };
  
  const getCategoryColor = (category: string): string => {
    return categoryColors[category as keyof typeof categoryColors] || '#6B7280';
  };
  
  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.getMinutes().toString().padStart(2, '0');
  };
  
  const getCategoryLabel = (category: string): string => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const timeIndex = Math.floor((x / rect.width) * (timestamps.length - 1));
    
    if (timeIndex >= 0 && timeIndex < timestamps.length) {
      const timestamp = timestamps[timeIndex];
      formattedData.forEach(series => {
        const value = series.values[timeIndex];
        if (value !== undefined) {
          const y = GRAPH_HEIGHT - (value / maxValue) * (GRAPH_HEIGHT - GRAPH_PADDING);
          const mouseY = e.clientY - rect.top;
          
          // Only show tooltip if mouse is close to the data point
          if (Math.abs(mouseY - y) < 20) {
            setTooltip({
              x: e.clientX,
              y: e.clientY,
              value,
              timestamp,
              category: series.category
            });
            return;
          }
        }
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setTooltip(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Card 
      title="Anomaly Detection" 
      headerRight={
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Info size={16} className="text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 rounded shadow-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Anomaly scores indicate potential security threats. Higher scores require immediate attention.
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-700 rounded-md p-0.5">
            <button 
              className={`px-2 py-1 rounded text-xs flex items-center gap-1
                ${viewMode === 'graph' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setViewMode('graph')}
            >
              <BarChart3 size={14} />
              Graph
            </button>
            <button 
              className={`px-2 py-1 rounded text-xs flex items-center gap-1
                ${viewMode === 'heatmap' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setViewMode('heatmap')}
            >
              <Grid size={14} />
              Heatmap
            </button>
          </div>
        </div>
      }
    >
      <div className="h-full">
        {viewMode === 'graph' ? (
          <div className="relative h-[200px]" ref={graphRef}>
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
              <span>1.0</span>
              <span>0.5</span>
              <span>0.0</span>
            </div>
            
            <div className="ml-6 h-full relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-gray-800"></div>
                <div className="border-t border-gray-800"></div>
                <div className="border-t border-gray-800"></div>
              </div>
              
              <svg 
                className="w-full h-full" 
                viewBox={`0 0 ${timestamps.length - 1} ${GRAPH_HEIGHT}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  {formattedData.map((series, i) => (
                    <linearGradient
                      key={`gradient-${i}`}
                      id={`line-gradient-${i}`}
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      y1={GRAPH_HEIGHT}
                      x2="0"
                      y2="0"
                    >
                      <stop offset="0%" stopColor={getCategoryColor(series.category)} stopOpacity="0.1" />
                      <stop offset="100%" stopColor={getCategoryColor(series.category)} stopOpacity="0.5" />
                    </linearGradient>
                  ))}
                </defs>
                
                {formattedData.map((series, seriesIndex) => (
                  <g key={seriesIndex}>
                    <path
                      d={`M0,${GRAPH_HEIGHT} ` + 
                        series.values.map((value, i) => 
                          `L${i},${GRAPH_HEIGHT - (value / maxValue) * (GRAPH_HEIGHT - GRAPH_PADDING)}`
                        ).join(' ') +
                        `L${series.values.length - 1},${GRAPH_HEIGHT} Z`}
                      fill={`url(#line-gradient-${seriesIndex})`}
                      className="transition-opacity duration-300"
                      style={{ opacity: tooltip?.category === series.category ? 0.8 : 0.2 }}
                    />
                    <path
                      d={`M0,${GRAPH_HEIGHT - (series.values[0] / maxValue) * (GRAPH_HEIGHT - GRAPH_PADDING)} ` + 
                        series.values.slice(1).map((value, i) => 
                          `L${i + 1},${GRAPH_HEIGHT - (value / maxValue) * (GRAPH_HEIGHT - GRAPH_PADDING)}`
                        ).join(' ')}
                      fill="none"
                      stroke={getCategoryColor(series.category)}
                      strokeWidth="2"
                      strokeLinejoin="round"
                      className="animate-lineDrawIn"
                      style={{ 
                        animationDelay: `${seriesIndex * 100}ms`,
                        opacity: tooltip?.category === series.category ? 1 : 0.5
                      }}
                    />
                    {series.values.map((value, i) => (
                      <circle
                        key={i}
                        cx={i}
                        cy={GRAPH_HEIGHT - (value / maxValue) * (GRAPH_HEIGHT - GRAPH_PADDING)}
                        r="2"
                        fill={getCategoryColor(series.category)}
                        className="animate-fadeIn"
                        style={{ 
                          animationDelay: `${(seriesIndex * 100) + (i * 10)}ms`,
                          opacity: tooltip?.category === series.category ? 1 : 0.5
                        }}
                      />
                    ))}
                  </g>
                ))}
              </svg>
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 transform translate-y-5">
                {timestamps.filter((_, i) => i % 4 === 0).map((ts, i) => (
                  <span key={i} className="text-center" style={{ width: '25px' }}>
                    {formatTimestamp(ts)}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              {formattedData.map((series) => (
                <div 
                  key={series.category} 
                  className="flex items-center gap-1 cursor-pointer transition-opacity duration-200"
                  style={{ opacity: tooltip?.category === series.category ? 1 : 0.7 }}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: getCategoryColor(series.category) }}
                  ></div>
                  <span className="text-xs text-gray-400">{getCategoryLabel(series.category)}</span>
                </div>
              ))}
            </div>

            {tooltip && (
              <div
                ref={tooltipRef}
                className="absolute z-10 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: tooltip.x,
                  top: tooltip.y - TOOLTIP_OFFSET
                }}
              >
                <div className="font-medium text-white">
                  {getCategoryLabel(tooltip.category)}
                </div>
                <div className="text-gray-300">
                  Score: {tooltip.value.toFixed(3)}
                </div>
                <div className="text-gray-400 text-xs">
                  {new Date(tooltip.timestamp).toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {heatmapData.map((category) => (
              <div key={category.category} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: getCategoryColor(category.category) }}
                  ></div>
                  <span className="text-sm text-gray-300">{getCategoryLabel(category.category)}</span>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-2">
                  {category.data.map((point, i) => (
                    <div 
                      key={i}
                      className={`
                        ${getDataColor(point.value)} 
                        w-6 h-6 rounded-sm transition-all duration-300
                        cursor-pointer relative group
                      `}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                        bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Score: {point.value.toFixed(3)}
                        <br />
                        {new Date(point.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center gap-1 pt-2">
              <div className="bg-green-900/80 w-4 h-4 rounded-sm"></div>
              <div className="bg-blue-900/80 w-4 h-4 rounded-sm"></div>
              <div className="bg-amber-900/80 w-4 h-4 rounded-sm"></div>
              <div className="bg-red-900/80 w-4 h-4 rounded-sm"></div>
              <div className="text-xs text-gray-400 ml-2">Low to High Anomaly Score</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};