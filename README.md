Steps to deploy:

1. Create the files above in a new folder locally
2. Run `npm install` once to generate package-lock.json
3. Push to a new GitHub repo
4. Go to vercel.com, import the repo
5. During import, Vercel will auto-detect it as a Next.js project
6. Add your two environment variables (SITE_PASSWORD and AUTH_SECRET) in the Vercel project settings before or right after deploying
7. Deploy -> done