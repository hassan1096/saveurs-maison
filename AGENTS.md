<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS

- Product data (price, description, payment flag, contact email) lives in src/lib/product.ts — single product site, keep one source of truth.
- Purchase checkout stays disabled (PAYMENT_ENABLED=false) until a real payment provider and digital delivery are connected; never simulate payment.
- Reviews live in the REVIEWS array in src/routes/index.tsx; only authentic reviews may be added.
