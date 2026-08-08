import { skills, getSkill, hasSkill, searchSkills } from "./loader"

export const skillRegistry = {
  all: skills,
  get: getSkill,
  has: hasSkill,
  search: searchSkills,
}

export type { Skill } from "./loader"
