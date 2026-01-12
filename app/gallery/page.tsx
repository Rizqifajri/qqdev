import Image from "next/image";
import { NaviagationMenu } from "../_components/navigation-menu";
import { galleryItems } from "@/libs/data.gallery";

export default function GalleryPage() {
  return (
    <main className="bg-white text-black min-h-screen font-sans">      <section className="pt-32 px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-12 mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 block mb-4">
              // Visual Archive
            </span>
            <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
              Gallery
            </h1>
          </div>
          <p className="hidden md:block max-w-[200px] font-mono text-[10px] uppercase text-right text-gray-400">
            A collection of experiments, motion studies, and visual explorations.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-24">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="relative group break-inside-avoid border border-gray-100 overflow-hidden"
            >
              {/* Image Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-6">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-2">
                  {item.type} — {item.year}
                </span>
                <h3 className="text-white text-xl font-bold uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>

              {/* Image */}
              <div className="relative w-full h-auto">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              {/* Mobile Info (Visible without hover) */}
              <div className="md:hidden p-4 bg-white flex justify-between items-center border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase">{item.title}</span>
                <span className="font-mono text-[9px] text-gray-400">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}