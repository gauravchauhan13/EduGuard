import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { 
  TrendingUp, 
  Filter, 
  Download, 
  User, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  BookOpen,
  Target,
  Award,
  Users,
  TrendingDown,
  Info
} from "lucide-react";

interface OverallReportProps {
  userRole: string;
}

export function OverallReport({ userRole }: OverallReportProps) {
  const [timeFilter, setTimeFilter] = useState("semester");
  const [compareWith, setCompareWith] = useState("class-average");

  // Mock child data for parent dashboard
  const childData = {
    name: "Emma Johnson",
    grade: "10th Grade",
    section: "A",
    rollNumber: "101",
    overallGPA: 3.8,
    dropoutRisk: 25, // percentage
    riskLevel: "Low"
  };

  // Subject tiles data
  const subjectTiles = [
    { subject: "Mathematics", score: 85, grade: "B+", trend: "up", color: "#3b82f6" },
    { subject: "Science", score: 92, grade: "A-", trend: "up", color: "#10b981" },
    { subject: "English", score: 78, grade: "B", trend: "down", color: "#f59e0b" },
    { subject: "History", score: 88, grade: "B+", trend: "up", color: "#8b5cf6" },
    { subject: "Physical Education", score: 94, grade: "A", trend: "up", color: "#06b6d4" },
    { subject: "Art", score: 96, grade: "A", trend: "up", color: "#ec4899" }
  ];

  // Progress chart data
  const progressData = [
    { month: "Aug", childGPA: 3.2, classAvg: 3.1, gradeAvg: 3.0 },
    { month: "Sep", childGPA: 3.4, classAvg: 3.2, gradeAvg: 3.1 },
    { month: "Oct", childGPA: 3.6, classAvg: 3.3, gradeAvg: 3.2 },
    { month: "Nov", childGPA: 3.7, classAvg: 3.4, gradeAvg: 3.3 },
    { month: "Dec", childGPA: 3.8, classAvg: 3.5, gradeAvg: 3.4 },
    { month: "Jan", childGPA: 3.8, classAvg: 3.5, gradeAvg: 3.4 }
  ];

  // Attendance data
  const attendanceData = [
    { subject: "Math", present: 18, absent: 2 },
    { subject: "Science", present: 19, absent: 1 },
    { subject: "English", present: 16, absent: 4 },
    { subject: "History", present: 17, absent: 3 },
    { subject: "PE", present: 20, absent: 0 },
    { subject: "Art", present: 19, absent: 1 }
  ];

  // Dropdown risk gauge calculation
  const getRiskGaugeColor = (risk: number) => {
    if (risk <= 30) return { color: "#10b981", label: "Low Risk" };
    if (risk <= 60) return { color: "#f59e0b", label: "Medium Risk" };
    return { color: "#ef4444", label: "High Risk" };
  };

  const riskGauge = getRiskGaugeColor(childData.dropoutRisk);

  const guidanceNotes = [
    {
      type: "strength",
      icon: CheckCircle,
      title: "Strong Performance",
      message: "Emma excels in Science and Art, showing consistent improvement and creativity.",
      color: "text-green-600 bg-green-50 border-green-200"
    },
    {
      type: "attention",
      icon: AlertTriangle,
      title: "Needs Attention",
      message: "English scores have dropped. Consider additional reading practice and writing support.",
      color: "text-yellow-600 bg-yellow-50 border-yellow-200"
    },
    {
      type: "recommendation",
      icon: Info,
      title: "Recommendation",
      message: "Encourage participation in the school's peer tutoring program for English improvement.",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {userRole === "parent" ? "Child's Performance Report" : "Overall Report"}
          </h2>
          <p className="text-slate-600">
            {userRole === "parent" 
              ? `Comprehensive overview of ${childData.name}'s academic progress`
              : "Comprehensive performance analytics and trends"
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Select value={compareWith} onValueChange={setCompareWith}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class-average">Class Average</SelectItem>
              <SelectItem value="grade-average">Grade Average</SelectItem>
              <SelectItem value="previous-year">Previous Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Student Info Card */}
      {userRole === "parent" && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{childData.name}</h3>
                  <p className="text-slate-600">{childData.grade} • Section {childData.section} • Roll No: {childData.rollNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{childData.overallGPA}</div>
                <p className="text-sm text-slate-600">Overall GPA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{childData.overallGPA}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.4 from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Class Rank</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">8th</div>
            <p className="text-xs text-green-600">out of 45 students</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">92%</div>
            <p className="text-xs text-purple-600">Above average</p>
          </CardContent>
        </Card>

        <Card className={`border-2 shadow-md ${
          childData.dropoutRisk <= 30 ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' :
          childData.dropoutRisk <= 60 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' :
          'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              childData.dropoutRisk <= 30 ? 'text-green-800' :
              childData.dropoutRisk <= 60 ? 'text-yellow-800' : 'text-red-800'
            }`}>
              Dropout Risk
            </CardTitle>
            <AlertTriangle className={`h-4 w-4 ${
              childData.dropoutRisk <= 30 ? 'text-green-600' :
              childData.dropoutRisk <= 60 ? 'text-yellow-600' : 'text-red-600'
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              childData.dropoutRisk <= 30 ? 'text-green-900' :
              childData.dropoutRisk <= 60 ? 'text-yellow-900' : 'text-red-900'
            }`}>
              {riskGauge.label}
            </div>
            <div className="mt-2">
              <Progress 
                value={childData.dropoutRisk} 
                className="h-2"
                style={{ '--progress-background': riskGauge.color } as any}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Tiles */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span>Subject Performance</span>
          </CardTitle>
          <CardDescription>Individual subject scores and progress indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectTiles.map((subject) => (
              <div 
                key={subject.subject}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{subject.subject}</h4>
                  {subject.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{subject.score}%</div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs mt-1"
                      style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                    >
                      Grade {subject.grade}
                    </Badge>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${subject.color}20` }}
                  >
                    <Target className="h-6 w-6" style={{ color: subject.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Progress Comparison</span>
            </CardTitle>
            <CardDescription>Performance vs class and grade averages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[2.5, 4.5]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="childGPA" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Your Child"
                />
                <Line 
                  type="monotone" 
                  dataKey="classAvg" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Class Average"
                />
                <Line 
                  type="monotone" 
                  dataKey="gradeAvg" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  name="Grade Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Breakdown */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span>Attendance Breakdown</span>
            </CardTitle>
            <CardDescription>Subject-wise attendance this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#10b981" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Guidance Notes */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Personalized Guidance</span>
          </CardTitle>
          <CardDescription>AI-powered insights and recommendations for your child</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {guidanceNotes.map((note, index) => {
            const Icon = note.icon;
            return (
              <Alert key={index} className={`border ${note.color}`}>
                <Icon className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm">{note.message}</p>
                  </div>
                </AlertDescription>
              </Alert>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}