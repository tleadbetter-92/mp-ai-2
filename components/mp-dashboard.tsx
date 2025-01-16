import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Question = {
  id: number;
  text: string;
  response: string;
  status: 'pending' | 'approved' | 'rejected';
};

const MPDashboard = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What are your views on climate change?",
      response: "Climate change is a critical issue that requires immediate action...",
      status: 'pending'
    },
    {
      id: 2,
      text: "How will you improve local schools?",
      response: "Education is one of my top priorities...",
      status: 'pending'
    }
  ]);

  const handleApprove = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, status: 'approved' } : q
    ));
  };

  const handleReject = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, status: 'rejected' } : q
    ));
  };

  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            {questions
              .filter(q => q.status === status)
              .map((question) => (
                <Card key={question.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {question.text}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{question.response}</p>
                    {status === 'pending' && (
                      <div className="flex gap-2">
                        <Button onClick={() => handleApprove(question.id)}>
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleReject(question.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {status !== 'pending' && (
                      <Badge variant={status === 'approved' ? 'default' : 'destructive'}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MPDashboard;

