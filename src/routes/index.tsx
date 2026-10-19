import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Check, ChevronDown, Clock, ListChecks, Smartphone, Sparkles, Star, Utensils, Lightbulb, Tablet } from "lucide-react";
import { useState } from "react";
import { Header, Footer } from "@/components/site";
import { useCart } from "@/lib/cart";
import { PRODUCT, PAYMENT_ENABLED, CONTACT_EMAIL, formatPrice } from "@/lib/product";
import hero from "@/assets/hero.jpg";
import cover from "@/assets/cover.jpg";
import cta from "@/assets/cta.jpg";
import dish from "@/assets/dish.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saveurs & Maison — E-book : 20 recettes rapides et gourmandes" },
      { name: "description", content: "Découvre 20 recettes délicieuses, rapides et gourmandes pour te régaler sans passer des heures en cuisine. E-book numérique à 9,90 €." },
      { property: "og:title", content: "Saveurs & Maison — 20 recettes rapides & gourmandes" },
      { property: "og:description", content: "Un e-book de 20 recettes gourmandes, avec ingrédients, quantités et étapes claires." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Add authentic reviews here once received. Nothing is displayed as a rating until then.
type Review = { name: string; rating: number; text: string; date?: string };
const REVIEWS: Review[] = [];

function Index() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <ProductSection />
        <Preview />
        <Why />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest text-forest-foreground">
      <img src={hero} alt="Poêlée de poulet rôti aux herbes, pommes de terre et tomates" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-55" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-forest/20" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.3fr_1fr] md:py-28">
        <div className="reveal">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold sm:text-sm">DES RECETTES SIMPLES, GOURMANDES ET ACCESSIBLES</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
            Transforme ta cuisine en un <em className="text-gold">vrai moment</em> de plaisir.
          </h1>
          <p className="mt-5 max-w-lg text-base opacity-90 sm:text-lg">Découvre 20 recettes délicieuses, rapides et gourmandes pour te régaler sans passer des heures en cuisine.</p>
          <a href="#ebook" className="btn-gold mt-8">Découvrir l'e-book</a>
        </div>
        <div className="hidden justify-center md:flex">
          <img src={cover} alt="Couverture de l'e-book 20 recettes rapides, gourmandes & appétissantes" width={768} height={1024} className="book-3d w-64 lg:w-72" />
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: Utensils, t: "20 recettes gourmandes", d: "Des idées variées pour se faire plaisir." },
  { icon: Clock, t: "Rapides à préparer", d: "Moins de temps passé en cuisine." },
  { icon: ListChecks, t: "Des étapes simples", d: "Des instructions claires pour cuisiner sereinement." },
  { icon: Tablet, t: "Un e-book numérique", d: "Sur téléphone, tablette ou ordinateur." },
];

function Benefits() {
  return (
    <section className="border-b bg-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
        {benefits.map(({ icon: I, t, d }) => (
          <div key={t} className="text-center">
            <I className="mx-auto h-7 w-7 text-primary" aria-hidden />
            <h3 className="mt-3 text-lg font-semibold leading-tight">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BuyButton({ className = "" }: { className?: string }) {
  const cart = useCart();
  return (
    <button onClick={cart.add} className={`btn-primary ${className}`}>Acheter l'e-book</button>
  );
}

function ProductSection() {
  return (
    <section id="ebook" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="flex justify-center">
          <img src={cover} alt="Couverture de l'e-book" width={768} height={1024} loading="lazy" className="book-3d w-60 sm:w-72 md:w-80" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold">E-BOOK NUMÉRIQUE</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl md:text-5xl">Ton prochain e-book de recettes préféré</h2>
          <p className="mt-4 text-muted-foreground">{PRODUCT.description}</p>
          <ul className="mt-6 space-y-3">
            {PRODUCT.features.map((f) => (
              <li key={f} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden /><span>{f}</span></li>
            ))}
          </ul>
          <p className="mt-8 font-serif text-4xl font-semibold">{formatPrice(PRODUCT.priceCents)}</p>
          <BuyButton className="mt-4 w-full sm:w-auto" />
          <p className="mt-3 text-sm text-muted-foreground">
            {PAYMENT_ENABLED ? "Produit numérique — accès après confirmation du paiement" : "Paiement en ligne bientôt disponible."}
          </p>
        </div>
      </div>
    </section>
  );
}

function PageCard({ children, rotate }: { children: React.ReactNode; rotate: string }) {
  return (
    <div className={`w-64 shrink-0 snap-center rounded-lg border bg-card p-4 shadow-soft transition-transform hover:rotate-0 hover:-translate-y-1 md:w-auto ${rotate}`}>
      {children}
    </div>
  );
}

function Preview() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">Un aperçu de l'e-book</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">Aperçus d'illustration, pour donner une idée de la présentation — ce ne sont pas les pages exactes du livre.</p>
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          <PageCard rotate="md:-rotate-2">
            <p className="text-[10px] font-semibold tracking-widest text-gold">RECETTE</p>
            <h3 className="mt-1 text-xl font-semibold">Bowl veggie gourmand</h3>
            <img src={dish} alt="" width={816} height={816} loading="lazy" className="mt-3 aspect-square w-full rounded object-cover" />
            <p className="mt-2 text-xs text-muted-foreground">Une présentation claire pour chaque recette.</p>
          </PageCard>
          <PageCard rotate="md:rotate-1">
            <p className="text-[10px] font-semibold tracking-widest text-gold">INGRÉDIENTS</p>
            <ul className="mt-3 space-y-2 text-sm">
              {["Ingrédient — quantité", "Ingrédient — quantité", "Ingrédient — quantité", "Ingrédient — quantité", "Ingrédient — quantité"].map((x, i) => (
                <li key={i} className="flex justify-between border-b border-dashed pb-1.5"><span className="h-2 w-24 rounded bg-muted" /><span className="h-2 w-10 rounded bg-accent" /></li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Les ingrédients et leurs quantités.</p>
          </PageCard>
          <PageCard rotate="md:-rotate-1">
            <p className="text-[10px] font-semibold tracking-widest text-gold">PRÉPARATION</p>
            <ol className="mt-3 space-y-3 text-sm">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex gap-2"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{n}</span><span className="mt-2 h-2 flex-1 rounded bg-muted" /></li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">Des étapes détaillées, pas à pas.</p>
          </PageCard>
          <PageCard rotate="md:rotate-2">
            <img src={cta} alt="" width={1600} height={912} loading="lazy" className="aspect-[3/4] w-full rounded object-cover" />
            <p className="mt-2 text-xs text-muted-foreground">Des photos qui donnent envie.</p>
          </PageCard>
        </div>
        <div className="mt-8 text-center"><a href="#ebook" className="btn-primary">Découvrir l'e-book</a></div>
      </div>
    </section>
  );
}

const whys = [
  { icon: Lightbulb, t: "De nouvelles idées", d: "Trouve facilement l'inspiration pour varier tes repas." },
  { icon: BookOpen, t: "Clair et organisé", d: "Des instructions bien structurées, faciles à suivre." },
  { icon: Sparkles, t: "Gourmand, sans complexité", d: "Des recettes généreuses, sans étapes inutiles." },
  { icon: Smartphone, t: "Toujours sous la main", d: "Consulte ton livre au moment de cuisiner." },
];

function Why() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-center text-3xl font-semibold sm:text-4xl md:text-5xl">Le plaisir de bien manger, <em className="text-primary">simplement.</em></h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whys.map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-2xl border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-primary"><I className="h-5 w-5" aria-hidden /></span>
            <h3 className="mt-4 text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${n} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4" fill={i <= Math.round(n) ? "currentColor" : "none"} />)}
    </div>
  );
}

function Reviews() {
  const avg = REVIEWS.length ? REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length : 0;
  return (
    <section id="avis" className="bg-forest py-16 text-forest-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">Ils partagent leur expérience</h2>
        {REVIEWS.length === 0 ? (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-forest-foreground/20 p-8 text-center">
            <Star className="mx-auto h-8 w-8 text-gold" aria-hidden />
            <p className="mt-4 text-lg">Les premiers avis arrivent bientôt.</p>
            <p className="mt-2 text-sm opacity-80">Tu as découvert l'e-book ? Ton retour aidera les prochains gourmands à se lancer.</p>
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-center gap-3"><span className="font-serif text-3xl">{avg.toFixed(1)}/5</span><Stars n={avg} /><span className="text-sm opacity-80">({REVIEWS.length} avis)</span></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {REVIEWS.map((r, i) => (
                <figure key={i} className="rounded-2xl bg-card p-6 text-card-foreground">
                  <Stars n={r.rating} />
                  <blockquote className="mt-3 text-sm">{r.text}</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold">{r.name}{r.date && <span className="font-normal text-muted-foreground"> · {r.date}</span>}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const faqs = [
  { q: "Que contient l'e-book ?", a: "Il présente 20 recettes gourmandes, avec leurs ingrédients, leurs quantités et leurs étapes de préparation." },
  { q: "Comment recevoir mon e-book ?", a: "La vente en ligne n'est pas encore ouverte. Dès que le paiement sera activé, le mode de réception du fichier sera précisé ici." },
  { q: "Puis-je consulter l'e-book sur mon téléphone ?", a: "Oui, si ton appareil permet de lire le format du fichier fourni, tu peux consulter ton e-book sur téléphone, tablette ou ordinateur." },
  { q: "Ai-je besoin d'expérience en cuisine ?", a: "Les recettes sont présentées avec des étapes claires pour faciliter leur réalisation." },
  { q: "Que faire si je rencontre un problème après mon achat ?", a: CONTACT_EMAIL ? `Écris-nous à ${CONTACT_EMAIL}, nous te répondrons rapidement.` : "Une adresse de contact sera indiquée ici très prochainement." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h2 className="text-center text-3xl font-semibold sm:text-4xl">Questions fréquentes</h2>
      <div className="mt-10 divide-y rounded-2xl border bg-card">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
              <span>{f.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="reveal px-5 pb-5 text-muted-foreground">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest text-forest-foreground">
      <img src={cta} alt="" width={1600} height={912} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-forest/60" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:py-28">
        <h2 className="text-4xl font-semibold sm:text-5xl">Et si tu te régalais dès aujourd'hui ?</h2>
        <p className="mx-auto mt-4 max-w-xl opacity-90">Découvre de nouvelles idées, prépare de bons petits plats et transforme tes repas en moments de plaisir.</p>
        <Link to="/" hash="ebook" className="btn-gold mt-8">Je découvre mes 20 recettes</Link>
      </div>
    </section>
  );
}
