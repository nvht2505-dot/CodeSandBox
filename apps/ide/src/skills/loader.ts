export interface Skill {
  id: string
  name: string
  description: string
  content: string
  path: string
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!match) return { metadata: {}, body: content }

  const metadata: Record<string, string> = {}

  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":")
    if (index === -1) continue

    const key = line.slice(0, index).trim()
    const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "")

    metadata[key] = value
  }

  return {
    metadata,
    body: content.slice(match[0].length),
  }
}

const files = import.meta.glob("./*/SKILL.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>

export const skills: Skill[] = Object.entries(files).map(([path, content]) => {
  const directory = path.split("/")[1]
  const parsed = parseFrontmatter(content)

  return {
    id: directory,
    name: parsed.metadata.name || directory,
    description: parsed.metadata.description || "",
    content: parsed.body.trim(),
    path,
  }
})

console.log("[SKILLS LOADED]", skills.length, skills.map((s) => s.id))

export function getSkill(id: string) {
  return skills.find((skill) => skill.id === id)
}

export function hasSkill(id: string) {
  return skills.some((skill) => skill.id === id)
}

export function searchSkills(query: string) {
  const q = query.toLowerCase().trim()

  if (!q) return skills

  return skills.filter((skill) =>
    `${skill.id} ${skill.name} ${skill.description} ${skill.content}`
      .toLowerCase()
      .includes(q),
  )
}
