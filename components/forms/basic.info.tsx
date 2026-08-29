"use client";

import { usePortfolioStore } from "@/stores/portfolio.store";
import { portfolioTypes, PortfolioType } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const fieldClassName =
  "border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/30";

export default function BasicInfo() {
  const name = usePortfolioStore((state) => state.draft.name ?? "");
  const profession = usePortfolioStore((state) => state.draft.profession ?? "");
  const description = usePortfolioStore((state) => state.draft.description ?? "");
  const portfolioType = usePortfolioStore((state) => state.draft.portfolioType ?? "interactive");
  const socialLinks = usePortfolioStore((state) => state.draft.socialLinks ?? {});
  const patchDraft = usePortfolioStore((state) => state.patchDraft);
  const patchSocialLinks = usePortfolioStore((state) => state.patchSocialLinks);

  return (
    <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
      {/* Portfolio Style Selection */}
      <div className="flex flex-col gap-1.5 text-sm">
        <span className="text-white/50">Portfolio Style</span>
        <div className="grid grid-cols-3 gap-2">
          {portfolioTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => patchDraft({ portfolioType: type as PortfolioType })}
              className={cn(
                "py-2 px-3 border text-xs capitalize transition-colors outline-none cursor-pointer",
                portfolioType === type
                  ? "bg-white text-black border-white font-medium"
                  : "bg-transparent border-white/20 text-white/60 hover:text-white hover:border-white/40"
              )}
            >
              {type.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-white/50">Name</span>
        <input
          value={name}
          onChange={(event) => patchDraft({ name: event.target.value })}
          placeholder="Alex Rivera"
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-white/50">Profession</span>
        <input
          value={profession}
          onChange={(event) => patchDraft({ profession: event.target.value })}
          placeholder="Designer & Developer"
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-white/50">About</span>
        <textarea
          value={description}
          onChange={(event) => patchDraft({ description: event.target.value })}
          placeholder="A short bio, 10-40 words."
          rows={4}
          className={`${fieldClassName} resize-none`}
        />
      </label>

      {/* Social Links */}
      <div className="pt-2 border-t border-white/10 flex flex-col gap-4">
        <span className="text-xs uppercase tracking-wider text-white/40">
          Links & Profiles
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-white/50">GitHub URL</span>
            <input
              value={socialLinks.github ?? ""}
              onChange={(e) => patchSocialLinks({ github: e.target.value })}
              placeholder="https://github.com/username"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-white/50">LinkedIn URL</span>
            <input
              value={socialLinks.linkedin ?? ""}
              onChange={(e) => patchSocialLinks({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-white/50">X / Twitter URL</span>
            <input
              value={socialLinks.twitter ?? ""}
              onChange={(e) => patchSocialLinks({ twitter: e.target.value })}
              placeholder="https://x.com/username"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-white/50">Website URL</span>
            <input
              value={socialLinks.website ?? ""}
              onChange={(e) => patchSocialLinks({ website: e.target.value })}
              placeholder="https://yourwebsite.com"
              className={fieldClassName}
            />
          </label>
        </div>
      </div>
    </form>
  );
}



