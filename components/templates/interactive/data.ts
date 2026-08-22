import type { Portfolio } from "@/types/portfolio";

export const samplePortfolio: Portfolio = {
  id: "interactive",
  portfolioType: "interactive",
  name: "Alex Rivera",
  profession: "Creative Technologist",
  profileImage:
    "https://i.pinimg.com/1200x/36/9d/8c/369d8c1a01f21c357fd77dd6538eaea5.jpg",
  resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  socialLinks: {
    email: "alex@example.com",
    website: "https://alexrivera.design",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  description:
    "I design interfaces you can feel — motion, sound, and interaction for products that should respond like they are alive.",
  experiences: [
    {
      id: "1",
      company: "Kinetic Lab",
      role: "Creative Technologist",
      location: "Remote",
      startDate: "2023",
      endDate: "Present",
      description: "Leading interaction design and motion systems for product launches.",
    },
    {
      id: "2",
      company: "North Studio",
      role: "Interactive Designer",
      location: "Los Angeles",
      startDate: "2021",
      endDate: "2023",
      description: "Built hover states, prototypes, and web experiences for consumer brands.",
    },
    {
      id: "3",
      company: "Harbor",
      role: "Design Engineer",
      location: "New York",
      startDate: "2019",
      endDate: "2021",
      description: "Shipped component libraries with animation primitives.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "RISD",
      degree: "BFA",
      field: "Digital + Media",
      startDate: "2015",
      endDate: "2019",
    },
  ],
  skills: [
    { id: "1", name: "Motion design", category: "Craft" },
    { id: "2", name: "Prototyping", category: "Craft" },
    { id: "3", name: "React", category: "Build" },
    { id: "4", name: "WebGL", category: "Build" },
    { id: "5", name: "Design systems", category: "Craft" },
    { id: "6", name: "Sound design", category: "Craft" },
  ],
  projects: [
    {
      id: "1",
      title: "Orbit",
      description: "A spatial workspace where research clusters snap, drift, and settle.",
      url: "#",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["Product", "Motion"],
    },
    {
      id: "2",
      title: "Pulse",
      description: "A shared motion language for product teams — springs, easing, and sound.",
      url: "#",
      image:
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80",
      tags: ["System"],
    },
    {
      id: "3",
      title: "Arcade",
      description: "An editorial site that plays back as you scroll — type, image, and click.",
      url: "#",
      image:
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
      tags: ["Editorial"],
    },
    {
      id: "4",
      title: "Drift",
      description: "A small tool for generating kinetic type studies in the browser.",
      url: "#",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
      tags: ["Open source"],
    },
  ],
};
