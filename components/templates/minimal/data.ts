import type { Portfolio } from "@/types/portfolio";

export const samplePortfolio: Portfolio = {
  id: "minimal-preview",
  portfolioType: "minimal",
  name: "Alex Rivera",
  profession: "Designer & Developer",
  profileImage:
    "https://i.pinimg.com/1200x/36/9d/8c/369d8c1a01f21c357fd77dd6538eaea5.jpg",
  resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  socialLinks: {
    email: "alex@example.com",
    website: "https://alexrivera.design",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  description: "I design and build clear, quiet interfaces for products that need to feel considered.",
  experiences: [
    {
      id: "1",
      company: "North Studio",
      role: "Product Designer",
      location: "Remote",
      startDate: "2023",
      endDate: "Present",
      description: "Leading product design for web apps and design systems.",
    },
    {
      id: "2",
      company: "Harbor",
      role: "Design Engineer",
      location: "New York",
      startDate: "2021",
      endDate: "2023",
      description: "Shipped marketing sites and component libraries.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "RISD",
      degree: "BFA",
      field: "Graphic Design",
      startDate: "2017",
      endDate: "2021",
    },
  ],
  skills: [
    { id: "1", name: "Product design" },
    { id: "2", name: "Frontend" },
    { id: "3", name: "Design systems" },
    { id: "4", name: "Prototyping" },
  ],
  projects: [
    {
      id: "1",
      title: "Atlas",
      description: "A workspace for research teams to collect and share findings.",
      url: "https://example.com",
      tags: ["Product", "Web"],
    },
    {
      id: "2",
      title: "Field Notes",
      description: "Editorial site and CMS for an independent magazine.",
      url: "https://example.com",
      tags: ["Editorial"],
    },
    {
      id: "3",
      title: "Lumen",
      description: "A small utility for documenting design decisions.",
      url: "https://example.com",
      tags: ["Open source"],
    },
  ],
};
