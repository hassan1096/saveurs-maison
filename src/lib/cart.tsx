import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Cart = { qty: number; open: boolean; add: () => void; remove: () => void; setOpen: (o: boolean) => void };
const Ctx = createContext<Cart | null>(null);
const KEY = "sm-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQty] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(KEY) === "1") setQty(1);
  }, []);
  useEffect(() => {
    localStorage.setItem(KEY, String(qty));
  }, [qty]);
  // Digital product: quantity capped at 1.
  const add = () => { setQty(1); setOpen(true); };
  const remove = () => setQty(0);
  return <Ctx.Provider value={{ qty, open, add, remove, setOpen }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
