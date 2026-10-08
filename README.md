# Love Sync ❤️

**Created & Developed by Thushanthan Srikumar**

Two Birth Dates. One Love Score.

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS v4
- Framer Motion
- Vercel-ready

## Algorithm
1. Take the 8 digits of each DOB in `YYYYMMDD` order.
2. First round: add corresponding positions (same position across both DOBs).
3. Every following round: add first + last, second + second-last, moving inward. If a middle digit remains, keep it.
4. Multi-digit sums such as `18` stay as `18`; they are not split.
5. Repeat until two digits remain. The two-digit result is the Love Score.

Example: `2003.12.05` + `2024.11.10` → `40272415` → `9169` → `187` → `88%`.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
Import this repository into Vercel, or connect the GitHub repository after pushing it.

> Replace `https://love-sync.example` in metadata/robots/sitemap with the real production domain before launch.

## Audio
The UI includes a sound toggle placeholder. Do not bundle copyrighted commercial songs without permission. Add an original or properly licensed audio file if you want background music.


## License
This project is released under the MIT License. See `LICENSE`.

Copyright © 2026 Thushanthan Srikumar.

After the project is actually deployed to production, the public footer may be updated to:
`Created, Developed & Deployed by Thushanthan Srikumar`
