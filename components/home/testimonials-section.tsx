import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { reviews } from "@/data/reviews";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading } from "@/components/ui/typography";

/** Verified guest reviews from data/reviews.ts. Renders nothing while the list is empty. */
export function TestimonialsSection() {
  const t = useTranslations("home.reviews");
  if (reviews.length === 0) return null;

  return (
    <section aria-labelledby="reviews-title" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading id="reviews-title" className="mt-4">
            {t("title")}
          </Heading>
        </Reveal>
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <li key={`${r.author}-${i}`}>
              <Reveal delay={i * 100} className="h-full">
                <figure className="flex h-full flex-col bg-white p-7">
                  <Quote aria-hidden className="size-6 text-sand" strokeWidth={1.25} />
                  <blockquote lang={r.lang} className="mt-4 flex-1 font-heading text-xl leading-snug">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold">{r.author}</span>
                    <span className="text-ink-muted">
                      {" · "}
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                          {t("source", { source: r.source })}
                        </a>
                      ) : (
                        t("source", { source: r.source })
                      )}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
