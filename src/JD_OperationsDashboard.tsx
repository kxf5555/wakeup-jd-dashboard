import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RefreshCw, UploadCloud } from "lucide-react";

/**
 * JD_OperationsDashboard.tsx  – 生产版
 * --------------------------------------------------------------
 * - KPI 指标卡       ：GMV、ROI、询盘转化率等
 * - 30 天 GMV 折线图  ：Recharts
 * - 询盘线索表       ：支持 CSV 导入 / 实时刷新
 * - API 占位         ：兼容京东开放平台 / 内部接口
 * --------------------------------------------------------------
 */

interface Kpi {
  label: string;
  value: number | string;
  unit?: string;
}
interface Lead {
  id: string;
  company: string;
  contact: string;
  quantity: string;
  standard: string;
  createdAt: string;
  status: "new" | "followed" | "ordered";
}

// —— MOCK 数据（可替换成 API 请求）
const mockKpis: Kpi[] = [
  { label: "30天GMV", value: 480000, unit: "¥" },
  { label: "30天订单数", value: 38 },
  { label: "询盘→订单", value: "13%" },
  { label: "ROI", value: "1.9" },
  { label: "退款率", value: "0.8%" },
];
const mockChart = [
  { date: "2025-05-01", gmv: 20000 },
  { date: "2025-05-08", gmv: 52000 },
  { date: "2025-05-15", gmv: 96000 },
  { date: "2025-05-22", gmv: 150000 },
  { date: "2025-05-28", gmv: 480000 },
];
const mockLeads: Lead[] = [
  { id: "L‑001", company: "中核运维有限公司", contact: "张伟", quantity: "20+", standard: "EN 943‑1", createdAt: "2025‑05‑20 14:12", status: "new" },
  { id: "L‑002", company: "深圳市疾控中心", contact: "李明", quantity: "6‑20", standard: "ISO 16602", createdAt: "2025‑05‑21 09:35", status: "followed" },
  { id: "L‑003", company: "青岛消防救援支队", contact: "陈宇", quantity: "1‑5", standard: "GB 24539", createdAt: "2025‑05‑24 16:08", status: "ordered" },
];

export default function JD_OperationsDashboard() {
  const [kpis, setKpis] = useState<Kpi[]>(mockKpis);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const refreshData = async () => {
    // TODO: 接入真实接口
    console.log("[Mock] Refresh");
  };
  const handleCsvImport = async () => {
    if (!csvFile) return;
    alert(`已导入 ${csvFile.name}`);
    setCsvFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">WAKEUP ‑ 京东运营仪表盘</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <Input type="file" accept="text/csv" className="hidden" onChange={(e) => setCsvFile(e.target.files?.[0] || null)} />
            <Button variant="secondary" className="gap-1.5"><UploadCloud className="w-4 h-4" /> 导入CSV</Button>
          </label>
          <Button onClick={handleCsvImport} disabled={!csvFile} className="gap-1.5">处理</Button>
          <Button onClick={refreshData} variant="outline" className="gap-1.5"><RefreshCw className="w-4 h-4" /> 刷新</Button>
        </div>
      </header>

      {/* KPI */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent><p className="text-sm text-gray-500 mb-1">{k.label}</p><p className="text-xl font-bold">{k.unit || ""}{k.value}</p></CardContent></Card>
        ))}
      </section>

      {/* Chart */}
      <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-medium mb-4">过去30天GMV趋势</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={mockChart} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v: number) => `¥${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="gmv" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Leads */}
      <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-medium mb-4">询盘线索</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>公司</TableHead><TableHead>联系人</TableHead><TableHead>数量</TableHead><TableHead>标准</TableHead><TableHead>创建时间</TableHead><TableHead>状态</TableHead></TableRow></TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.id} className="hover:bg-gray-50">
                  <TableCell>{l.id}</TableCell><TableCell>{l.company}</TableCell><TableCell>{l.contact}</TableCell><TableCell>{l.quantity}</TableCell><TableCell>{l.standard}</TableCell><TableCell>{l.createdAt}</TableCell>
                  <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${l.status==='ordered'?'bg-green-100 text-green-800':l.status==='followed'?'bg-yellow-100 text-yellow-800':'bg-gray-100 text-gray-800'}`}>{l.status==='new'?'新建':l.status==='followed'?'跟进中':'已下单'}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
