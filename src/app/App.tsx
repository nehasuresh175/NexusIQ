import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { DataEntryPage, UserData } from "./components/DataEntryPage";
import { Dashboard } from "./components/Dashboard";

type AppState = "login" | "dataEntry" | "dashboard";

export default function App() {
  const [appState, setAppState] = useState<AppState>("login");
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setAppState("dataEntry");
  };

  const handleDataSubmit = (data: UserData) => {
    setUserData(data);
    setAppState("dashboard");
  };

  const handleLogout = () => {
    setAppState("login");
    setUserEmail("");
    setUserData(null);
  };

  const handleEditData = () => {
    setAppState("dataEntry");
  };

  const handleUpdateTableData = (newOrdersData: any[]) => {
    if (userData) {
      setUserData({
        ...userData,
        ordersData: newOrdersData,
      });
    }
  };

  if (appState === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (appState === "dataEntry") {
    return (
      <DataEntryPage onDataSubmit={handleDataSubmit} userEmail={userEmail} />
    );
  }

  if (appState === "dashboard" && userData) {
    return (
      <Dashboard
        userData={userData}
        userEmail={userEmail}
        onLogout={handleLogout}
        onEditData={handleEditData}
        onUpdateTableData={handleUpdateTableData}
      />
    );
  }

  return null;
}
