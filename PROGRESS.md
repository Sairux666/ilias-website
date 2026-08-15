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

## IN PROGRESS
- Nothing. Session ended cleanly.
  (If the browser check showed something half done, replace this line with it.)

## TO DO, IN ORDER
1. Six project credit lines. Cards still show Jazmin Wong, Trackstack,
   Kick & Bass, Socialstats. Format: PROJECT NAME / Client / Category, Year
   then role credits. Credits line was clipping off the right edge, must
   wrap or fade, never hard cut.
2. Short About block, 3 sentences, in the page flow.
3. Physics buttons in Get in touch are the reference site owner's signature
   interaction. Replace with own motion or email at large scale. Matter.js
   can then be removed.
4. Wire the contact form to actually send to iliasmchakri@gmail.com.
   Formspree or Resend, plus success and error states.
5. Delete reference/lab.html. Must happen before deploy.
6. Add OG image, 1200x630, for link previews.
7. Own type pairing and colour, so the site stops resembling the reference
    structurally.
8. Deploy. Vercel or Netlify.

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