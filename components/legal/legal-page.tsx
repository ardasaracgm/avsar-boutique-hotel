import { getLocale, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";

type Doc = "kvkk" | "privacy" | "terms";
type Section = { title: string; body: string[]; list: string[] };

/** Meta description: the document intro, filled and trimmed to ~155 characters. */
export async function legalDescription(doc: Doc) {
  const t = await getTranslations();
  const text = (t.raw(`legal.${doc}.intro`) as string)
    .replace("{hotel}", hotel.name)
    .replace("{company}", hotel.legal.companyTitle ?? hotel.name);
  return text.length > 155 ? `${text.slice(0, 152).trimEnd()}…` : text;
}

/** Long-form legal document from `legal.<doc>` messages, with hotel facts filled in. */
export async function LegalPage({ doc, title }: { doc: Doc; title: string }) {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const { address, contact, legal } = hotel;

  const vars: Record<string, string> = {
    hotel: hotel.name,
    company: legal.companyTitle ?? hotel.name,
    address: `${address.street}, ${address.postalCode} ${address.district}/${address.city}`,
    email: contact.email.value,
    phone: contact.phone.display,
  };
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);

  const intro = t.raw(`legal.${doc}.intro`) as string;
  const sections = t.raw(`legal.${doc}.sections`) as Section[];
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "Europe/Istanbul" }).format(
    new Date(`${legal.textsUpdated}T12:00:00+03:00`),
  );

  return (
    <article className="py-10 sm:py-14 lg:py-16">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: title }]} />
        <h1 className="mt-10 text-h1">{title}</h1>
        <p className="mt-4 text-sm text-ink-muted">{t("legal.meta.updated", { date })}</p>
        <p className="mt-8 text-lg leading-relaxed">{fill(intro)}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-heading text-h3">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-ink-muted">
                  {fill(p)}
                </p>
              ))}
              {s.list.length > 0 && (
                <ul className="mt-3 list-disc space-y-1.5 ps-5 leading-relaxed text-ink-muted marker:text-sand-deep">
                  {s.list.map((li, i) => (
                    <li key={i}>{fill(li)}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {locale !== "tr" && <p className="mt-14 border-t border-navy/10 pt-6 text-xs text-ink-muted">{t("legal.meta.disclaimer")}</p>}
      </Container>
    </article>
  );
}
