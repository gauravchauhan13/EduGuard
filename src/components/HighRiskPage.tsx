import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Calendar, 
  Flag,
  UserPlus,
  Users,
  TrendingDown,
  FileText,
  Clock,
  MapPin,
  MoreVertical
} from "lucide-react";

interface HighRiskPageProps {
  userRole: string;
}

export function HighRiskPage({ userRole }: HighRiskPageProps) {
  const [classFilter, setClassFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for high-risk students
  const highRiskStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      grade: "10th",
      class: "A",
      riskLevel: "critical",
      riskScore: 85,
      gpa: 2.1,
      attendance: 65,
      issues: ["Low attendance", "GPA drop", "Missing assignments"],
      reasons: ["Attendance below 70%", "GPA dropped 0.8 points", "5 missing assignments"],
      lastContact: "2024-01-15",
      parentEmail: "parent1@email.com",
      parentPhone: "(555) 123-4567",
      mentor: null,
      flagged: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      grade: "11th",
      class: "B",
      riskLevel: "high",
      riskScore: 72,
      gpa: 2.8,
      attendance: 72,
      issues: ["GPA drop", "Behavioral concerns"],
      reasons: ["GPA dropped 0.5 points", "3 behavioral incidents"],
      lastContact: "2024-01-20",
      parentEmail: "parent2@email.com",
      parentPhone: "(555) 234-5678",
      mentor: "Ms. Rodriguez",
      flagged: false
    },
    {
      id: 3,
      name: "Marcus Williams",
      grade: "9th",
      class: "A",
      riskLevel: "medium",
      riskScore: 58,
      gpa: 3.0,
      attendance: 78,
      issues: ["Inconsistent performance"],
      reasons: ["Grade volatility in Math", "Social adjustment issues"],
      lastContact: "2024-01-18",
      parentEmail: "parent3@email.com",
      parentPhone: "(555) 345-6789",
      mentor: null,
      flagged: false
    },
    {
      id: 4,
      name: "Emily Davis",
      grade: "12th",
      class: "C",
      riskLevel: "critical",
      riskScore: 92,
      gpa: 1.9,
      attendance: 58,
      issues: ["Low attendance", "GPA drop", "Risk of not graduating"],
      reasons: ["Attendance below 60%", "GPA below 2.0", "Multiple course failures"],
      lastContact: "2024-01-10",
      parentEmail: "parent4@email.com",
      parentPhone: "(555) 456-7890",
      mentor: "Mr. Thompson",
      flagged: true
    },
    {
      id: 5,
      name: "Jordan Brown",
      grade: "10th",
      class: "B",
      riskLevel: "high",
      riskScore: 69,
      gpa: 2.5,
      attendance: 70,
      issues: ["GPA drop", "Learning difficulties"],
      reasons: ["GPA dropped 0.6 points", "Struggles in STEM subjects"],
      lastContact: "2024-01-22",
      parentEmail: "parent5@email.com",
      parentPhone: "(555) 567-8901",
      mentor: null,
      flagged: false
    }
  ];

  // Distribution data for charts
  const riskDistribution = [
    { name: "Low Risk", value: 85, color: "#10b981" },
    { name: "Medium Risk", value: 25, color: "#f59e0b" },
    { name: "High Risk", value: 8, color: "#ef4444" },
    { name: "Critical Risk", value: 2, color: "#dc2626" }
  ];

  const gradeDistribution = [
    { grade: "9th", critical: 1, high: 2, medium: 8 },
    { grade: "10th", critical: 1, high: 3, medium: 10 },
    { grade: "11th", critical: 0, high: 2, medium: 5 },
    { grade: "12th", critical: 0, high: 1, medium: 2 }
  ];

  const issueBreakdown = [
    { issue: "Low Attendance", count: 12 },
    { issue: "GPA Drop", count: 8 },
    { issue: "Missing Assignments", count: 6 },
    { issue: "Behavioral Issues", count: 4 },
    { issue: "Learning Difficulties", count: 3 }
  ];

  // Filter students
  const filteredStudents = highRiskStudents.filter(student => {
    const matchesClass = classFilter === "all" || student.class === classFilter;
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    const matchesRisk = riskFilter === "all" || student.riskLevel === riskFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesGrade && matchesRisk && matchesSearch;
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleQuickAction = (action: string, studentId: number) => {
    console.log(`${action} action for student ${studentId}`);
    // Implementation would go here
  };

  // Only show this page to admin users
  if (userRole !== "admin") {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-96">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Access Restricted</h3>
              <p className="text-muted-foreground">This page is only accessible to administrators.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">High-Risk Student Management</h2>
          <p className="text-slate-600">Monitor, analyze, and support students who need additional attention</p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="A">Class A</SelectItem>
                <SelectItem value="B">Class B</SelectItem>
                <SelectItem value="C">Class C</SelectItem>
              </SelectContent>
            </Select>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
                <SelectItem value="11th">11th Grade</SelectItem>
                <SelectItem value="12th">12th Grade</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setClassFilter("all");
              setGradeFilter("all");
              setRiskFilter("all");
              setSearchTerm("");
            }}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-800">Critical Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-900">2</div>
                <p className="text-xs text-red-600">Immediate intervention needed</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800">High Risk</CardTitle>
                <TrendingDown className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">3</div>
                <p className="text-xs text-orange-600">Close monitoring required</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-800">Medium Risk</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">1</div>
                <p className="text-xs text-yellow-600">Watch for changes</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Total Students</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">120</div>
                <p className="text-xs text-blue-600">5% at risk</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Student distribution by risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
                <CardDescription>Most frequent risk factors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={issueBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="issue" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Student Alert Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.id} className={`border-l-4 ${
                student.riskLevel === "critical" ? "border-l-red-500" :
                student.riskLevel === "high" ? "border-l-orange-500" :
                "border-l-yellow-500"
              } shadow-lg`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {student.name}
                        {student.flagged && <Flag className="h-4 w-4 text-red-500" />}
                        <Badge variant="outline" className={getRiskColor(student.riskLevel)}>
                          {student.riskLevel} Risk ({student.riskScore}%)
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Grade {student.grade} • Class {student.class}
                        {student.mentor && ` • Mentor: ${student.mentor}`}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current GPA</p>
                      <p className={`font-medium ${student.gpa < 2.5 ? 'text-red-600' : 'text-orange-600'}`}>
                        {student.gpa}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                      <p className={`font-medium ${student.attendance < 70 ? 'text-red-600' : 'text-orange-600'}`}>
                        {student.attendance}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Alert Reasons</p>
                    <div className="space-y-1">
                      {student.reasons.map((reason, index) => (
                        <Alert key={index} className="py-2">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-sm">{reason}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Last contact: {student.lastContact}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuickAction("flag", student.id)}
                        className={student.flagged ? "bg-red-50 text-red-600" : ""}
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        {student.flagged ? "Flagged" : "Flag"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuickAction("notify", student.id)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Notify Parent
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuickAction("mentor", student.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        {student.mentor ? "Change" : "Assign"} Mentor
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No students found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Risk by Grade Level</CardTitle>
                <CardDescription>Distribution of risk levels across grades</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="critical" stackId="a" fill="#dc2626" name="Critical" />
                    <Bar dataKey="high" stackId="a" fill="#ef4444" name="High" />
                    <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Issue Frequency</CardTitle>
                <CardDescription>Most common risk factors affecting students</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={issueBreakdown} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="issue" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}