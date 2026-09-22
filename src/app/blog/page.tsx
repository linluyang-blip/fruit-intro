import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Parallax from "../components/Parallax";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "產地筆記 · 寶島鮮果666",
  description: "走訪台灣各地果園，紀錄屏東芒果、嘉南平原鳳梨芭樂、花東縱谷釋迦與蓮霧的產地故事。",
};

export default function Blog() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-x-hidden px-6 py-20 sm:px-8 sm:py-28">
          <Parallax
            speed={0.12}
            className="pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-terracotta/15 blur-3xl"
          />
          <Parallax
            speed={-0.14}
            className="pointer-events-none absolute -right-16 top-24 -z-10 h-80 w-80 rounded-full bg-forest/15 blur-3xl"
          />
          <div className="mx-auto flex max-w-3xl flex-col gap-5 text-center">
            <span className="mx-auto text-xs uppercase tracking-[0.3em] text-terracotta-deep">
              Field Notes
            </span>
            <h1 className="font-serif text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
              產地筆記
            </h1>
            <p className="text-lg leading-8 text-ink-soft">
              走進台灣各地的果園，紀錄產地的風土、農民的日常，
              以及每一種水果背後的季節故事。
            </p>
          </div>
        </section>

        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-4xl divide-y divide-line px-6 sm:px-8">
            {posts.map((post) => (
              <article key={post.slug} className="py-16 first:pt-20 last:pb-20">
                <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-ink-soft">
                  <span className="border border-terracotta-deep/30 px-2 py-0.5 text-terracotta-deep">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-terracotta">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="relative mt-8 block aspect-[16/9] w-full overflow-hidden border border-line bg-cream"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                </Link>

                <Link
                  href={`/blog/${post.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-terracotta-deep"
                >
                  閱讀全文
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
