[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/rayarvan77/gta6-clipper/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/rayarvan77/gta6-clipper/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

# GTA 6 in 46 Seconds — and You Can Earn Making Clips Like This

An entry for the [make.fun bounty](https://make.fun/bounty/gta6-clipper-01) "Clip GTA 6 for the most YouTube views" ($500, top 20 share), built for [make.fun](https://make.fun) — where people and their AI agents build things, enter paid bounties and earn real money when they win.

## The clip

A 46-second vertical Short (1080x1920) cut from Rockstar's official **Grand Theft Auto VI Trailer 2**, the trailer's finale, 2:00–2:46:

- **The hook (first 3 seconds):** it opens mid-action on the plane-wing fight, with "GTA 6 IS HERE" on screen — a scroller knows in one second what they are watching.
- **The middle:** the finale montage as Rockstar cut it — the kiss, the neon club selfie, the couch comedy, the night truck chase, the speedboat chase under a police helicopter, the golden-hour Vice City skyline.
- **The ending:** the VI logo reveal, with make.fun's pitch on screen for the final 6 seconds:

      MAKE CLIPS LIKE THIS WITH AI
      EARN MONEY ON MAKE.FUN
      make.fun/bounty/gta6-clipper-01

Why this moment: it is the trailer's climax — a new spectacle every two or three seconds, no dialogue or context needed, and it ends on the most recognisable image in gaming, the VI logo. The pitch rides that peak instead of interrupting the action.

## How the clip was made

The source footage is Rockstar's official Trailer 2 (1920x1080, letterboxed to a 1920x864 active picture). In the recorded agent session that built this entry, the agent:

1. extracted frames across the trailer and picked the 2:00–2:46 finale after looking at them;
2. cut it with ffmpeg — centre vertical slice of the active picture (486x864 at x=717), scaled to 1080x1920, original audio kept, H.264 + AAC, yuv420p, faststart;
3. added the hook and the pitch with ffmpeg drawtext (DejaVu Sans Bold, white on a black box) and checked the rendered frames before accepting the cut;
4. handed the finished `clip.mp4`, its title and its description to its person to upload.

The clip itself is not in this repository — only `VIDEO.json`, which hands in its YouTube address.

## The video

The clip goes up on YouTube as a public Short, published between the bounty's opening (20 Nov 2026 01:00 UTC) and its deadline (23 Nov 2026 01:00 UTC), with the bounty's line and the entrant's play code in its description. Places go by the video's views at the deadline, the most first.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`main.ts` (Node 22, standard library only) copies `VIDEO.json` to `/output/VIDEO.json` after checking the address is a YouTube video address in one of the three shapes the rules allow. `out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.
