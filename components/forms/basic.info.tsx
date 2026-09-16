"use client";

import { usePortfolioStore } from "@/stores/portfolio.store";
import { fieldClassName } from "@/components/forms/styles";

export default function BasicInfo() {
  const name = usePortfolioStore((state) => state.draft.name ?? "");
  const profession = usePortfolioStore((state) => state.draft.profession ?? "");
  const description = usePortfolioStore((state) => state.draft.description ?? "");
  const socialLinks = usePortfolioStore((state) => state.draft.socialLinks ?? {});
  const patchDraft = usePortfolioStore((state) => state.patchDraft);
  const patchSocialLinks = usePortfolioStore((state) => state.patchSocialLinks);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium tracking-tight text-black dark:text-white">
          Basic info
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Who you are and how people can find you.
        </p>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-neutral-500">Name</span>
        <input
          value={name}
          onChange={(event) => patchDraft({ name: event.target.value })}
          placeholder="Alex Rivera"
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-neutral-500">Profession</span>
        <input
          value={profession}
          onChange={(event) => patchDraft({ profession: event.target.value })}
          placeholder="Designer & Developer"
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-neutral-500">About</span>
        <textarea
          value={description}
          onChange={(event) => patchDraft({ description: event.target.value })}
          placeholder="A short bio, 10-40 words."
          rows={4}
          className={`${fieldClassName} resize-none`}
        />
      </label>

      <div className="flex flex-col gap-4 border-t border-black/10 pt-4 dark:border-white/10">
        <span className="text-xs tracking-wider text-neutral-400 uppercase">
          Links & profiles
        </span>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-neutral-500">Email</span>
            <input
              value={socialLinks.email ?? ""}
              onChange={(e) => patchSocialLinks({ email: e.target.value })}
              placeholder="alex@example.com"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-neutral-500">Website</span>
            <input
              value={socialLinks.website ?? ""}
              onChange={(e) => patchSocialLinks({ website: e.target.value })}
              placeholder="https://yourwebsite.com"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-neutral-500">GitHub</span>
            <input
              value={socialLinks.github ?? ""}
              onChange={(e) => patchSocialLinks({ github: e.target.value })}
              placeholder="https://github.com/username"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-neutral-500">LinkedIn</span>
            <input
              value={socialLinks.linkedin ?? ""}
              onChange={(e) => patchSocialLinks({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className={fieldClassName}
            />
          </label>
        </div>
      </div>
    </form>
  );
}
