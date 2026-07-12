'use client';

import { MagneticStatCard } from '@/components/ui/MagneticStatCard';
import { AssetCore } from '@/components/ui/AssetCore';
import { AssetHealthOrb } from '@/components/ui/AssetHealthOrb';
import { AssetDistribution } from '@/components/ui/AssetDistribution';
import { ActivityBeam } from '@/components/ui/ActivityBeam';
import { useAssetStore } from '@/components/store/AssetStore';
import { 
  Boxes, 
  LinkIcon, 
  Wrench, 
  Calendar 
} from 'lucide-react';
import { api } from '@/lib/api';
import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { departments } = useAssetStore();

  const [dashboardData, setDashboardData] = useState<unknown>(null);

  useEffect(() => {
    api.get('/dashboard/').then(res => {
      if (res.data) setDashboardData(res.data);
    }).catch(console.error);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dashData = dashboardData as any;
  const totalAssetsCount = dashData?.assets_by_status?.total || 0;
  const activeAllocatedPercent = totalAssetsCount > 0 
    ? Math.round(((dashData?.active_allocations || 0) / totalAssetsCount) * 100) 
    : 0;
  const activeMaintenanceCount = dashData?.open_maintenance_requests || 0;
  const upcomingBookingsCount = dashData?.upcoming_bookings || 0;

  let nodesData = undefined;
  if (dashData?.assets_by_department) {
    nodesData = Object.entries(dashData.assets_by_department).map(([deptId, count]) => {
      const dept = departments.find(d => d.id === deptId);
      return {
        id: deptId,
        name: dept ? dept.name : (deptId === 'unassigned' ? 'Unassigned' : 'Unknown'),
        count: count as number,
        allocated: 'N/A'
      };
    });
  }

  return (
    <div className="space-y-6">
      {/* Greetings Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-border/60">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground tracking-tight md:text-3xl">
            Good morning, Keerthana.
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Your asset ecosystem is operating efficiently.
          </p>
        </div>

        {/* Live system state */}
        <div className="flex items-center space-x-2 bg-card/65 border border-border/80 px-3 py-1.5 rounded-lg w-fit shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-[10px] font-bold text-foreground tracking-widest uppercase">
            LIVE SYSTEM STATE
          </span>
        </div>
      </div>

      {/* Magnetic Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MagneticStatCard
          title="Total Assets"
          value={totalAssetsCount}
          subtitle="+8.2% this month"
          trend="+8.2%"
          trendType="up"
          icon={Boxes}
          statusColor="text-primary"
        />
        <MagneticStatCard
          title="Allocated"
          value={`${activeAllocatedPercent}%`}
          subtitle="1,023 active assets"
          trend="1,023 units"
          trendType="neutral"
          icon={LinkIcon}
          statusColor="text-success"
        />
        <MagneticStatCard
          title="Maintenance"
          value={activeMaintenanceCount}
          subtitle="4 high priority"
          trend="4 High"
          trendType="down"
          icon={Wrench}
          statusColor="text-warning"
        />
        <MagneticStatCard
          title="Upcoming Bookings"
          value={upcomingBookingsCount}
          subtitle="Next 7 days"
          trend="7 Days"
          trendType="up"
          icon={Calendar}
          statusColor="text-secondary"
        />
      </div>

      {/* Visual Data Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Topology */}
        <div className="lg:col-span-2">
          <AssetCore nodesData={nodesData} />
        </div>

        {/* Right Side: Charts stacked */}
        <div className="flex flex-col gap-6">
          <AssetHealthOrb />
          <AssetDistribution />
        </div>
      </div>

      {/* Bottom Timeline Activities */}
      <div className="w-full">
        <ActivityBeam />
      </div>
    </div>
  );
}
