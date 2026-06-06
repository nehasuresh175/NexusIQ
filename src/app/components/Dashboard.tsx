import { useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Upload,
  Filter,
  LogOut,
  BarChart3,
  Edit,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { KPICard } from "./KPICard";
import { DataTable, Column } from "./DataTable";
import { ChartCard } from "./ChartCard";
import { DataUploader } from "./DataUploader";
import { EditModal } from "./EditModal";
import { UserData } from "./DataEntryPage";

interface DashboardProps {
  userData: UserData;
  userEmail: string;
  onLogout: () => void;
  onEditData: () => void;
  onUpdateTableData: (data: any[]) => void;
}

export function Dashboard({
  userData,
  userEmail,
  onLogout,
  onEditData,
  onUpdateTableData,
}: DashboardProps) {
  const [showUploader, setShowUploader] = useState(false);
  const [editingRow, setEditingRow] = useState<{
    data: Record<string, any>;
    index: number;
  } | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState("7d");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const COLORS = ["#0ea5e9", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

  const tableColumns: Column[] = [
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  const handleDataUpload = (data: Record<string, any>[]) => {
    if (data.length > 0) {
      onUpdateTableData(data);
      setShowUploader(false);
    }
  };

  const handleEditRow = (row: Record<string, any>, index: number) => {
    setEditingRow({ data: row, index });
  };

  const handleSaveEdit = (updatedData: Record<string, any>) => {
    if (editingRow !== null) {
      const newData = [...userData.ordersData];
      newData[editingRow.index] = updatedData;
      onUpdateTableData(newData);
      setEditingRow(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1>NexusIQ Enterprise Suite</h1>
                <p className="text-muted-foreground">
                  Analytics Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={onEditData}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Data
              </button>
              <button
                onClick={() => setShowUploader(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload CSV
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard
            title="Total Revenue"
            value={userData.kpis.revenue}
            change={0}
            changeLabel="current period"
            icon={<DollarSign className="w-6 h-6" />}
          />
          <KPICard
            title="Total Orders"
            value={userData.kpis.orders}
            change={0}
            changeLabel="current period"
            icon={<ShoppingCart className="w-6 h-6" />}
          />
          <KPICard
            title="Active Customers"
            value={userData.kpis.customers}
            change={0}
            changeLabel="current period"
            icon={<Users className="w-6 h-6" />}
          />
          <KPICard
            title="Products Listed"
            value={userData.kpis.products}
            change={0}
            changeLabel="current period"
            icon={<Package className="w-6 h-6" />}
          />
        </div>

        {userData.revenueData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <ChartCard title="Revenue & Orders Trend">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userData.revenueData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient
                        id="colorOrders"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0ea5e9"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Revenue ($)"
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="#06b6d4"
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                      name="Orders"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {userData.categoryData.length > 0 && (
              <ChartCard title="Sales by Category">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userData.categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userData.categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
          </div>
        )}

        {userData.topProductsData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Top Products by Revenue">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userData.topProductsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis
                    dataKey="product"
                    type="category"
                    width={150}
                    stroke="#64748b"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#0ea5e9" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Units Sold by Product">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userData.topProductsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="product"
                    stroke="#64748b"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="units" fill="#06b6d4" name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {userData.ordersData.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2>Recent Orders</h2>
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="shipped">Shipped</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <DataTable
              columns={tableColumns}
              data={userData.ordersData}
              onEdit={handleEditRow}
            />
          </div>
        )}
      </main>

      {showUploader && (
        <DataUploader
          onDataUpload={handleDataUpload}
          onClose={() => setShowUploader(false)}
        />
      )}

      {editingRow && (
        <EditModal
          data={editingRow.data}
          onSave={handleSaveEdit}
          onClose={() => setEditingRow(null)}
        />
      )}
    </div>
  );
}
