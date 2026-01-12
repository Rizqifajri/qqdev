export interface GalleryItem {
  id: string;
  title: string;
  type: "Experimental" | "UI Design" | "Motion";
  image: string;
  year: string;
}

export const galleryItems: GalleryItem[] = [
  { id: "01", title: "Fluid Simulation", type: "Motion", image: "/gal1.jpg", year: "2025" },
  { id: "02", title: "Abstract Geometry", type: "Experimental", image: "/gal2.jpg", year: "2025" },
  { id: "03", title: "Glassmorphism UI", type: "UI Design", image: "/gal3.jpg", year: "2024" },
  { id: "04", title: "GSAP Text Trail", type: "Motion", image: "/gal4.jpg", year: "2025" },
  { id: "05", title: "Cyberpunk Layout", type: "Experimental", image: "/gal5.jpg", year: "2026" },
  { id: "06", title: "Neomorphism Study", type: "UI Design", image: "/gal6.jpg", year: "2024" },
];