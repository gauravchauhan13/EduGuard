import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { 
  CalendarDays, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  BookOpen, 
  Target,
  Lightbulb,
  TrendingDown
} from "lucide-react";

interface AcademicReportProps {
  userRole: string;
}

export function AcademicReport({ userRole }: AcademicReportProps) {
  // Mock data for student performance
  const studentData = {
    name: "Alex Johnson",
    grade: "10th Grade",
    overallGPA: 3.7,
    dropoutRisk: "Low",
    riskScore: 15
  };

  const subjectScores = [
    { subject: "Mathematics", score: 85, trend: "up", color: "bg-slate-600" },
    { subject: "Science", score: 92, trend: "up", color: "bg-slate-700" },
    { subject: "English", score: 78, trend: "down", color: "bg-slate-500" },
    { subject: "History", score: 88, trend: "up", color: "bg-slate-800" },
    { subject: "Art", score: 94, trend: "up", color: "bg-slate-900" }
  ];

  const trendData = [
    { month: "Sep", gpa: 3.2 },
    { month: "Oct", gpa: 3.4 },
    { month: "Nov", gpa: 3.6 },
    { month: "Dec", gpa: 3.7 },
    { month: "Jan", gpa: 3.7 }
  ];

  const attendanceData = [
    { subject: "Math", attended: 18, total: 20 },
    { subject: "Science", attended: 19, total: 20 },
    { subject: "English", attended: 16, total: 20 },
    { subject: "History", attended: 17, total: 20 },
    { subject: "Art", attended: 20, total: 20 }
  ];

  const improvementTips = [
    {
      subject: "English",
      tip: "Consider joining the reading club to improve comprehension skills",
      icon: BookOpen
    },
    {
      subject: "Mathematics",
      tip: "Practice daily problem sets for 30 minutes to strengthen fundamentals",
      icon: Target
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Student Dashboard</h2>
          <p className="text-slate-600 mt-1">Academic performance overview for {studentData.name}</p>
        </div>
        <Badge className="bg-slate-900 text-white px-3 py-1 font-medium">
          {studentData.grade}
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Overall GPA</CardTitle>
            <Award className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{studentData.overallGPA}</div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Attendance Rate</CardTitle>
            <CalendarDays className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">90%</div>
            <p className="text-xs text-slate-600">90/100 classes attended</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Class Rank</CardTitle>
            <Target className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">7th</div>
            <p className="text-xs text-slate-600">out of 120 students</p>
          </CardContent>
        </Card>

        <Card className={`border-2 shadow-sm ${getRiskColor(studentData.dropoutRisk)}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dropout Risk</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{studentData.dropoutRisk}</div>
            <p className="text-xs">Risk score: {studentData.riskScore}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Scores */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-slate-600" />
              <span>Subject Performance</span>
            </CardTitle>
            <CardDescription>Current scores and trends across all subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {subjectScores.map((subject) => (
              <div key={subject.subject} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                  <span className="font-medium text-slate-900">{subject.subject}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-semibold text-slate-900">{subject.score}%</span>
                  {subject.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-slate-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* GPA Trend Chart */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-slate-600" />
              <span>GPA Trend</span>
            </CardTitle>
            <CardDescription>Academic performance over the last 5 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis domain={[2.5, 4.5]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="gpa" 
                  stroke="#64748b" 
                  strokeWidth={2}
                  dot={{ fill: "#64748b", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Dropout Risk Assessment */}
      {studentData.dropoutRisk !== "Low" && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Attention Required:</strong> Your academic performance indicates some areas that need improvement.
            Consider meeting with your academic advisor to discuss support options.
          </AlertDescription>
        </Alert>
      )}

      {/* Improvement Tips */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-slate-600" />
            <span>Personalized Improvement Tips</span>
          </CardTitle>
          <CardDescription>AI-powered suggestions to boost your academic performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {improvementTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <Icon className="h-5 w-5 text-slate-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{tip.subject}</h4>
                  <p className="text-sm text-slate-600 mt-1">{tip.tip}</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-50">
                  Learn More
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Attendance Overview */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-slate-600" />
            <span>Attendance Overview</span>
          </CardTitle>
          <CardDescription>Subject-wise attendance for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip formatter={(value, name) => [value, name === "attended" ? "Attended" : "Total"]} />
              <Bar dataKey="total" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="attended" fill="#64748b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}