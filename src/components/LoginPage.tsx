import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GraduationCap } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string, password: string, role: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password, role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-sm border">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-slate-900 p-3 rounded-lg">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                EduGuard
              </h1>
              <p className="text-sm text-slate-600">Student Performance Hub</p>
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl text-slate-900">Welcome Back</CardTitle>
            <CardDescription className="text-slate-600">Sign in to access your dashboard</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm text-slate-700">I am a</Label>
              <div className="relative bg-slate-100 rounded-full p-0.5 flex w-fit mx-auto">
                <div 
                  className="absolute top-0.5 left-0.5 bg-slate-900 rounded-full shadow-sm transition-transform duration-300 ease-in-out h-6 flex items-center justify-center z-10"
                  style={{
                    width: 'calc(33.333% - 2px)',
                    transform: role === 'student' ? 'translateX(0%)' : 
                              role === 'parent' ? 'translateX(calc(100% + 2px))' : 
                              'translateX(calc(200% + 4px))'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`relative z-20 px-3 py-1 rounded-full transition-colors duration-300 text-xs font-medium ${
                    role === 'student' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`relative z-20 px-3 py-1 rounded-full transition-colors duration-300 text-xs font-medium ${
                    role === 'parent' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Parent
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`relative z-20 px-3 py-1 rounded-full transition-colors duration-300 text-xs font-medium ${
                    role === 'admin' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}