import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  Education,
  Experience,
  PortfolioType,
  Project,
  Skill,
  SocialLinks,
} from "@/types/portfolio";

export type DraftExperience = Partial<Experience> & { id: string };
export type DraftEducation = Partial<Education> & { id: string };
export type DraftSkill = Partial<Skill> & { id: string };
export type DraftProject = Partial<Project> & { id: string };

export type PortfolioDraft = {
  id?: string;
  portfolioType?: PortfolioType;
  name?: string;
  profession?: string;
  description?: string;
  profileImage?: string;
  resumeUrl?: string;
  socialLinks: Partial<SocialLinks>;
  experiences: DraftExperience[];
  education: DraftEducation[];
  skills: DraftSkill[];
  projects: DraftProject[];
};

export const emptyDraft = (): PortfolioDraft => ({
  socialLinks: {},
  experiences: [],
  education: [],
  skills: [],
  projects: [],
});

function upsertById<T extends { id: string }>(list: T[], item: T): T[] {
  const index = list.findIndex((entry) => entry.id === item.id);
  if (index === -1) return [...list, item];
  return list.map((entry, i) => (i === index ? { ...entry, ...item } : entry));
}

function isDraftEmpty(draft: PortfolioDraft) {
  return (
    !draft.id &&
    !draft.portfolioType &&
    !draft.name &&
    !draft.profession &&
    !draft.description &&
    !draft.profileImage &&
    !draft.resumeUrl &&
    Object.values(draft.socialLinks).every((value) => !value) &&
    draft.experiences.length === 0 &&
    draft.education.length === 0 &&
    draft.skills.length === 0 &&
    draft.projects.length === 0
  );
}

type PortfolioStore = {
  draft: PortfolioDraft;
  updatedAt: number | null;
  setDraft: (draft: PortfolioDraft) => void;
  patchDraft: (
    patch: Partial<Omit<PortfolioDraft, "socialLinks">> & {
      socialLinks?: Partial<SocialLinks>;
    },
  ) => void;
  patchSocialLinks: (patch: Partial<SocialLinks>) => void;
  setExperiences: (experiences: DraftExperience[]) => void;
  upsertExperience: (experience: DraftExperience) => void;
  removeExperience: (id: string) => void;
  setEducation: (education: DraftEducation[]) => void;
  upsertEducation: (education: DraftEducation) => void;
  removeEducation: (id: string) => void;
  setSkills: (skills: DraftSkill[]) => void;
  upsertSkill: (skill: DraftSkill) => void;
  removeSkill: (id: string) => void;
  setProjects: (projects: DraftProject[]) => void;
  upsertProject: (project: DraftProject) => void;
  removeProject: (id: string) => void;
  clearDraft: () => void;
  hasDraft: () => boolean;
};

function touch(
  draft: PortfolioDraft,
): Pick<PortfolioStore, "draft" | "updatedAt"> {
  return { draft, updatedAt: Date.now() };
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      draft: emptyDraft(),
      updatedAt: null,

      setDraft: (draft) => set(touch({ ...emptyDraft(), ...draft })),

      patchDraft: (patch) =>
        set((state) =>
          touch({
            ...state.draft,
            ...patch,
            socialLinks: patch.socialLinks
              ? { ...state.draft.socialLinks, ...patch.socialLinks }
              : state.draft.socialLinks,
          }),
        ),

      patchSocialLinks: (patch) =>
        set((state) =>
          touch({
            ...state.draft,
            socialLinks: { ...state.draft.socialLinks, ...patch },
          }),
        ),

      setExperiences: (experiences) =>
        set((state) => touch({ ...state.draft, experiences })),

      upsertExperience: (experience) =>
        set((state) =>
          touch({
            ...state.draft,
            experiences: upsertById(state.draft.experiences, experience),
          }),
        ),

      removeExperience: (id) =>
        set((state) =>
          touch({
            ...state.draft,
            experiences: state.draft.experiences.filter(
              (item) => item.id !== id,
            ),
          }),
        ),

      setEducation: (education) =>
        set((state) => touch({ ...state.draft, education })),

      upsertEducation: (education) =>
        set((state) =>
          touch({
            ...state.draft,
            education: upsertById(state.draft.education, education),
          }),
        ),

      removeEducation: (id) =>
        set((state) =>
          touch({
            ...state.draft,
            education: state.draft.education.filter((item) => item.id !== id),
          }),
        ),

      setSkills: (skills) => set((state) => touch({ ...state.draft, skills })),

      upsertSkill: (skill) =>
        set((state) =>
          touch({
            ...state.draft,
            skills: upsertById(state.draft.skills, skill),
          }),
        ),

      removeSkill: (id) =>
        set((state) =>
          touch({
            ...state.draft,
            skills: state.draft.skills.filter((item) => item.id !== id),
          }),
        ),

      setProjects: (projects) =>
        set((state) => touch({ ...state.draft, projects })),

      upsertProject: (project) =>
        set((state) =>
          touch({
            ...state.draft,
            projects: upsertById(state.draft.projects, project),
          }),
        ),

      removeProject: (id) =>
        set((state) =>
          touch({
            ...state.draft,
            projects: state.draft.projects.filter((item) => item.id !== id),
          }),
        ),

      clearDraft: () => set({ draft: emptyDraft(), updatedAt: null }),

      hasDraft: () => !isDraftEmpty(get().draft),
    }),
    {
      name: "folio-os-portfolio-draft",
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
          : localStorage,
      ),
      partialize: (state) => ({
        draft: state.draft,
        updatedAt: state.updatedAt,
      }),
    },
  ),
);
