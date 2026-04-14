# Trikkefestivalen.no

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
It stores the files necessary to run the website for [Trikkefestivalen.no](https://trikkefestivalen.no), a website for a music festival in Bergen, Norway.
It is hosted for the first time in September 6, 2025.

## Getting Started

Install any necessary packages from `package.json` using

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Running on our Raspberry Pi server, we encountered the following Turbopack error, as described in [this Next.js discussion](https://github.com/vercel/next.js/discussions/75665). Running

```bash
npx run dev
```

was a succesful workaround.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run linting locally:

```bash
npm run lint
```

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Content Updates

Artist and program data is stored in `src/data/artists.json`.

Each artist record owns its own `performances` array, which keeps biographies, image mapping, and schedule data together in one place.

Program table transformation logic lives in `src/utils/artistData.util.js` rather than inside page components.

When updating artist content:

- keep `image` aligned with the matching file in `public/artistInfo`
- add or edit entries in `performances` instead of updating hardcoded table markup
- treat the repository JSON as the source of truth rather than Google Sheets

## Testing

Run unit tests locally with `npm run test`.

Run the CI-mode unit test command with `npm run test:ci`.

The current unit tests cover the pure artist/program utility functions in `src/utils/artistData.util.js`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Figma design specification:
<https://www.figma.com/design/dgjE4RtQjacuq7Q7Y9cc0L/trikkefestivalen?node-id=0-1&t=VVy0jyqUWDCf8b6y-1>

## LICENSE & REUSE

- The code for Trikkefestivalen.no is licensed under an open MIT license
- The code for the graphical assets are licensed under an open CC-BY 4.0 license
