import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Label from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,  } from "@/components/ui/table"
import { Home, Settings } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table"
import DataTableDemo from "@/components/data-table/data-table-demo";

type User = {
  name: string
  email: string
  status: string
}

const data: User[] = [
  { name: "Jane Doe", email: "jane@example.com", status: "Active" },
  { name: "John Smith", email: "john@example.com", status: "Inactive" },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
export default function ComponentsShowcase() {
    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Components Showcase</h1>
      <section>
        <h2 className="text-lg font-medium mb-2">Data Table</h2>
        <DataTableDemo />
      </section>
      {/* Buttons */}
      <section className="flex gap-6">
        <div className="flex flex-col">
            <h2 className="text-lg font-medium mb-2">Buttons</h2>
            <div className="flex gap-3 flex-wrap">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button>
                <Settings /> With Icon
            </Button>
            </div>
        </div>
        <div className="flex flex-col">
            <h2 className="text-lg font-medium mb-2">Different Size Buttons</h2>
            <div className="flex gap-3 flex-wrap">
            <Button size="lg">Large Button</Button>
            <Button size="md">Medium Button</Button>
            </div>
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

       {/* Calendar */}
      <section>
        <h2 className="text-lg font-medium mb-2">Calendar</h2>
        <div className="space-y-2">
          <DatePicker label="Date of Birth" disabled={(date) => date > new Date() || date < new Date("1900-01-01")} />
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
