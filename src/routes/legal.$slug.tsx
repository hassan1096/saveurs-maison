import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site";

const PAGES: Record<string, { title: string; body: string }> = {
  "mentions-legales": { title: "Mentions légales", body: "Raison sociale, adresse, numéro SIRET, directeur de publication et hébergeur : à compléter avec les informations réelles de l'entreprise avant la mise en ligne." },
  confidentialite: { title: "Politique de confidentialité", body: "Données collectées, finalités, durée de conservation et droits des utilisateurs (RGPD) : à compléter avant la mise en ligne." },
  cgv: { title: "Conditions générales de vente", body: "Produit vendu, prix, modalités de paiement, livraison numérique, droit de rétractation pour les contenus numériques : à compléter avant la mise en ligne." },
  cookies: { title: "Cookies", body: "Ce site n'utilise pas de cookies publicitaires. Seul le contenu du panier est mémorisé sur ton appareil. À mettre à jour si des outils de mesure sont ajoutés." },
  contact: { title: "Contact", body: "Une adresse de contact sera communiquée ici très prochainement." },
};

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => {
    const page = PAGES[params.slug];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Page"} — Saveurs & Maison` },
      { name: "description", content: `${loaderData?.title ?? "Informations"} du site Saveurs & Maison.` },
      { property: "og:title", content: `${loaderData?.title ?? "Page"} — Saveurs & Maison` },
      { property: "og:description", content: "Informations du site Saveurs & Maison." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  const page = Route.useLoaderData();
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-semibold">{page.title}</h1>
        <p className="mt-6 text-muted-foreground">{page.body}</p>
      </main>
      <Footer />
    </>
  );
}
