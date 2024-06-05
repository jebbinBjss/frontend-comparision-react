export const SKILL_LEVEL_STRINGS = {
  Interested: "Interested",
  Learning: "Learning",
  Proficient: "Proficient",
  Practitioner: "Practitioner",
  Jedi: "Jedi",
} as const;

export type SkillLevel = keyof typeof SKILL_LEVEL_STRINGS;

export type Skill = {
  id: string;
  name: string;
};

export type Employee = {
  id: string;
  fullName: string;
  conversationalName: string;
  skills: Array<EmployeeSkill>;
};

export type EmployeeSkill = {
  id: string;
  skill: Skill;
  skillLevel: SkillLevel;
};

export type Project = {
  id: string;
  name: string;
  clientCompany: string;
  targetSkills: Array<ProjectSkill>;
};

export type ProjectSkill = {
  id: string;
  skill: Skill;
  acceptedSkillLevels: Array<SkillLevel>;
  required: boolean;
};
