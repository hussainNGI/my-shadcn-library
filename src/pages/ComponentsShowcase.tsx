import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Label from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconGitBranch } from "@tabler/icons-react"

export default function ComponentsShowcase() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Components Showcase</h1>

      {/* Buttons */}
      <section>
        <h2 className="text-lg font-medium mb-2">Buttons</h2>
        <div className="flex gap-3 flex-wrap">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button>
            <IconGitBranch /> With Icon
          </Button>
        </div>
      </section>

      {/* Input */}
      <section>
        <h2 className="text-lg font-medium mb-2">Input</h2>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
      </section>

      {/* Select */}
      <section>
        <h2 className="text-lg font-medium mb-2">Select</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="violet">Violet</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Tabs */}
      <section>
        <h2 className="text-lg font-medium mb-2">Tabs</h2>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings go here.</TabsContent>
          <TabsContent value="password">Change password section.</TabsContent>
        </Tabs>
      </section>

      {/* Table */}
      <section>
        <h2 className="text-lg font-medium mb-2">Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jane Doe</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>John Smith</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Inactive</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
