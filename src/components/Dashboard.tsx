import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AcademicReport } from "./AcademicReport";
import { OverallReport } from "./OverallReport";
import { HighRiskPage } from "./HighRiskPage";
import { Chatbot } from "./Chatbot";
import { 
  BookOpen, 
  BarChart3, 
  AlertTriangle, 
  LogOut, 
  User,
  Calendar,
  Target,
  Users,
  TrendingUp,
  GraduationCap,
  Home
} from "lucide-react";

interface DashboardProps {
  userRole: string;
  userEmail: string;
  onLogout: () => void;
}

export function Dashboard({ userRole, userEmail, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(getDefaultTab(userRole));

  function getDefaultTab(role: string) {
    switch (role) {
      case "student": return "overview";
      case "parent": return "child-report";
      case "admin": return "high-risk";
      default: return "overview";
    }
  }

  const getTabsForRole = (role: string) => {
    switch (role) {
      case "student":
        return [
          { id: "overview", label: "Overview", icon: Home },
          { id: "attendance", label: "Attendance", icon: Calendar },
          { id: "reports", label: "Reports", icon: BookOpen },
          { id: "scores", label: "Scores", icon: Target }
        ];
      case "parent":
        return [
          { id: "child-report", label: "Child's Report", icon: BarChart3 },
          { id: "progress", label: "Progress Tracking", icon: TrendingUp },
          { id: "attendance", label: "Attendance", icon: Calendar }
        ];
      case "admin":
        return [
          { id: "high-risk", label: "High-Risk Students", icon: AlertTriangle },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "students", label: "All Students", icon: Users }
        ];
      default:
        return [{ id: "overview", label: "Overview", icon: Home }];
    }
  };

  const tabs = getTabsForRole(userRole);

  const renderContent = () => {
    if (userRole === "student") {
      switch (activeTab) {
        case "overview":
        case "reports":
          return <AcademicReport userRole={userRole} />;
        case "attendance":
        case "scores":
          return <AcademicReport userRole={userRole} />;
        default:
          return <AcademicReport userRole={userRole} />;
      }
    } else if (userRole === "parent") {
      switch (activeTab) {
        case "child-report":
        case "progress":
        case "attendance":
          return <OverallReport userRole={userRole} />;
        default:
          return <OverallReport userRole={userRole} />;
      }
    } else if (userRole === "admin") {
      switch (activeTab) {
        case "high-risk":
          return <HighRiskPage userRole={userRole} />;
        case "analytics":
        case "students":
          return <OverallReport userRole={userRole} />;
        default:
          return <HighRiskPage userRole={userRole} />;
      }
    }
    return <AcademicReport userRole={userRole} />;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student": return "bg-slate-900";
      case "parent": return "bg-slate-800";
      case "admin": return "bg-slate-700";
      default: return "bg-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getRoleColor(userRole)}`}>
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">EduGuard Dashboard</h1>
                <p className="text-sm text-slate-600">Student Performance Hub</p>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={`capitalize ${getRoleColor(userRole)} text-white border-0 font-medium`}
            >
              {userRole}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <User className="h-4 w-4" />
              <span className="text-sm">{userEmail}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="border-gray-300 hover:bg-gray-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-89px)]">
          <div className="p-4">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <Button
                    key={tab.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start transition-all duration-200 ${
                      isActive 
                        ? `${getRoleColor(userRole)} text-white shadow-sm` 
                        : "hover:bg-gray-100 text-slate-700"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    <span className="font-medium">{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}