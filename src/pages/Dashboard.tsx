import React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const colors = ["blue", "green", "rose", "violet", "amber", "emerald", "cyan", "gray"];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4 text-muted-foreground">
            This demo shows how components adapt to different themes and dark/light modes.
          </p>
          <div className="flex gap-3">
            <Button>Primary Action</Button>
            <Button variant="outline">Secondary</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Quick stats and info live here.</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => (
              <div
                key={c}
                className="p-3 rounded-lg border w-28 text-center bg-muted"
              >
                <div
                  className="h-6 rounded mb-2"
                  style={{ background: `hsl(var(--primary))` }}
                ></div>
                <div className="text-sm capitalize">{c}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
