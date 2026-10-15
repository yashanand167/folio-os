"use client";

import { useEffect, useState } from "react";

import { usePortfolioStore } from "@/stores/portfolio.store";
import { fieldClassName } from "@/components/forms/styles";

type BasicInfoProps = {
  profileImageFile?: File | null;
  onProfileImageFileChange?: (file: File | null) => void;
};

export default function BasicInfo({
  profileImageFile,
  onProfileImageFileChange,
}: BasicInfoProps) {
  const name = usePortfolioStore((state) => state.draft.name ?? "");
  const username = usePortfolioStore((state) => state.draft.username ?? "");
  const profession = usePortfolioStore((state) => state.draft.profession ?? "");
  const description = usePortfolioStore((state) => state.draft.description ?? "");
  const socialLinks = usePortfolioStore((state) => state.draft.socialLinks ?? {});
  const patchDraft = usePortfolioStore((state) => state.patchDraft);
  const patchSocialLinks = usePortfolioStore((state) => state.patchSocialLinks);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!profileImageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(profileImageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [profileImageFile]);

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
        <span className="text-neutral-500">Username</span>
        <input
          value={username}
          onChange={(event) =>
            patchDraft({
              username: event.target.value.toLowerCase().replace(/\s+/g, "-"),
            })
          }
          placeholder="alexrivera"
          autoComplete="username"
          className={fieldClassName}
        />
        <span className="text-xs text-neutral-400">
          Unique identifier for this portfolio. Letters, numbers, and hyphens.
        </span>
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
        <span className="text-neutral-500">Profile photo</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(event) => {
            onProfileImageFileChange?.(event.target.files?.[0] ?? null);
          }}
          className="text-sm text-neutral-600 file:mr-3 file:rounded-lg file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:text-white dark:text-neutral-400 dark:file:bg-white dark:file:text-black"
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile preview"
            className="mt-1 size-16 rounded-lg object-cover"
          />
        ) : null}
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
