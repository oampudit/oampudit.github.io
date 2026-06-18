// Single source of truth for work history + education.
// Consumed by About.js, ExperienceTimeline.js and Terminal.js so the three
// surfaces can never drift out of sync. `summary` is the one-line form the
// terminal prints; `achievements` is the full bullet list the cards render.

export const experience = [
  {
    id: 1,
    company: "PTT Digital Solutions",
    position: "Mid-Level Software Developer",
    period: "Nov 2023 — Present",
    location: "Bangkok, Thailand",
    summary: "Full-stack web + application modules on Azure.",
    achievements: [
      "Full-stack delivery of web and application solutions on Azure.",
      "Designed and deployed modules with clean business integration.",
      "Hardened systems via Azure Functions, Web Apps, and Key Vault.",
      "Authored module documentation, runbooks, and onboarding playbooks.",
    ],
    technologies: ["C#", ".NET Core", "Azure", "Angular", "SQL Server"],
  },
  {
    id: 2,
    company: "Bangkok Life Assurance",
    position: "Software Developer",
    period: "Apr 2021 — Nov 2023",
    location: "Bangkok, Thailand",
    summary: "Rewrote group-insurance core; mobile claims app in Flutter.",
    achievements: [
      "Rewrote the group-insurance core; lifted performance and security across the board.",
      "Designed the customer mobile app: claims, notifications, history.",
      "Owned full release cycles in C#, .NET Core, Oracle, Dart, and Flutter.",
    ],
    technologies: ["C#", ".NET Core", "Oracle", "Dart", "Flutter"],
  },
  {
    id: 3,
    company: "BizCon Solutions",
    position: "System Engineer",
    period: "Aug 2019 — Jan 2021",
    location: "Bangkok, Thailand",
    summary: "Infra for SET, Betagro, FWD — AD, Exchange, migrations.",
    achievements: [
      "Operated infrastructure for SET, Betagro, and FWD.",
      "Migrations and installations: Windows Server, Active Directory, Exchange.",
      "Reduced incident frequency through proactive monitoring.",
    ],
    technologies: ["Windows Server", "Active Directory", "Exchange", "System Admin"],
  },
];

export const education = [
  {
    degree: "Master of Business Management",
    school: "Mahidol University",
    period: "2017 — 2020",
    gpa: "3.35",
  },
  {
    degree: "Bachelor of Electrical Engineering",
    school: "King Mongkut's University of Technology North Bangkok",
    period: "2015 — 2019",
    gpa: "3.24",
  },
];
