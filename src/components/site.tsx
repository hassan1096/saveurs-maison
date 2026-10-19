import { Link } from "@tanstack/react-router";
import { ChefHat, Menu, ShoppingBag, X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { PRODUCT, PAYMENT_ENABLED, formatPrice } from "@/lib/product";
import cover from "@/assets/cover.jpg";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${light ? "bg-forest-foreground text-forest" : "bg-primary text-primary-foreground"}`}>
        <ChefHat className="h-5 w-5" aria-hidden />
      </span>
      <span className="truncate font-serif text-xl font-semibold">Saveurs &amp; Maison</span>
    </Link>
  );
}

const links = [
  { label: "Accueil", hash: "top" },
  { label: "Notre e-book", hash: "ebook" },
  { label: "Avis", hash: "avis" },
  { label: "FAQ", hash: "faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cart = useCart();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-background/95 shadow-soft backdrop-blur" : "bg-background"}`}>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:flex md:justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex" aria-label="Principale">
          {links.map((l) => (
            <Link key={l.hash} to="/" hash={l.hash} className="transition-colors hover:text-gold">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={() => cart.setOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-muted" aria-label="Ouvrir le panier">
            <ShoppingBag className="h-5 w-5" />
            {cart.qty > 0 && <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-forest">{cart.qty}</span>}
          </button>
          <Link to="/" hash="ebook" className="btn-primary hidden !min-h-10 text-sm md:inline-flex">Découvrir l'e-book</Link>
          <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-muted md:hidden" aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background px-4 pb-4 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.hash} to="/" hash={l.hash} onClick={() => setOpen(false)} className="block border-b py-3.5 text-base font-medium">{l.label}</Link>
          ))}
          <Link to="/" hash="ebook" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">Découvrir l'e-book</Link>
        </nav>
      )}
      <CartDrawer />
    </header>
  );
}

function CartDrawer() {
  const cart = useCart();
  if (!cart.open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Panier">
      <div className="absolute inset-0 bg-forest/50" onClick={() => cart.setOpen(false)} />
      <aside className="reveal absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-background p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Ton panier</h2>
          <button onClick={() => cart.setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-muted" aria-label="Fermer"><X className="h-5 w-5" /></button>
        </div>
        {cart.qty === 0 ? (
          <p className="mt-8 text-muted-foreground">Ton panier est vide.</p>
        ) : (
          <div className="mt-6 flex gap-4 rounded-xl border bg-card p-3">
            <img src={cover} alt="" width={64} height={85} className="h-20 w-16 shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug">{PRODUCT.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">E-book numérique</p>
              <p className="mt-1 font-semibold">{formatPrice(PRODUCT.priceCents)}</p>
            </div>
            <button onClick={cart.remove} className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-muted" aria-label="Retirer"><Trash2 className="h-4 w-4" /></button>
          </div>
        )}
        <div className="mt-auto space-y-3 border-t pt-4">
          <div className="flex justify-between font-semibold"><span>Total</span><span>{formatPrice(cart.qty * PRODUCT.priceCents)}</span></div>
          <button className="btn-primary w-full" disabled={!PAYMENT_ENABLED || cart.qty === 0}>Passer au paiement</button>
          {!PAYMENT_ENABLED && <p className="text-center text-xs text-muted-foreground">Le paiement en ligne sera disponible très prochainement.</p>}
        </div>
      </aside>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-3 text-sm opacity-80">Des recettes qui font plaisir.</p>
        </div>
        <nav className="grid gap-2 text-sm" aria-label="Pied de page">
          <Link to="/" hash="top" className="hover:text-gold">Accueil</Link>
          <Link to="/" hash="ebook" className="hover:text-gold">Notre e-book</Link>
          <Link to="/" hash="faq" className="hover:text-gold">FAQ</Link>
          <Link to="/legal/$slug" params={{ slug: "contact" }} className="hover:text-gold">Contact</Link>
        </nav>
        <nav className="grid gap-2 text-sm" aria-label="Informations légales">
          <Link to="/legal/$slug" params={{ slug: "mentions-legales" }} className="hover:text-gold">Mentions légales</Link>
          <Link to="/legal/$slug" params={{ slug: "confidentialite" }} className="hover:text-gold">Politique de confidentialité</Link>
          <Link to="/legal/$slug" params={{ slug: "cgv" }} className="hover:text-gold">Conditions générales de vente</Link>
          <Link to="/legal/$slug" params={{ slug: "cookies" }} className="hover:text-gold">Cookies</Link>
        </nav>
      </div>
      <p className="border-t border-forest-foreground/15 py-5 text-center text-xs opacity-70">© {new Date().getFullYear()} Saveurs &amp; Maison</p>
    </footer>
  );
}
