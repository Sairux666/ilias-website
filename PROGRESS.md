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