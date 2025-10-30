import type { Stats } from '@/types/type';
import { IndianRupee, Package, ShoppingCart } from 'lucide-react';
import React from 'react';

interface StatsProps {
  stats: Stats | null;
}
const StatsCard : React.FC<StatsProps> = ({stats}) => {
  const statsData = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '₹'+(stats?.totalRevenue?.toString() || '0'),
      icon: IndianRupee,
      bgGradient: 'from-emerald-500/10 to-emerald-400/5',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/10'
    },
    {
      id: 2,
      title: 'Orders Delivered',
      value: stats?.ordersDelivered?.toString() || '0',
      icon: Package,
      bgGradient: 'from-blue-500/10 to-blue-400/5',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/10'
    },
    {
      id: 3,
      title: 'Total Orders',
      value: stats?.totalOrders?.toString() || '0',
      icon: ShoppingCart,
      bgGradient: 'from-amber-500/10 to-amber-400/5',
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/10'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-lg rounded-xl border ${stat.borderColor} p-5 sm:p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-slate-800/50 ${stat.iconColor}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;