import Image from "next/image"

export const ProfileImage = ({ mobileOnly = false }: { mobileOnly?: boolean }) => {
  if (mobileOnly) {
    return (
      <div className="w-full h-96 md:hidden relative">
        <Image
          className="w-full h-full object-cover"
          src='/kikikeren.jpeg'
          alt="profile"
          fill
        />
      </div>
    )
  }

  return (
    <div className="h-full relative">
      {/* Container Foto */}
      <div className="h-full w-[600px] relative">
        <Image
          className="h-full w-full object-cover"
          src='/kikikeren.jpeg'
          alt="profile"
          width={600}
          height={1200}
          style={{ minWidth: '600px' }}
        />

        {/* TEKS DI SISI KANAN LUAR */}
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 rotate-90 origin-center">
          <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.5em] text-black">
            Creative Frontend Developer
          </p>
        </div>
      </div>
    </div>
  )
}

export const ProfileText = () => {
  return (
    // md:flex-1 memastikan teks hanya mengambil ruang yang tersisa dan tidak menabrak gambar
    <div className="w-full p-6 md:p-12 lg:p-16 flex-1 flex flex-col justify-end  md:min-h-screen">
      <h1 className="text-[10vw] md:text-[5vw] lg:text-[4.8vw] xl:text-[5vw] font-semibold uppercase tracking-tighter leading-[0.85] text-black">
        HI. I&apos;M RIZQI FAJRI - <br className="hidden md:block" />
        CREATIVE <br className="hidden lg:block" />
        SOFTWARE DEVELOPER
      </h1>
    </div>
  )
}