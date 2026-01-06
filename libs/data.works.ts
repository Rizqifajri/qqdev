export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  tech: string[];
  image: string;      // Thumbnail utama
  gallery: string[];  // Tambahan: Array gambar untuk scroll ke bawah
  carbon?: string;    // Opsional: Detail teknis tambahan gaya agency
}

export const projects: Project[] = [
  {
    id: "01",
    title: "DefiLlama Adapter",
    category: "Development / Blockchain",
    client: "DEFILLAMA.COM",
    year: "2026",
    description: "Building autonomous data adapters and high-performance dashboard interfaces for global TVL tracking.",
    tech: ["Next.js", "TypeScript", "Ethers.js"],
    image: "/project1.jpg",
    gallery: ["/project1-detail1.jpg", "/project1-detail2.jpg"], 
    carbon: "0.12 G/CO2 [A]"
  },
  {
    id: "02",
    title: "HRIS Internal",
    category: "Fullstack / Internal Tool",
    client: "CRETIVOX",
    year: "2024",
    description: "Custom in-house HRIS resulting in 100% cost saving by eliminating third-party software dependencies.",
    tech: ["React", "PostgreSQL", "Tailwind"],
    image: "/project2.jpg",
    gallery: ["/project2-ss1.jpg", "/project2-ss2.jpg"],
    carbon: "0.45 G/CO2 [B]"
  },
  {
    id: "03",
    title: "Agency Design",
    category: "UI/UX Design / Agency",
    client: "PERSONAL",
    year: "2025",
    description: "Minimalist agency-style portfolio featuring strict grid systems and bold aesthetic.",
    tech: ["Next.js", "Framer Motion"],
    image: "/project3.jpg",
    gallery: ["/project3-mockup1.jpg"],
  },
  {
    id: "04",
    title: "Project Delta",
    category: "Branding / Identity",
    client: "CLIENT X",
    year: "2025",
    description: "Strategic branding and digital identity focusing on modern visual storytelling.",
    tech: ["Illustrator", "Next.js"],
    image: "/project4.jpg",
    gallery: ["/project4-logo.jpg", "/project4-ui.jpg"],
  },
  {
    id: "05",
    title: "Project Epsilon",
    category: "Agency Work / Luxury",
    client: "CLIENT Y",
    year: "2026",
    description: "High-end digital experience and immersive web solutions for luxury market segments.",
    tech: ["Webgl", "Three.js"],
    image: "/project5.jpg",
    gallery: ["/project5-render1.jpg"],
  },
];