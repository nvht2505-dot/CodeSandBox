export interface Repository {
  owner: string;
  repo: string;
  branch: string;
}

let repository: Repository = {
  owner: "",
  repo: "",
  branch: "main"
};

export function connectRepository(repo: Repository) {
  repository = repo;
}

export function getRepository() {
  return repository;
}
