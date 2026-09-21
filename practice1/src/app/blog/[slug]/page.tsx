import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Parallax from "../../components/Parallax";
import { getPost, posts } from "../posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} · 產地筆記`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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

          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-soft transition hover:text-terracotta-deep"
            >
              ← 回到產地筆記
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-ink-soft">
              <span className="border border-terracotta-deep/30 px-2 py-0.5 text-terracotta-deep">
                {post.tag}
              </span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="font-serif text-3xl font-bold leading-[1.3] tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg leading-8 text-ink-soft">{post.excerpt}</p>
          </div>
        </section>

        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-cream">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-10 flex flex-col gap-6">
              {post.body.map((paragraph, i) => (
                <p key={i} className="text-base leading-8 text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-terracotta-deep"
            >
              ← 看更多產地筆記
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
