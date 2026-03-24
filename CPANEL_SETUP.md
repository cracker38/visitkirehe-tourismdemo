# cPanel Setup for Visit Kirehe

## Same-Origin Setup (No CORS)

The app serves both frontend and API from **one Node.js app**. Follow these steps in cPanel:

### 1. Point the main domain to the Node app

- Go to **Setup Node.js App** (or **Application Manager**)
- Create or edit your app
- Set **Application root** to: `visitkirehe/server`
- Set **Application URL** to: `https://visitkirehe.cypadi.com` (main domain)
- Save and restart

### 2. GitHub Secrets (Settings → Secrets and variables → Actions)

Add these so the deploy can create `.env` on the server:

| Secret       | Value                         |
|-------------|--------------------------------|
| `DB_HOST`   | `localhost`                    |
| `DB_USER`   | `cypadico930`                  |
| `DB_PASSWORD` | your MySQL password         |
| `DB_NAME`   | `cypadico930_visitkirehe`      |

### 3. Subdomain `api.visitkirehe.cypadi.com`

- If the main domain serves the Node app, you can remove or redirect this subdomain
- Or keep it as an alias: both `visitkirehe.cypadi.com` and `api.visitkirehe.cypadi.com` can point to the same Node app

### 4. After deploy

- Push to `main` to trigger deploy
- Visit `https://visitkirehe.cypadi.com` – the site and API should load from the same origin
- Test: `https://visitkirehe.cypadi.com/api/health` should return `{"ok":true}`
