export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  tech: string[];
  thumbnail: string;  // Thumbnail untuk halaman works listing
  images: string[];   // Array gambar untuk halaman detail [id]
  carbon?: string;    // Opsional: Detail teknis tambahan gaya agency
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Ticketing System",
    category: "Fullstack",
    client: "cretivox.com",
    year: "2025",
    description: "An end-to-end ticketing system featuring seamless booking, automated QR code distribution, and a real-time scanner dashboard for efficient attendee check-in.",
    tech: ["Next.js", "TypeScript", "Shadcn UI"],
    thumbnail: "/thumbnail-1.png",
    images: ["/scanner-ticketings.png", "/ticketing-email.png"],
    carbon: "0.12 G/CO2 [A]"
  },
  {
    id: "02",
    title: "HRIS Cretivox",
    category: "Frontend / Dashboard",
    client: "cretivox.com",
    year: "2025",
    description: "Custom in-house HRIS resulting in 100% cost saving by eliminating third-party software dependencies.",
    tech: ["Next.js", "Recharts", "Tailwind", "Shadcn UI"],
    thumbnail: "/career-web.png",
    images: ["/career-web.png", "/employee-survey.png", "/hris-dashboard-1.png", "/applicant-mng.png"],
    carbon: "0.45 G/CO2 [B]"
  },
  {
    id: "03",
    title: "Company Profile & CMS Article Posting",
    category: "Frontend / CMS",
    client: "DOT indonesia | nortis",
    year: "2025",
    description: "Company profle with a dynamic CMS for article publish.",
    tech: ["Next.js", "Tailwind", "Framer Motion", "Shadcn UI"],
    thumbnail: "/thumbnail-2.png",
    images: ["/nortis-web.png"],
  },
  {
    id: "04",
    title: "Kareerly Job Recommendation",
    category: "Fullstack",
    client: "Personal Project",
    year: "2025",
    description: "Job recommendation with core features conversiational chatbot and CV analyzer that maps skills to potential job roles",
    tech: ["Next.js", "TypeScript", "Shadcn UI", "Tailwind"],
    thumbnail: "/kareerly-1.png",
    images: ["/kareerly-1.png", "/kareerly-2.png"],
  },
];