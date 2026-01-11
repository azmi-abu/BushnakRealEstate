import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Reveal from "./Reveal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { projects } from "../data/projects";

export default function Projects() {
  return (
    
    <section id="projects" className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold">פרויקטים</h2>
        <p className="mt-2 text-white/70">
          פרויקטים נבחרים — כרטיסים מודרניים עם תמונה, מחיר וקריאה לפעולה.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.05 },
            640: { slidesPerView: 2.05 },
            1024: { slidesPerView: 3.05 },
          }}
        >
          {projects.map((p, idx) => (
            <SwiperSlide key={idx}>
              <ProjectCard {...p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </Reveal>
    </section>
  );
}

function ProjectCard({ title, location, price, img }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(217,255,74,0.12)]">
      <div className="relative h-56">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brandBg/80 via-brandBg/10 to-transparent" />

        <div className="absolute bottom-4 right-4 rounded-full bg-brandYellow px-4 py-2 text-sm font-extrabold text-brandBg shadow-lg">
          {price}
        </div>

        <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
          {location}
        </div>
      </div>

      <div className="p-5">
        <div className="text-lg font-extrabold">{title}</div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-white/70">{location}</span>

          <a
            href="#contact"
            className="rounded-2xl bg-brandGreen2 px-4 py-2 text-sm font-bold text-white transition hover:bg-brandYellow hover:text-brandBg"
          >
            לפרטים
          </a>
        </div>
      </div>
    </div>
  );
}
