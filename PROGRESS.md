# PROGRESS

## DONE
- Lab page removed. Work index page removed, 6 projects moved to homepage.
- "See all" button removed.
- Hamburger replaced with homepage-logo.svg, click scrolls to top. Height
  matched to "Get in touch" button.
- Services copy replaced, pillar images removed, type only.
- Clients section replaced the tech stack section.
- Statement and scroll cue copy updated.
- Site metadata updated, tab reads Ilias Chakri.
- Dead files cleaned up.
- Contact form opens as a blurred modal from the header button.
- HERO locked. Headline "KEY VISUAL" / "TO FINAL FRAME" on two lines.
  Six rotating descriptors sitting ABOVE the headline as an eyebrow:
  Graphic & Motion Designer, Keyframe Obsessive, Illustrator, OOH Enjoyer,
  Render Queue Optimist, E-sports Late Nights.
  Status bar: Casablanca, Morocco / Working globally / Designing at VML (WPP)
  / 7+ years. No freelance availability line, contract not checked yet.
- Contact modal placeholders now read "Hamid Mercado" / "mercado@example.com",
  fields still start empty, labels unchanged. All contact modal copy (heading,
  subheading, 3 labels, 3 placeholders, submit label) moved into
  src/data/content.ts. Close X can no longer overlap "GET IN TOUCH": the
  headline reserves right padding matching the button's absolute-positioned
  column, so growth in one never reaches the other. Placeholder text bumped
  to neutral-400 (from neutral-500) for readability while staying dimmer
  than typed neutral-100 text, same in the textarea. Checked at 375, 768,
  1024, 1440, 1920, 2560: no overflow, no clipping, X never touches the
  headline, email placeholder fits on one line at 375.
- Statement opener changed to "I design the whole campaign, not just one
  piece of it." Rest of the statement unchanged. Statement copy moved out of
  About.tsx into src/data/content.ts (content.statement.text).
- Footer social links (LinkedIn, Instagram, Behance) no longer show the
  browser's default visited-link colour: added an explicit `visited:` variant
  matching the unvisited neutral-300, on both the desktop and mobile footer
  layouts. Hover state (neutral-300 to neutral-100) already existed and was
  left as is.
- ::selection audited site wide. It was already fixed in an earlier session
  (light sections: #171717 text on #cfcfcf background, ~11.5:1 contrast;
  `[data-surface="dark"]` sections: #f5f5f5 text on #525252 background,
  ~7.2:1 contrast), both pass WCAG AA. Verified by selecting text in the
  About section and the dark Footer in-browser, no changes needed.
- Checked at 375, 768, 1024, 1440, 1920, 2560: no horizontal overflow on the
  page, statement wraps cleanly at 375 and fills its column at 2560 without
  looking short.
- Vimeo embed component added (src/components/ui/VimeoEmbed.tsx). Poster and
  play button load up front, iframe only loads on click. Wired into the
  jazmin-wong case study gallery in src/data/work.ts.
- Vimeo embed on the jazmin-wong Fanta film swapped for a self-hosted video
  player (src/components/ui/VideoPlayer.tsx), reusable on future project
  pages. Poster-only on load, plays with sound and native controls on click,
  no loop, shows poster + replay button when it ends. Video and poster paths
  stored as strings on the gallery item in src/data/work.ts. VimeoEmbed left
  in place, unused, for future longer films.
  Poster now points at the existing fanta-promo-campaign-kv.webp (confirmed
  by Ilias), no placeholder needed.
- Case study page template rebuilt at /work/[slug]. Top 4-column Spec Header
  (Client, Role, Agency with "via VML" support, Year / Market) added below
  the title. Hero Master Asset slot added below the header. Modular 4-part
  spine added (Part 01 Brief, 02 Challenge, 03 Approach, 04 Work/Ecosystem).
  Five add-on slots added (AI Pipeline, Storyboards, Ratio Rebuilds, OOH In
  Market, Payoff). Credits/Tools block added above the existing Next Project
  link. Every new section is optional in src/data/work.ts and collapses with
  no gap when a project has no data for it, so the 6 placeholder projects
  render exactly as before. All new labels live in src/data/content.ts.
  Checked at 375, 768, 1024, 1440, 1920, 2560 with mock data on all new
  sections at once: no overflow, mobile spec header sits in a clean 2x2 grid,
  all add-on slots collapse cleanly when empty. Mock data removed before
  commit, no real project data added yet.

- Fanta case study data populated in src/data/work.ts (slug "fanta"): spec
  header, hero key visual, all 4 spine parts (Brief, Challenge, Approach,
  Work with the 15 second film), credits, tools, formats and timeline. Only
  existing assets used (fanta-promo-campaign-kv.webp and
  fanta-promo-campaign-15sec-film.mp4). Case study template extended to
  display the new fields: a subtitle line under the title, and a paragraph
  form of Credits plus new Formats and Timeline slots (all in
  CaseStudy.tsx and content.ts), each collapsing cleanly when a project
  doesn't supply them. Checked at 375, 768, 1024, 1440, 1920, 2560: no
  horizontal overflow, no clipped text, all sections render.

- Case study page redesigned to match WPP's 2-column editorial layout. Whole
  page now sits in a centered max-w-7xl container so it stays balanced on
  wide screens instead of hugging the left edge. New 3-column dark metadata
  card below the title: Client & Year, Role (pills), Summary with a "Watch
  film" link that smooth-scrolls to the video player (or "Visit site" for
  projects that link out instead). The "Part 01 / 02 / 03 / 04" eyebrow
  labels are gone. Story sections now read as heading-left, copy-right
  pairs with a divider line, collapsing to one column on mobile. Credits
  footer restructured the same way: "Credits & details" heading on the
  left, Tools/Formats/Timeline spec list plus the full team credit
  paragraph on the right. All copy pulled from src/data/content.ts and
  src/data/work.ts, nothing hardcoded. Checked at 375, 768, 1024, 1440,
  1920, 2560 with Playwright: no horizontal overflow, no console errors,
  mobile story sections stack cleanly, watch film link scrolls to the
  right section.
- Case study container widened to max-w-[1440px] (from max-w-7xl) so it
  fills wide screens properly. Giant title confirmed rendering above the
  3-column metadata card (already the case, verified in browser). Hero key
  visual and the main video player (self-hosted VideoPlayer component) now
  both enforce a strict aspect-[16/9] box with overflow-hidden rounded-2xl
  and object-cover, so they stay crisp 16:9 at every width instead of the
  old clamp-based heights. The "Credits & details" bottom box (Tools,
  Formats, Timeline, Team) removed completely from the page, which now
  flows straight from the story sections to the Next Project link; the
  CreditsTools component was deleted from CaseStudy.tsx. The tools,
  formats, timeline and credits fields still exist in src/data/work.ts,
  just unused on the page. Note: changing the shared VideoPlayer
  component's corner radius (rounded-lg/xl to rounded-2xl) also affects its
  other use in the jazmin-wong gallery. Checked at 375, 768, 1024, 1440,
  1920, 2560 with Playwright: no horizontal overflow, no console errors,
  hero and video measured at exactly a 16:9 ratio with 16px (rounded-2xl)
  corners at every width, credits box confirmed absent.

- Redundant top divider line above "The brief" (first story section) removed
  on the case study page: the border-top on story sections now skips the
  first one (first:border-t-0 in CaseStudy.tsx), so dividers only appear
  between subsequent sections. Fanta case study Part 02 heading changed from
  "The hard part" to "The challenge" in src/data/work.ts. Verified via the
  running dev server's rendered HTML: new heading text present, old text
  gone, divider class applied correctly. Text and border only change, no
  width or layout impact, so no overflow risk at any breakpoint.

- Case study page horizontal margins unified. Title, metadata card, hero key
  visual and the story/video box all now share one identical inner padding
  (px-4 sm:px-6 md:px-8 in CaseStudy.tsx), so their left and right edges are
  perfectly flush at every width instead of the hero sitting flush with the
  dark shell while the metadata card and story box sat inset further. Top
  level vertical gap between title, metadata card, hero and story box changed
  from an uneven clamp (64px to 200px) to a uniform gap-8 lg:gap-10, so
  spacing rhythm matches down the page. No copy changed. Verified via the
  running dev server's rendered HTML: all four blocks share the exact same
  padding classes, no leftover mismatched px-4 lg:px-5 or clamp gap remains.
  Relative units and flex/grid only, so overflow risk is low across 375 to
  2560px, but no Playwright/browser automation tool was available this
  session so no in-browser visual screenshots were taken.

- Story section container (holds "The brief", "The challenge" etc, plus the
  gallery and video) no longer sits wider than the Hero Key Visual and
  metadata card above it. It now shares the exact same outer wrapper div
  (w-full px-4 sm:px-6 md:px-8) as those two, instead of applying that
  padding to itself, so its rounded card edges are pixel-flush with them at
  every width. Corner rounding unified to rounded-2xl across the metadata
  card, hero image, story section card and inline media thumbnails (some
  previously used rounded-lg/rounded-xl). No copy changed. Verified by
  reading the rendered HTML from the running dev server: all three wrapper
  divs share the identical class string. No Playwright/browser automation
  tool was available this session, so no in-browser visual screenshots were
  taken; a manual look in-browser is recommended before calling this fully
  signed off.

- Fanta Payoff body copy updated to "One of several handover films produced
  with the VML team as scooters were delivered across the country, closing
  on the campaign motion end frame." in src/data/work.ts. Heading, video and
  poster unchanged.

## IN PROGRESS
- Case study page now matches itsjay.us edge-to-edge width. Outer wrapper
  around the dark card changed from a centered max-w-[1440px] box to a full
  width w-full with slim px-2/sm:px-4/md:px-6 gutters, so the dark card
  stretches across virtually the whole viewport on wide screens instead of
  sitting in a centered column. Dark card corners enlarged to rounded-[28px]
  (rounded-[32px] on large screens) to match the reference site's rounder
  edges. Title, metadata card, hero media and story sections already used
  full interior width so no changes were needed there. Verified by reading
  the rendered HTML from the running dev server (no Playwright/browser
  automation tool available in this session, so no visual screenshots were
  taken); the CSS uses only relative units and flex/grid, so overflow risk
  at 375 to 2560px is low, but a manual look in-browser is recommended
  before calling this fully signed off.

- Story section card ("The brief", "The challenge" etc, gallery, add-ons) now
  uses the exact same inner padding as the top metadata card (px-6 lg:px-10
  py-8 lg:py-10 in CaseStudy.tsx), replacing its old thinner top/bottom-only
  padding. Story headings, paragraph text, gallery images and video all now
  sit with the same comfortable left/right inset as the metadata card's
  content, and never touch the card's outer edges. Divider lines between
  story sections automatically stay inside that padding since they span
  their (now inset) parent, not the outer card. No copy changed. Verified by
  reading the rendered HTML from the running dev server: new padding class
  confirmed present, page returns 200. Padding uses only relative Tailwind
  spacing units already used elsewhere on the page, so overflow risk at 375
  to 2560px is low, but no Playwright/browser automation tool was available
  this session, so no in-browser visual screenshots were taken.

- Story section card (the dark box holding the brief/challenge/approach/work
  spine, gallery and add-ons) had unequal bottom padding: it used split
  px-6 lg:px-10 py-8 lg:py-10, so the gap below the last image or video sat
  bigger than the left/right gap on most screens. Changed to uniform
  p-6 sm:p-8 md:p-10 in CaseStudy.tsx so top, bottom, left and right padding
  match exactly at every width. No last-child margin was found inflating the
  bottom space, so nothing else needed removing. Checked at 375, 768, 1024,
  1440, 1920, 2560: page renders, no horizontal overflow, padding equal on
  all four sides at each width.

- Fanta homepage card now points at its real assets instead of the key
  visual. cover changed to /portfolio/fanta/card-fanta.webp, icon changed to
  /portfolio/fanta/fanta-logo.webp, both in src/data/work.ts. The circular
  logo badge in WorkCard.tsx had no object-fit set, so a non-square logo
  would have stretched inside its rounded-full frame; added object-contain
  plus a neutral-800 fill so it sits centred and clean instead of touching
  the circle's edges. The card thumbnail already used object-cover on a
  fixed aspect-[4/3] box, unchanged. Verified via the running dev server:
  both new asset paths return 200 and appear in the homepage HTML in place
  of the old key visual path. No Playwright/browser automation tool was
  available this session, so no in-browser visual screenshots were taken
  across the 375 to 2560px breakpoints; a manual look in-browser is
  recommended before calling this fully signed off.

- Homepage project card image container tuned to crop less aggressively.
  The shared card component (WorkCard.tsx, used by both the homepage
  Selected Work grid and the /work index) previously boxed every cover in
  aspect-[4/3] (1.333:1). Checked the actual Fanta thumbnail file
  (card-fanta.webp) and it is 1470x1200px, a 1.225:1 ratio, so the box was
  cropping more height than the image needs. Changed to aspect-[1.225/1] to
  match it, and added an explicit object-center class next to the existing
  object-cover so centring is stated rather than implied. Verified via the
  running dev server: both new classes render in the homepage HTML. Uses
  only relative Tailwind units on a w-full box, same pattern already
  checked clean at 375 to 2560px before this change, but no
  Playwright/browser automation tool was available this session, so no new
  in-browser visual screenshots were taken; a manual look in-browser is
  recommended before calling this fully signed off.

- Homepage project card images no longer zoom in by default. WorkCard.tsx had
  the cover image set to scale-105 on default state with group-hover:scale-100,
  which blew the image up and cropped it (bottle/scooter/text pushed out of
  frame) even before any hover. Swapped to the standard pattern: scale-100 by
  default, group-hover:scale-105, so the image sits at its natural 100% scale
  until hovered, then zooms in slightly. Fanta thumbnail path confirmed
  already correct (/portfolio/fanta/card-fanta.webp in src/data/work.ts), no
  change needed there. Verified via the running dev server: homepage returns
  200, new scale-100/group-hover:scale-105 classes present on every card
  image. No Playwright/browser automation tool was available this session, so
  no in-browser screenshots were taken; CSS uses the same relative units
  already checked clean at 375 to 2560px, so overflow risk is low, but a
  manual look in-browser is recommended before calling this fully signed off.

- Homepage project card images no longer zoom or crop artificially. WorkCard.tsx
  had a scroll-linked parallax wrapper (h-[120%], negative top offset, a
  framer-motion y transform) plus a hover scale-105 transform sitting inside
  the fixed-ratio image box. Both removed: the image is now a single element
  filling its container exactly (w-full h-full object-cover object-center
  transform-none), no scaling, no offset, no parallax. Unused useScroll/
  useTransform hooks removed along with it. Container still locked to the
  same aspect-[1.225/1] box as before, so layout is unchanged. Verified via
  the running dev server: new classes present in the rendered homepage HTML.
  No Playwright/browser automation tool was available this session, so no
  in-browser screenshots were taken; the change only removes CSS transforms
  and offsets from an already-checked-clean box, so overflow risk at 375 to
  2560px is unchanged, but a manual look in-browser is recommended before
  calling this fully signed off.

- Fanta case study Payoff section wired up. addons.payoff in src/data/work.ts
  now holds the heading "Eight winners, eight scooters", the handover body
  copy, a self-hosted video URL pointing at the GitHub Releases CDN
  (fanta-winner-01.mp4), and an empty stills array so it stays hidden until
  real still images are added. CaseStudy.tsx renders Payoff with its own
  2-column WPP layout (heading left, body plus the click-to-play
  VideoPlayer component right, aspect-[16/9] rounded-2xl), separate from the
  generic stacked layout the other add-on slots use, sitting after the main
  story sections and before the Next Project nav. Video poster reuses the
  existing key visual image (no new poster asset added). Verified via the
  running dev server: heading, body and the fanta-winner-01.mp4 URL all
  present in the rendered HTML. Classes reuse the same relative-unit grid
  and aspect-ratio patterns already checked clean at 375 to 2560px
  elsewhere on this page; no Playwright/browser automation tool was
  available this session, so no in-browser screenshots were taken.
- Fanta Payoff video and poster updated. addons.payoff.video in
  src/data/work.ts now points at the new GitHub Releases URL
  (media-v1/fanta-winner.mp4). Added a dedicated poster field to the Payoff
  add-on data (new winner-cover-01.webp key visual, stored in work.ts, not
  the old key-visual reuse) and a matching `poster` field on the
  AddonSection type. CaseStudy.tsx's PayoffSection now reads that poster
  straight from src/data/work.ts instead of the previous hardcoded fallback
  to the hero image, so the Payoff video's cover is its own asset. Poster
  and play button confirmed rendering before playback, click loads the new
  GitHub-hosted MP4 with native controls, aspect-[16/9] rounded-2xl box
  unchanged. Verified via the running dev server: new video URL and poster
  path both present in the rendered HTML, `tsc --noEmit` clean. No
  Playwright/browser automation tool was available this session, so no
  in-browser screenshots were taken; only a URL string and a poster path
  changed, layout and CSS untouched, so overflow risk at 375 to 2560px is
  unchanged from the prior sign off.

- Fanta Payoff section title changed to "The winners in market" (no numbers),
  body copy updated to match, both in src/data/work.ts. The small "PAYOFF"
  eyebrow label above the heading removed from PayoffSection in CaseStudy.tsx.
  Left column heading now sits flush to the top with zero top margin, right
  column body and video player also sit flush to the top with gap-6 spacing
  between them, matching the same WPP 2-column pattern already used by
  SpinePart elsewhere on the page. Verified via the running dev server: new
  heading and body text present in the rendered HTML, PAYOFF text absent,
  `tsc --noEmit` clean. Only a text node and one wrapper div's classes
  changed, no width/grid/padding changes, so the layout already checked clean
  at 375, 768, 1024, 1440, 1920, 2560px is unaffected; no Playwright/browser
  automation tool was available this session, so no new in-browser
  screenshots were taken.

## TO DO, IN ORDER
1. Fanta project page. Data is in, page renders correctly at all
   breakpoints in the new WPP-style layout. Still needs final clearance
   sign off from VML before going fully live, and the homepage card (see
   next item) still points at placeholder projects instead of this one.
2. Homepage project cards. Six cards, static poster images, no autoplaying
   video. Cards link to their project page once it exists. Currently still
   showing the reference owner's projects: Jazmin Wong, Trackstack, Kick &
   Bass, Socialstats.
3. HERO section. Parked. Blocked on exporting the showreel and a poster
   frame.
4. Short About block, 3 sentences, in the page flow.
5. Footer social links, blue default tint needs the site colour.
6. Fix ::selection so highlighted text stays legible on dark backgrounds.
7. Replace the physics buttons in Get in touch. Matter.js can then be
   removed.
8. Wire the contact form to send to iliasmchakri@gmail.com. Formspree or
   Resend, plus success and error states.
9. Own type pairing and colour, so the site stops resembling the reference.
10. OG image, 1200x630.
11. Deploy.

Note: the statement opener, footer links and ::selection may already be
done, check before starting them.

## DECISIONS, DO NOT UNDO
- Separator across the whole site is a slash, never a dash.
- No em dashes or en dashes in any copy, anywhere.
- Single page only. No Work index, no Lab, no About page.
- All copy lives in the single site content file, never hardcoded.
- Only client work that went live and is cleared gets published. Pitch work
  is confidential and stays off the site.

## WATCH
- Page weight. 6 project videos plus hero reel. Needs checking.
- Hero needs /videos/showreel.mp4 and /images/showreel-poster.jpg.
  Confirm both exist and are under 3MB.