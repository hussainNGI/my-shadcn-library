import type { Task } from "./types";

const titles = [
  "Design landing page",
  "Setup CI/CD pipeline",
  "API integration",
  "Write unit tests",
  "Update documentation",
  "Marketing email draft",
  "UI review meeting",
  "Client feedback session",
  "Optimize database",
  "Prepare presentation",
  "Create wireframes",
  "Fix login bug",
  "Implement search feature",
  "Dashboard redesign",
  "Email template QA",
  "Add password reset",
  "Migrate to new API",
  "Write blog post",
  "Set up analytics",
  "Product demo prep",
];

const departments = ["Design", "Engineering", "Marketing", "Finance"];
const categories = ["Feature", "Bug", "Improvement", "Research"];
const statuses = ["Todo", "In Progress", "Done"];
const priorities = ["High", "Medium", "Low"];
const assignees = ["Hussain", "Sara", "Ali", "Zain", "Fatima", "John", "Bilal", "Emma", "Sarah"];
const baseDate = new Date("2025-10-10");

// Generate 40 tasks dynamically
export const mockData: Task[] = Array.from({ length: 40 }, (_, i) => {
  const randomTitle = titles[i % titles.length];
  const randomDepartment = departments[i % departments.length];
  const randomCategory = categories[i % categories.length];
  const randomStatus = statuses[i % statuses.length];
  const randomPriority = priorities[i % priorities.length];
  const randomAssignee = assignees[i % assignees.length];

  const dueDate = new Date(baseDate);
  dueDate.setDate(baseDate.getDate() + i * 2);

  return {
    id: (i + 1).toString(),
    title: `${randomTitle} #${i + 1}`,
    department: randomDepartment,
    category: randomCategory,
    status: randomStatus,
    priority: randomPriority,
    assignee: randomAssignee,
    dueDate: dueDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
});
