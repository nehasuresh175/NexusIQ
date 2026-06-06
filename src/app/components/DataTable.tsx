import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  onEdit?: (row: Record<string, any>, index: number) => void;
}

export function DataTable({ columns, data, onEdit }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = [...data];

    if (searchTerm) {
      filteredData = filteredData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return filteredData;
  }, [data, sortConfig, searchTerm]);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable !== false && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`w-3 h-3 -mb-1 ${
                            sortConfig?.key === column.key &&
                            sortConfig?.direction === "asc"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 ${
                            sortConfig?.key === column.key &&
                            sortConfig?.direction === "desc"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {onEdit && <th className="px-6 py-3 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {row[column.key]}
                  </td>
                ))}
                {onEdit && (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onEdit(row, index)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedAndFilteredData.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No data found
        </div>
      )}
    </div>
  );
}
