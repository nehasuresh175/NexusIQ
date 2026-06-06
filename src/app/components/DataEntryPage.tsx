import { useState } from "react";
import { Plus, Trash2, Save, BarChart3 } from "lucide-react";

export interface UserData {
  kpis: {
    revenue: string;
    orders: string;
    customers: string;
    products: string;
  };
  revenueData: Array<{ month: string; revenue: number; orders: number }>;
  categoryData: Array<{ name: string; value: number }>;
  topProductsData: Array<{ product: string; revenue: number; units: number }>;
  ordersData: Array<{
    orderId: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
    date: string;
  }>;
}

interface DataEntryPageProps {
  onDataSubmit: (data: UserData) => void;
  userEmail: string;
}

export function DataEntryPage({ onDataSubmit, userEmail }: DataEntryPageProps) {
  const [activeTab, setActiveTab] = useState<
    "kpis" | "revenue" | "categories" | "products" | "orders"
  >("kpis");

  const [kpis, setKpis] = useState({
    revenue: "",
    orders: "",
    customers: "",
    products: "",
  });

  const [revenueData, setRevenueData] = useState([
    { month: "", revenue: 0, orders: 0 },
  ]);

  const [categoryData, setCategoryData] = useState([{ name: "", value: 0 }]);

  const [topProductsData, setTopProductsData] = useState([
    { product: "", revenue: 0, units: 0 },
  ]);

  const [ordersData, setOrdersData] = useState([
    {
      orderId: "",
      customer: "",
      product: "",
      amount: "",
      status: "",
      date: "",
    },
  ]);

  const handleSubmit = () => {
    if (!kpis.revenue || !kpis.orders || !kpis.customers || !kpis.products) {
      alert("Please fill in all KPI fields");
      return;
    }

    if (revenueData.some((item) => !item.month)) {
      alert("Please fill in all revenue trend data");
      return;
    }

    if (categoryData.some((item) => !item.name || item.value === 0)) {
      alert("Please fill in all category data");
      return;
    }

    const userData: UserData = {
      kpis,
      revenueData,
      categoryData,
      topProductsData: topProductsData.filter((p) => p.product),
      ordersData: ordersData.filter((o) => o.orderId),
    };

    onDataSubmit(userData);
  };

  const addRevenueEntry = () => {
    setRevenueData([...revenueData, { month: "", revenue: 0, orders: 0 }]);
  };

  const removeRevenueEntry = (index: number) => {
    setRevenueData(revenueData.filter((_, i) => i !== index));
  };

  const addCategoryEntry = () => {
    setCategoryData([...categoryData, { name: "", value: 0 }]);
  };

  const removeCategoryEntry = (index: number) => {
    setCategoryData(categoryData.filter((_, i) => i !== index));
  };

  const addProductEntry = () => {
    setTopProductsData([
      ...topProductsData,
      { product: "", revenue: 0, units: 0 },
    ]);
  };

  const removeProductEntry = (index: number) => {
    setTopProductsData(topProductsData.filter((_, i) => i !== index));
  };

  const addOrderEntry = () => {
    setOrdersData([
      ...ordersData,
      {
        orderId: "",
        customer: "",
        product: "",
        amount: "",
        status: "",
        date: "",
      },
    ]);
  };

  const removeOrderEntry = (index: number) => {
    setOrdersData(ordersData.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1>NexusIQ Enterprise Suite</h1>
                <p className="text-muted-foreground">Data Entry Portal</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h2 className="mb-2">Welcome to Your Dashboard Setup</h2>
          <p className="text-muted-foreground">
            Enter your business data below to generate your analytics dashboard.
            Fill in all required fields to continue.
          </p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("kpis")}
            className={`px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "kpis"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            KPIs
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "revenue"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            Revenue Trend
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "products"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            Top Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            Orders
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          {activeTab === "kpis" && (
            <div className="space-y-6">
              <h3>Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Total Revenue</label>
                  <input
                    type="text"
                    value={kpis.revenue}
                    onChange={(e) =>
                      setKpis({ ...kpis, revenue: e.target.value })
                    }
                    placeholder="e.g., $124,500"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block mb-2">Total Orders</label>
                  <input
                    type="text"
                    value={kpis.orders}
                    onChange={(e) =>
                      setKpis({ ...kpis, orders: e.target.value })
                    }
                    placeholder="e.g., 2,543"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block mb-2">Active Customers</label>
                  <input
                    type="text"
                    value={kpis.customers}
                    onChange={(e) =>
                      setKpis({ ...kpis, customers: e.target.value })
                    }
                    placeholder="e.g., 1,892"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block mb-2">Products Listed</label>
                  <input
                    type="text"
                    value={kpis.products}
                    onChange={(e) =>
                      setKpis({ ...kpis, products: e.target.value })
                    }
                    placeholder="e.g., 456"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "revenue" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3>Revenue Trend Data</h3>
                <button
                  onClick={addRevenueEntry}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Entry
                </button>
              </div>
              {revenueData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <label className="block mb-2">Month</label>
                    <input
                      type="text"
                      value={item.month}
                      onChange={(e) => {
                        const newData = [...revenueData];
                        newData[index].month = e.target.value;
                        setRevenueData(newData);
                      }}
                      placeholder="e.g., Jan"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Revenue</label>
                    <input
                      type="number"
                      value={item.revenue || ""}
                      onChange={(e) => {
                        const newData = [...revenueData];
                        newData[index].revenue = Number(e.target.value);
                        setRevenueData(newData);
                      }}
                      placeholder="e.g., 45000"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Orders</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={item.orders || ""}
                        onChange={(e) => {
                          const newData = [...revenueData];
                          newData[index].orders = Number(e.target.value);
                          setRevenueData(newData);
                        }}
                        placeholder="e.g., 580"
                        className="flex-1 px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {revenueData.length > 1 && (
                        <button
                          onClick={() => removeRevenueEntry(index)}
                          className="px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3>Sales by Category</h3>
                <button
                  onClick={addCategoryEntry}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>
              {categoryData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <label className="block mb-2">Category Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const newData = [...categoryData];
                        newData[index].name = e.target.value;
                        setCategoryData(newData);
                      }}
                      placeholder="e.g., Electronics"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Percentage</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={item.value || ""}
                        onChange={(e) => {
                          const newData = [...categoryData];
                          newData[index].value = Number(e.target.value);
                          setCategoryData(newData);
                        }}
                        placeholder="e.g., 35"
                        className="flex-1 px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {categoryData.length > 1 && (
                        <button
                          onClick={() => removeCategoryEntry(index)}
                          className="px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3>Top Products (Optional)</h3>
                <button
                  onClick={addProductEntry}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
              {topProductsData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <label className="block mb-2">Product Name</label>
                    <input
                      type="text"
                      value={item.product}
                      onChange={(e) => {
                        const newData = [...topProductsData];
                        newData[index].product = e.target.value;
                        setTopProductsData(newData);
                      }}
                      placeholder="e.g., Wireless Headphones"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Revenue</label>
                    <input
                      type="number"
                      value={item.revenue || ""}
                      onChange={(e) => {
                        const newData = [...topProductsData];
                        newData[index].revenue = Number(e.target.value);
                        setTopProductsData(newData);
                      }}
                      placeholder="e.g., 12500"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Units Sold</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={item.units || ""}
                        onChange={(e) => {
                          const newData = [...topProductsData];
                          newData[index].units = Number(e.target.value);
                          setTopProductsData(newData);
                        }}
                        placeholder="e.g., 450"
                        className="flex-1 px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={() => removeProductEntry(index)}
                        className="px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3>Recent Orders (Optional)</h3>
                <button
                  onClick={addOrderEntry}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Order
                </button>
              </div>
              {ordersData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <label className="block mb-2">Order ID</label>
                    <input
                      type="text"
                      value={item.orderId}
                      onChange={(e) => {
                        const newData = [...ordersData];
                        newData[index].orderId = e.target.value;
                        setOrdersData(newData);
                      }}
                      placeholder="e.g., ORD-2543"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Customer</label>
                    <input
                      type="text"
                      value={item.customer}
                      onChange={(e) => {
                        const newData = [...ordersData];
                        newData[index].customer = e.target.value;
                        setOrdersData(newData);
                      }}
                      placeholder="e.g., John Smith"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Product</label>
                    <input
                      type="text"
                      value={item.product}
                      onChange={(e) => {
                        const newData = [...ordersData];
                        newData[index].product = e.target.value;
                        setOrdersData(newData);
                      }}
                      placeholder="e.g., Wireless Headphones"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Amount</label>
                    <input
                      type="text"
                      value={item.amount}
                      onChange={(e) => {
                        const newData = [...ordersData];
                        newData[index].amount = e.target.value;
                        setOrdersData(newData);
                      }}
                      placeholder="e.g., $89.99"
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Status</label>
                    <select
                      value={item.status}
                      onChange={(e) => {
                        const newData = [...ordersData];
                        newData[index].status = e.target.value;
                        setOrdersData(newData);
                      }}
                      className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select Status</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Processing">Processing</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2">Date</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={item.date}
                        onChange={(e) => {
                          const newData = [...ordersData];
                          newData[index].date = e.target.value;
                          setOrdersData(newData);
                        }}
                        className="flex-1 px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={() => removeOrderEntry(index)}
                        className="px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Save className="w-5 h-5" />
              Generate Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
