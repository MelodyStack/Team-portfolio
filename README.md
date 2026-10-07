# Team site

A marketing site for an IT development team, written for one reader: a founder
with money, a deadline, and no technical co-founder.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Framer Motion.
Fraunces + Plus Jakarta Sans.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 35 static routes, no server required
npm run lint
```

---

## How the content is organised

Almost everything a visitor reads lives in two files. Components take data; they
don't hold copy.

- **`src/lib/site.ts`**: brand, contact, nav, stats, situations, services,
  process, engagement models, principles, team, testimonials, FAQs, CTA.
  Rebranding the site is a single-file job.
- **`src/lib/projects.ts`**: the 24 case studies. Add an entry and both the
  work-grid card and the `/work/<slug>` page appear; the route is generated
  statically from the list.
- **`src/lib/builds.ts`**: 29 shipped builds. Real client work with a short,
  accurate description and a link you can open, but no written case study.
  Promoting these into `projects.ts` would mean inventing the problem,
  decision and outcome chapters that format demands, and a true one-liner
  beats a well-structured story that is partly fiction. `role` preserves the
  original credit, so the three that say "Contributing developer" still do.
- **`src/lib/apps.ts`**: the 7 store-published apps. Separate *data* because
  on these we were a contributing mobile engineer rather than the team that
  shaped the product, so there is no case study to write. Apps we *did* own
  (PlayByPlay Anime) live in `projects.ts` with a full write-up.

  They still render in the same work grid, via `AppCard`. Keeping them in a
  section of their own made the "Mobile app" filter read **1** while seven more
  apps sat further down the same page, which badly undersold the mobile work.
  The honesty that justified the split now lives on the card instead: an
  `AppCard` always shows its role credit ("React Native engineer") and links
  to the store listing rather than to a case study.

Counts are derived, not typed. Headcount copy comes from `team.length` and the
product counts from `projects.length + builds.length + apps.length`, both via
`spellNumber()`, so "60 products" and "Six people" can't drift when the data
changes.

**Three datasets, one grid.** `ProjectGrid` renders all three kinds and the
filter counts come from the merged list, so nothing is reachable only via
"All". Which dataset a piece of work belongs in is a question about evidence,
not quality: can we write an honest case study about it, is it a store
listing, or do we just have a true description and a link?

**If you add a `ProjectCategory`, add it to `FILTERS` in
`src/components/project-grid.tsx` too**: a category missing from that list
makes its projects unreachable from the filter row.

---

## Page structure, and why

The homepage answers a founder's questions in the order they actually ask them:

| # | Section | The question it answers |
| --- | --- | --- |
| · | Hero | What do you do, and why you? |
| · | Client ribbon + stats | Have you done this before? |
| 01 | Who hires us | Is my situation one you handle? |
| 02 | What we build | Can you build *my* thing? |
| 03 | Selected work | Show me. |
| 04 | On the app stores | Can you ship mobile too? |
| 05 | How we are different | Why not the cheaper team? |
| 06 | How it runs | Will it actually ship? |
| 07 | How to work with us | Can I afford this? |
| 08 | The team | Who am I dealing with? |
| 09 | Proof you can check | Does anyone else vouch for you? |
| 10 | Before you ask | *(the objection that stops the email)* |
| · | CTA | What happens if I reach out? |

`/process` exists because the real blocker on a six-figure decision isn't
price, it's the fear of paying for something that never arrives, so that page
is entirely about what the client gets and where they can stop.

---

## Notable implementation decisions

**One fixed theme, by request.** There is no light/dark toggle, no `.dark`
variant and no `prefers-color-scheme` branch. Every token in `globals.css` is
its final value.

**The look is warm and human.** Cream `#FDFBF7`, deep teal `#0F3D3E`,
terracotta `#C75B39`. Fraunces (a soft variable serif) for headings, Plus
Jakarta Sans for everything else. Generous radii, soft tinted shadows,
sentence case throughout. Warmth and depth come from layered tints and real
project photography rather than from hard rules.

**Shadows are tinted teal, never black.** `.lift` and `.lift-lg` use
`#0f3d3e` at low alpha. A neutral black shadow on a cream page reads as grey
dirt; tinting it with the dark of the palette is what keeps elevation looking
deliberate rather than accidental.

**Terracotta has two steps and they are not interchangeable.** `clay`
(`#C75B39`) measures 4.0:1 on cream, under the AA floor for body copy, so it
is a FILL: dots, chips, the heading swash, button backgrounds. `clay-ink`
(`#A8442A`) is 5.8:1 and is the one to use when the accent has to be *text*.
Inside a `.teal-block`, use `clay-200` (5.8:1 on teal).

**The hero shows a real client project, not an illustration.** It is the
warmth and depth the page needs and it is proof at the same time, which a
stock photo or an abstract graphic could not be.

**Don't name a component class after a Tailwind utility.** The
inverted-section class was briefly called `.invert`, which collides with
Tailwind's `invert` **filter** utility. Both applied: the section got its
dark background and then had its whole subtree colour-inverted. It is
`.teal-block` for that reason.

**Prices are published, and they start small on purpose.** The audience is
solo founders and early startups paying out of their own pocket, so the
cheapest real thing we sell leads: a $1,900 written plan, then a single
$3,900 sprint you can buy exactly one of. Agency sites that open at five
figures lose that reader before they have read a word about the work.

**Every `from` price travels with the scope it buys** (`typical.entry` on
each service). A floor published on its own is how founders arrive
expecting a full build for the entry figure, then feel misled by the quote.

**No years-of-experience figures on the team page.** They were only ever
confirmed for one member, and a card showing `8 years` beside cards showing
nothing makes the blank ones look evasive and the filled one look audited.
Profiles are a list (`links`) rather than a single `linkedin` field, because
people carry different ones and for an engineer a GitHub or Stack Overflow
page is better evidence than a LinkedIn profile.

**Testimonials require attribution, by type.** `Testimonial` demands a full
name, role and company. An unnamed, uncheckable endorsement is the clearest
signal of a fabricated one, and it drags the honest claims around it down
with it, so the type makes an anonymous quote impossible rather than merely
discouraged.

**`SocialProof` has two states.** With testimonials it shows them. With none
it shows six shipped client products with live links, which is checkable
proof and needs nobody's permission to publish. Add one real quote and the
section switches over on its own.

Every slug in `proofSlugs` must actually open. Thunderpick was in that list
and sits behind a Cloudflare bot challenge, which is fine for the work grid
but not for a section headed "open any of them".

**Scroll reveals work without JavaScript.** A motion library's `whileInView`
server-renders its elements at `opacity: 0` and relies on hydration to bring
them back, which means a slow connection or a failed chunk leaves every
section below the hero blank, on a page whose entire job is to be read.
Instead: `Reveal` is a *server* component that emits a class, the hidden start
state is scoped to `.js` on `<html>` (added by a tiny inline script), and one
global `IntersectionObserver` in `RevealObserver` drives all of them. No JS
means the content is simply visible.

**The hero entrance is CSS, not JS.** Same reasoning, applied to the first
sentence a visitor reads. `.enter` + a per-word `--d` delay.

**`prefers-reduced-motion` is honoured in CSS**, including `animation-delay: 0`
and a hard override that forces reveals visible, so nothing can be left hidden
by an observer that didn't fire.

**Covers fall back to a wireframe, not a gradient.** `StorefrontMockup` draws a
schematic when a project has no screenshot. A wireframe reads as "this is a
diagram", which is honest; a plausible-looking fake screenshot would quietly
damage trust in the real ones beside it.

**Button padding is keyed off variant, not patched at call sites.** Two padding
utilities at equal specificity leave the winner down to stylesheet order. Same
reason `Section` has a `tightTop` prop instead of callers passing `pt-*`.

**Every responsive grid carries a base `grid-cols-1`.** Without it, `grid` plus
only `md:grid-cols-2` leaves the implicit column at `grid-auto-columns: auto`,
which sizes to **max-content**, so a single wide card silently pushes the
whole page past the viewport on mobile. This bit the app shelf and was latent
in 28 other grids.

---

## The contact form

Submitting calls the `sendEnquiry` server action in
`src/app/actions/send-enquiry.ts`, which emails the address in
`CONTACT_TO_EMAIL` through Resend's HTTP API. Plain `fetch`, no SDK, so it
adds no dependency and runs anywhere a server action runs.

**Setup.** Copy `.env.example` to `.env.local` and fill in:

| Variable | What it does |
| --- | --- |
| `CONTACT_TO_EMAIL` | Where enquiries land. Change this one line to redirect the form |
| `CONTACT_FROM_EMAIL` | The From address. Must be on a domain verified with your provider; `onboarding@resend.dev` works for testing |
| `RESEND_API_KEY` | From resend.com. Free tier covers a contact form easily |

None are `NEXT_PUBLIC_*`, so none reach the browser. On a host, set the same
three as environment variables.

**It degrades instead of failing.** If the key is missing, the provider errors,
or the request times out, the form composes the message in the visitor's mail
client and shows it as copyable text, which is what it did before sending was
wired up. There is no path where a visitor is told "sent" and nothing was. That
matters more than it sounds: a contact form that fails silently is worse than
one that was never connected, because nobody notices for months.

Other behaviour worth knowing:

- `reply_to` is the enquirer, so hitting reply in the inbox goes to them.
- A hidden honeypot field is accepted and discarded rather than rejected, so a
  scripted submitter can't tell which field caught it.
- Validation runs server-side too; the client cannot be the only gate.
- Input is length-capped and newline-stripped before it reaches a subject line
  or `reply_to`, which is where header injection would otherwise live.

---

## Verified

- `npm run build`: clean, 35 prerendered routes
- All 28 of Jeram's screenshots downloaded and served locally; none hotlink
- `npx eslint .`: clean
- No horizontal overflow at 375 / 768 / 1440px across all routes
- Every `ProjectCategory` appears in the filter row, and the category counts
  sum to the merged total (24 + 10 + 7 + 2 + 12 + 2 + 3 = 60), so nothing is
  reachable only via "All"
- `--color-faint`, the quietest step and the one carrying small labels,
  measures 4.9:1 on cream, over the AA floor for text below 18px. Don't
  lighten it or lighten the cream.
- Contact form driven end to end in a real browser: no API key falls back to
  the mail client, a short message is rejected server-side with an inline
  error, and an invalid API key still falls back rather than losing the
  enquiry. The success path needs a real key and has not been exercised
- Server-rendered HTML contains no `opacity:0`, so the page is readable with
  JavaScript disabled

## Deploying

Every page is prerendered, but the contact form's server action needs a
runtime, so this is **not** a static export any more. Host it somewhere that
runs Next.js: Vercel, Netlify, Cloudflare, or any Node server. Dropping the
build onto S3 would serve all the pages and silently break only the form.

Set `brand.url` in `src/lib/site.ts` first: the sitemap, robots.txt, canonical
URLs and link-preview metadata are all built from it. Then set
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` and `RESEND_API_KEY` in the host's
environment.
