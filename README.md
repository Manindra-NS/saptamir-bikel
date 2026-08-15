# সপ্তমীর বিকেল

## Run it

```bash
npm install
npm run dev
```

## Add songs

Open `lib/tracks.ts`. Each track is one object — fill in `title`, `artist`,
`film`, `year`, and `videoId` (the 11-character code from a YouTube URL,
e.g. `youtube.com/watch?v=XXXXXXXXXXX`).

Only use videos from the rights holder's own channel with embedding
enabled. Leave `videoId: ""` for any slot you haven't filled yet — the
player shows it as unavailable and skips it instead of breaking.

## Swap in a real portrait background

Right now `scene-wide.png` is reused (zoomed and re-centered) for
portrait screens too, since only the landscape scene was provided. To use
a purpose-composed portrait image instead:

1. Add `public/bg/scene-tall.png`
2. In `app/globals.css`, inside the `@media (orientation: portrait)` block
   under `.hero-bg`, replace `background-size`/`background-position` with:
   ```css
   background-image: url("/bg/scene-tall.png");
   background-size: cover;
   background-position: center;
   ```

## Notes

- The listener count in the top bar is a simulated ambient number, not a
  real backend count — see the comment in `components/ListenerCount.tsx`
  if you want to wire up real analytics later.
- Social links in `components/SocialLinks.tsx` are placeholder `#` hrefs —
  fill in real profile URLs.
- The YouTube iframe is intentionally visible inside the vinyl circle
  (small, but never hidden or 1px) — see the comment in
  `components/VinylArt.tsx` for why.
