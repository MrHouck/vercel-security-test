Steps to clone and deploy:

1. Create the files above in a new folder locally
2. Run `npm install` once to generate package-lock.json
3. Push to a new GitHub repo
4. Go to vercel.com, import the repo
5. During import, Vercel will auto-detect it as a Next.js project
6. Add your two environment variables (SITE_PASSWORD and AUTH_SECRET) in the Vercel project settings before or right after deploying
7. Deploy -> done

===
Drag and drop solution:

1. Copy the auth/ folder into the root of your project.
2. Set your password and secret in Vercel under Project\Settings\Environment Variables:
SITE_PASSWORD — the password users will type
AUTH_SECRET — a long random string used as the cookie value (generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)


3. Create the following three re-export files so Next.js can find the routes:

`pages/login.js`
`pages/api/auth.js`
`pages/api/logout.js`

4. Create proxy.js at the root of your project. It imports authProxy from auth/proxy.js, exports it as middleware, and exports a config object with the route matcher.
5. Redeploy. All routes except /login, /api/auth, and /api/logout will now redirect unauthenticated visitors to the login page, unless other public paths are added in `auth/config.js`

# auth/config.js

The only file you touch. Everything else in `auth/` reads from this automatically — don't edit anything else unless you know what you're doing.

---

## Options

### `loginPath`
Where unauthenticated users get sent. Has to match your actual login page route.
```js
loginPath: '/login' // default
```

### `logoutRedirect`
Where users land after logging out.
```js
logoutRedirect: '/login' // default
```

### `cookieName`
Name of the auth cookie. Only change this if it's colliding with something else in your project.
```js
cookieName: 'auth' // default
```

### `publicPaths`
Routes that skip the auth gate completely. The login page and auth API routes are always public no matter what — this is just for anything extra you need exposed.
```js
publicPaths: [] // default

// example
publicPaths: ['/about', '/api/public', '/preview']
```
Any route that *starts with* one of these strings gets let through.

---

## Always public (hardcoded)

These are never gated regardless of what's in config:

- Whatever you set as `loginPath`
- `/api/auth`
- `/api/logout`

---

## Environment variables

Set these in Vercel under **Project → Settings → Environment Variables**. These aren't in `config.js` but the module won't work without them.

| Variable | Description |
|---|---|
| `SITE_PASSWORD` | The password users type to get in |
| `AUTH_SECRET` | Random string used as the cookie value — not the password itself |

Generate a good `AUTH_SECRET` with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```