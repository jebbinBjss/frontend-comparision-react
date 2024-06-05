import { http, HttpResponse } from "msw";
import { SKILL_LEVEL_STRINGS } from "../types/types";
import { mockEmployees, mockProjects } from "./mockData";

const skillLevelHandlers = [
  http.get("http://localhost:5173/skillLevels", () => {
    return HttpResponse.json(SKILL_LEVEL_STRINGS);
  }),
];

const employeeHandlers = [
  http.get("http://localhost:5173/employees", () => {
    return HttpResponse.json({ employees: mockEmployees });
  }),
  http.get("http://localhost/employee/:id", ({ params }) => {
    const selected = mockEmployees.find(
      (employee) => employee.id === params.id
    );
    if (selected != null) {
      return HttpResponse.json({ employees: mockEmployees });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

const projectHandlers = [
  http.get("http://localhost/projects", () => {
    return HttpResponse.json({ projects: mockProjects });
  }),
  http.get("http://localhost/project/:id", ({ params }) => {
    const selected = mockProjects.find((project) => project.id === params.id);
    if (selected != null) {
      return HttpResponse.json({ projects: mockProjects });
    }
    return new HttpResponse(null, { status: 404 });
  }),
  // TODO search projects
];

export const handlers = [
  ...skillLevelHandlers,
  ...employeeHandlers,
  ...projectHandlers,
];
