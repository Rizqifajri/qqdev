import { projects } from "@/libs/data.works";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NaviagationMenu } from "@/app/_components/navigation-menu";
// Import navigasi utama kamu


export default async function ProjectDetail({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="bg-white text-black min-h-screen font-sans flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        {/* KIRI: Info Project (Sticky) */}
        <div className="w-full md:w-[40%] p-8 md:p-16 md:sticky md:top-[120px] md:h-[calc(100vh-120px)] flex flex-col justify-between border-r border-gray-100">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold uppercase tracking-tighter mb-12 leading-[0.9]">
              {project.title}
            </h1>

            <div className="space-y-4 text-[10px] font-mono uppercase">
              <div className="grid grid-cols-2 py-4 border-t border-gray-100">
                <span className="text-gray-400">Tech</span>
                <span className="font-bold">{project.tech.join(", ")}</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-t border-gray-100">
                <span className="text-gray-400">Role</span>
                <span className="font-bold">{project.category}</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-t border-gray-100 border-b">
                <span className="text-gray-400">Client</span>
                <span className="font-bold">{project.client}</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xl font-light leading-snug text-gray-800 max-w-sm">
              {project.description}
            </p>
          </div>
        </div>

        {/* KANAN: Gallery Scrollable */}
        <div className="w-full md:w-[60%] flex flex-col bg-gray-50/50">
          {/* Images Gallery */}
          {project.images.map((img, idx) => (
            <div key={idx} className="relative w-full aspect-[16/10] border-b border-gray-100 bg-white">
              <Image
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}

          {/* Footer Navigation */}
          <Link
            href={`/works/${nextProject.id}`}
            className="group py-40 flex flex-col items-center justify-center bg-black text-white hover:bg-zinc-900 transition-all duration-500 uppercase font-bold text-sm tracking-[0.3em]"
          >
            <span className="text-[10px] font-mono mb-4 opacity-40 group-hover:opacity-100">Next Project</span>
            <div className="text-2xl md:text-4xl tracking-tighter">
              {nextProject.title} →
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}