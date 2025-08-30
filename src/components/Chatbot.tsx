import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MessageCircle, 
  X, 
  Send, 
  HelpCircle, 
  Book, 
  Target, 
  Lightbulb,
  GraduationCap,
  Clock,
  Users,
  TrendingUp,
  Zap
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'tip' | 'guidance';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm your EduGuard Academic Assistant. I'm here to help you with study tips, answer questions about your performance, and provide educational guidance. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'guidance'
    }
  ]);
  const [inputText, setInputText] = useState("");

  const quickActions = [
    { label: "Study Tips", icon: Book, action: "study-tips", color: "bg-blue-500" },
    { label: "Attendance Help", icon: Target, action: "attendance", color: "bg-green-500" },
    { label: "Grade Improvement", icon: TrendingUp, action: "grades", color: "bg-purple-500" },
    { label: "Time Management", icon: Clock, action: "time-management", color: "bg-orange-500" }
  ];

  const learningTips = [
    {
      category: "Study Techniques",
      icon: Book,
      tips: [
        "Use the Pomodoro Technique: 25 minutes of focused study, 5-minute break",
        "Practice active recall by testing yourself without looking at notes",
        "Create mind maps to visualize connections between concepts",
        "Teach someone else to reinforce your understanding"
      ]
    },
    {
      category: "Time Management",
      icon: Clock,
      tips: [
        "Use a planner to track assignments and deadlines",
        "Break large projects into smaller, manageable tasks",
        "Set specific study goals for each session",
        "Eliminate distractions during study time"
      ]
    },
    {
      category: "Test Preparation",
      icon: Target,
      tips: [
        "Start reviewing material at least a week before the test",
        "Practice with past papers or sample questions",
        "Form study groups with classmates",
        "Get enough sleep before important exams"
      ]
    }
  ];

  const faqs = [
    {
      question: "How is my GPA calculated?",
      answer: "Your GPA is calculated by averaging all your course grades on a 4.0 scale. A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Credit hours are weighted in the calculation.",
      category: "Academic"
    },
    {
      question: "What attendance rate should I maintain?",
      answer: "You should maintain at least 85% attendance rate. Below 75% may result in academic probation and can affect your understanding of course material.",
      category: "Attendance"
    },
    {
      question: "How can I improve my study habits?",
      answer: "Focus on consistency, create a dedicated study space, use active learning techniques, take regular breaks, and don't hesitate to ask for help when needed.",
      category: "Study Skills"
    },
    {
      question: "What should I do if I'm struggling in a subject?",
      answer: "Speak with your teacher immediately, consider tutoring, form study groups, review your study methods, and use additional resources like online materials or textbooks.",
      category: "Academic Support"
    },
    {
      question: "How can I manage stress during exams?",
      answer: "Maintain a regular sleep schedule, exercise regularly, practice relaxation techniques, stay organized with a study plan, and remember to take breaks.",
      category: "Wellness"
    }
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText("");
  };

  const generateBotResponse = (input: string): { text: string; type: 'text' | 'tip' | 'guidance' } => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('gpa') || lowerInput.includes('grade')) {
      return {
        text: "🎯 Your current GPA is 3.8, which is excellent! To maintain this level: (1) Stay consistent with assignments, (2) Participate actively in class, (3) Review material regularly. Would you like specific strategies for any particular subject?",
        type: 'guidance'
      };
    }
    
    if (lowerInput.includes('attendance')) {
      return {
        text: "📅 Your current attendance rate is 90%, which is very good! To maintain perfect attendance: Set multiple alarms, prepare everything the night before, and track your attendance weekly. Remember, every class matters for your understanding!",
        type: 'guidance'
      };
    }
    
    if (lowerInput.includes('study') || lowerInput.includes('tip')) {
      return {
        text: "📚 Here are evidence-based study techniques: (1) Spaced repetition for long-term retention, (2) Active recall instead of passive reading, (3) Interleaving different subjects, (4) The Feynman Technique for complex concepts. Which subject needs the most attention?",
        type: 'tip'
      };
    }
    
    if (lowerInput.includes('stress') || lowerInput.includes('anxious')) {
      return {
        text: "🧘 It's normal to feel stressed about academics. Try these techniques: (1) Deep breathing exercises, (2) Break tasks into smaller steps, (3) Regular exercise, (4) Talk to someone you trust. Your mental health is just as important as your grades!",
        type: 'guidance'
      };
    }

    if (lowerInput.includes('time') || lowerInput.includes('manage')) {
      return {
        text: "⏰ Time management is crucial for academic success! Try: (1) Use a digital or physical planner, (2) Set SMART goals, (3) Use time-blocking techniques, (4) Prioritize tasks using the Eisenhower Matrix. Start with just one technique!",
        type: 'tip'
      };
    }
    
    if (lowerInput.includes('help') || lowerInput.includes('support')) {
      return {
        text: "🤝 I'm here to support your academic journey! I can help with study strategies, performance analysis, time management, stress reduction, and connecting you with school resources. What specific challenge are you facing?",
        type: 'guidance'
      };
    }
    
    return {
      text: "💡 That's a great question! I'd love to help you with that. Could you provide a bit more detail so I can give you the most relevant advice? I'm knowledgeable about academics, study techniques, time management, and student wellness.",
      type: 'text'
    };
  };

  const handleQuickAction = (action: string) => {
    let response: { text: string; type: 'tip' | 'guidance' } = { text: "", type: 'tip' };
    
    switch (action) {
      case "study-tips":
        response = {
          text: "🎯 **Proven Study Techniques**: (1) **Pomodoro Technique** - 25min focus + 5min break, (2) **Active Recall** - test yourself without notes, (3) **Spaced Repetition** - review at increasing intervals, (4) **Feynman Technique** - explain concepts simply. Which technique interests you most?",
          type: 'tip'
        };
        break;
      case "attendance":
        response = {
          text: "📊 **Attendance Optimization**: Your 90% rate is good, but here's how to reach 95%+: (1) Set 3 alarms 15min apart, (2) Prepare materials the night before, (3) Find an accountability partner, (4) Track weekly progress. Missing just 1 more day drops you below 85%!",
          type: "guidance"
        };
        break;
      case "grades":
        response = {
          text: "📈 **Grade Improvement Strategy**: (1) **Analyze** past performance patterns, (2) **Prioritize** subjects with the most room for improvement, (3) **Schedule** regular review sessions, (4) **Seek** teacher feedback, (5) **Join** study groups. Your Math score has the highest improvement potential!",
          type: "guidance"
        };
        break;
      case "time-management":
        response = {
          text: "⏱️ **Time Management Mastery**: (1) **Time Audit** - track how you spend time for a week, (2) **Priority Matrix** - urgent vs important tasks, (3) **Time Blocking** - dedicate specific hours to subjects, (4) **Buffer Time** - add 25% extra time for tasks. Start with time blocking!",
          type: 'tip'
        };
        break;
    }

    const botMessage: Message = {
      id: messages.length + 1,
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      type: response.type
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleFAQClick = (faq: typeof faqs[0]) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: faq.question,
      sender: 'user',
      timestamp: new Date()
    };
    const botMessage: Message = {
      id: messages.length + 2,
      text: `💡 **${faq.category}**: ${faq.answer}`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'guidance'
    };
    setMessages(prev => [...prev, userMessage, botMessage]);
    setActiveTab("chat");
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-slate-900 hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
        <div className="absolute -top-1 -right-1 bg-slate-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          <Zap className="h-3 w-3" />
        </div>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[36rem] shadow-xl z-50 flex flex-col border border-gray-200 bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-slate-900 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-5 w-5" />
          <div>
            <CardTitle className="text-lg">EduGuard Assistant</CardTitle>
            <CardDescription className="text-slate-300">Your academic companion</CardDescription>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-2">
            <TabsTrigger value="chat" className="text-xs">Chat</TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">Tips</TabsTrigger>
            <TabsTrigger value="faqs" className="text-xs">FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col px-4 pb-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.action)}
                    className="text-xs h-auto py-2 flex flex-col items-center space-y-1 hover:bg-gray-50 transition-colors border-gray-200"
                  >
                    <div className="p-2 rounded-full bg-slate-900 text-white">
                      <Icon className="h-3 w-3" />
                    </div>
                    <span>{action.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-sm ${
                        message.sender === 'user'
                          ? 'bg-slate-900 text-white'
                          : message.type === 'tip'
                          ? 'bg-gray-50 border border-gray-200'
                          : message.type === 'guidance'
                          ? 'bg-gray-50 border border-gray-200'
                          : 'bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {message.text}
                      {message.type === 'tip' && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          Study Tip
                        </Badge>
                      )}
                      {message.type === 'guidance' && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Guidance
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex space-x-2 mt-4">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about grades, study tips, time management..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                size="sm" 
                onClick={handleSendMessage} 
                disabled={!inputText.trim()}
                className="bg-slate-900 hover:bg-slate-800"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="flex-1 px-4 pb-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {learningTips.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Card key={index} className="border border-slate-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center space-x-2 text-sm">
                          <Icon className="h-4 w-4 text-slate-600" />
                          <span>{category.category}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start space-x-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5 flex-shrink-0" />
                            <span className="text-slate-700">{tip}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="faqs" className="flex-1 px-4 pb-4">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 flex flex-col items-start space-y-1 hover:shadow-md transition-shadow"
                    onClick={() => handleFAQClick(faq)}
                  >
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">{faq.category}</Badge>
                      <HelpCircle className="h-3 w-3 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{faq.question}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}