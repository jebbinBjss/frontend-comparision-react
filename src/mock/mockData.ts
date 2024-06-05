import { faker } from "@faker-js/faker";
import {
  Employee,
  Project,
  SKILL_LEVEL_STRINGS,
  Skill,
  SkillLevel,
} from "../types/types";

const dbSkills: Array<Skill> = [
  { id: faker.string.uuid(), name: "SQL Server" },
  { id: faker.string.uuid(), name: "Postgres" },
  { id: faker.string.uuid(), name: "MySQL" },
];

export const programmingLanguageSkills: Array<Skill> = [
  { id: faker.string.uuid(), name: "C#" },
  { id: faker.string.uuid(), name: "Typescript" },
  { id: faker.string.uuid(), name: "Java" },
];

export const cloudProviderSkills: Array<Skill> = [
  { id: faker.string.uuid(), name: "AWS" },
  { id: faker.string.uuid(), name: "Azure" },
  { id: faker.string.uuid(), name: "GCP" },
];

export const mockSkills: Array<Skill> = [
  ...dbSkills,
  ...programmingLanguageSkills,
  ...cloudProviderSkills,
];

function pickSkillLevels(): Array<SkillLevel> {
  const levelCount = Object.values(SKILL_LEVEL_STRINGS).length;
  const startIndex = faker.helpers.rangeToNumber({
    min: 0,
    max: levelCount - 1,
  });
  return Object.values(SKILL_LEVEL_STRINGS).slice(startIndex);
}

function createMockProject(): Project {
  return {
    id: faker.string.uuid(),
    name: `${faker.commerce.productName()} ${faker.helpers.arrayElement([
      "app",
      "website",
    ])}`,
    clientCompany: faker.company.name(),
    targetSkills: [
      faker.helpers.arrayElement(dbSkills),
      faker.helpers.arrayElement(programmingLanguageSkills),
      faker.helpers.arrayElement(cloudProviderSkills),
    ].map((skill) => {
      return {
        id: faker.string.uuid(),
        skill: skill,
        required: faker.datatype.boolean(),
        acceptedSkillLevels: pickSkillLevels(),
      };
    }),
  };
}

export const mockProjects: Array<Project> = faker.helpers.multiple(
  createMockProject,
  { count: 10 }
);

function createMockEmployee(): Employee {
  const firstName = faker.person.firstName();
  const middleName = faker.datatype.boolean()
    ? ` ${faker.person.middleName()}`
    : "";
  const lastName = faker.person.lastName();
  const fullName = `${firstName}${middleName} ${lastName}`;
  return {
    id: faker.string.uuid(),
    fullName,
    conversationalName: firstName,
    skills: faker.helpers
      .arrayElements(mockSkills, { min: 3, max: 8 })
      .map((skill) => {
        return {
          id: faker.string.uuid(),
          skill,
          skillLevel: faker.helpers.arrayElement(
            Object.values(SKILL_LEVEL_STRINGS)
          ),
        };
      }),
  };
}

export const mockEmployees: Array<Employee> = faker.helpers.multiple(
  createMockEmployee,
  { count: 30 }
);
