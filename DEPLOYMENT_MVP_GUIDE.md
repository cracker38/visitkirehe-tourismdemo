# Visit Kirehe Deployment MVP Guide (Beginner Friendly)

This document is an end-to-end “copy the checklist” guide to deploy and auto-deploy this project:
- Frontend: React/Vite
- Backend: Node/Express (with MySQL)
- Hosting: cPanel shared hosting (Passenger)
- Frontend URL: `https://visitkirehe.cypadi.com`
- API URL: `https://api.visitkirehe.cypadi.com` (backend API + uploads)

It includes the exact debugging playbook for the errors you hit:
- `CORS policy ... No 'Access-Control-Allow-Origin' ...`
- `HTTP 500 ... Powered by Phusion Passenger`
- broken images even though files exist on disk
- GitHub Actions SSH failures
- SSH step says `npm: command not found`

---

## 0) What “done” looks like (your success criteria)

After setup/deploy, these should work:

1. Frontend loads: `https://visitkirehe.cypadi.com`
2. API returns JSON (not an Apache error page): `https://api.visitkirehe.cypadi.com/api/health`
3. API returns data: `https://api.visitkirehe.cypadi.com/api/attractions`
4. Uploaded images load: `https://api.visitkirehe.cypadi.com/uploads/<some-file-from-server/uploads>`

> TIP: If (2) returns an Apache/Passenger 500 page, the CORS error in the browser is only a symptom. Fix Passenger/Node startup first.

---

## 1) Project architecture (how requests should flow)

When the frontend is deployed to `visitkirehe.cypadi.com`, it calls the backend on `api.visitkirehe.cypadi.com`.

So the browser will do:
- `GET https://visitkirehe.cypadi.com/...` (frontend)
- then `fetch('https://api.visitkirehe.cypadi.com/api/attractions')` (backend)

Because these are different origins, the backend must:
- start successfully, and
- send CORS headers like `Access-Control-Allow-Origin: https://visitkirehe.cypadi.com`.

Your `client/.env.production` should contain:
- `VITE_API_BASE_URL=https://api.visitkirehe.cypadi.com`

### 1.1 Backend expectations (so you can debug fast)

Your backend is expected to do these things:
- Load `.env` at startup (so DB credentials and `UPLOADS_DIR` are available).
- Enable CORS so the browser on `https://visitkirehe.cypadi.com` accepts responses from `https://api.visitkirehe.cypadi.com`.
- Serve uploaded files at `https://api.visitkirehe.cypadi.com/uploads/<filename>` using `UPLOADS_DIR`.
- Provide health endpoints: `/api/health` and `/api/health/db` (DB check).

> TIP: When you see browser CORS errors, check `/api/health` first. If it is an Apache/Passenger 500 page, your Express app did not start, so CORS headers will not be present.

---

## 2) Hosting directories you should use (your required paths)

Use these paths as your mental model:
- Project root on cPanel: `/home/cypadico930/visitkirehe/`
- Frontend static files (built output): `/home/cypadico930/public_html/visitkirehe.cypadi.com/`
- Backend application root: `/home/cypadico930/visitkirehe/server/`
- Backend uploads folder (files are saved here): `/home/cypadico930/visitkirehe/server/uploads/`
- Backend Passenger Node app “Application root”: `visitkirehe/server`

> IMPORTANT: Your backend “source code” directory is not the same as the frontend “document root”.

---

## 3) Backend prerequisites (MySQL + .env + uploads)

### 3.1 MySQL database already imported

You said the database was created and imported using `visitkirehe.sql`.

You must confirm the backend can connect using the credentials from your server `.env`.

### 3.2 Create/update backend `.env` correctly on the server

File location: `/home/cypadico930/visitkirehe/server/.env`

Content format example (replace values with your real credentials; do NOT include quotes):
```bash
DB_HOST=localhost
DB_NAME=cypadico930_visitkirehe
DB_USER=cypadico930_visitkirehe
DB_PASSWORD=YOUR_PASSWORD_HERE
NODE_ENV=production
UPLOADS_DIR=/home/cypadico930/visitkirehe/server/uploads
```

> TIP: Make sure there are NO accidental spaces or tabs at the beginning/end of lines.

### 3.3 Uploads directory must be readable by Node/Passenger

Typical working permissions (ask your host if they differ):
```bash
uploads folder: 755
files inside uploads: 644
```

If permissions are wrong, images may fail (500 or permission denied).

---

## 4) Frontend prerequisites (API base URL)

File location on your local machine: `client/.env.production`

It should contain:
```bash
VITE_API_BASE_URL=https://api.visitkirehe.cypadi.com
```

After changing it, you MUST rebuild the frontend:
```bash
cd client
npm install
npm run build
```

Then upload the contents of:
- `client/dist/`

into:
- `/home/cypadico930/public_html/visitkirehe.cypadi.com/`

> TIP: Always upload only the built `dist` to `public_html/...`. Do not upload `node_modules` from your computer.

---

## 5) Deploy (Manual MVP method, no auto-deploy yet)

Use this when you first get the project working.

### 5.1 Upload code (no node_modules)

1. Upload the project source into:
`/home/cypadico930/visitkirehe/`
2. Ensure these exist on the server: `/home/cypadico930/visitkirehe/package.json`, `/home/cypadico930/visitkirehe/client/...` (source code), `/home/cypadico930/visitkirehe/server/...`

> IMPORTANT: Do not upload `node_modules/`. You will install on the server (via cPanel Node.js app manager or SSH).

### 5.2 Configure Passenger Node.js App in cPanel

In cPanel:
- Find “Setup Node.js App” / “Node.js App” / “Application Manager”

Set:
- Application root: `visitkirehe/server`
- Application startup file: `index.js`
- Application mode: `Production`
- Environment variables: set DB creds, uploads dir, NODE_ENV, etc.

Then:
- run “Run NPM Install” (important) if available
- restart the app

If Passenger fails to start, do NOT continue—your frontend will show CORS errors later.

### 5.3 Verify backend startup before frontend testing

From a browser or curl:
- `https://api.visitkirehe.cypadi.com/api/health`

You want JSON (example idea):
- `{"ok":true}`

If you get:
- `Apache ... Phusion Passenger ... Application could not be started`

Then backend startup failed. Go to the “Passenger 500” troubleshooting section.

### 5.4 Build and upload frontend dist

Local:
- `npm run build` inside `client`

Upload:
- `client/dist/*` → `/home/cypadico930/public_html/visitkirehe.cypadi.com/`

---

## 6) Auto-deploy MVP using GitHub Actions (SSH + rebuild + restart)

The goal: whenever you push to GitHub, GitHub Actions updates:
1. frontend files in `public_html/visitkirehe.cypadi.com/`
2. backend source in `/home/cypadico930/visitkirehe/server/`
3. restarts the Node app (Passenger)

### 6.1 cPanel SSH access and deploy key (critical)

1. Enable SSH access in cPanel.
2. In your server SSH session, create a CI key WITHOUT passphrase:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy -N ""
```
3. Authorize the public key by importing `~/.ssh/github_actions_deploy.pub` in cPanel “Manage SSH Keys”.

> TIP: Using a key without passphrase avoids GitHub Actions “unable to authenticate / passphrase protected” issues.

### 6.2 Add GitHub secrets

In GitHub repo:
- Settings → Secrets and variables → Actions → New repository secret

Add:
- `CPANEL_HOST` = your SSH host (example: `app.sharedlord.com`)
- `CPANEL_USER` = `cypadico930`
- `CPANEL_PORT` = `22`
- `CPANEL_SSH_KEY` = the PRIVATE key content from `/home/cypadico930/.ssh/github_actions_deploy` (not the `.pub`, not the fingerprint)

Do NOT paste the `.pub` file into `CPANEL_SSH_KEY`.

### 6.3 Create `.github/workflows/deploy.yml`

Create this file path locally:
- `./.github/workflows/deploy.yml`

Workflow responsibilities (beginner-friendly version):
- Build frontend: `client npm install + npm run build`
- Upload frontend dist to `/home/cypadico930/public_html/visitkirehe.cypadi.com/`
- Upload backend source to `/home/cypadico930/visitkirehe/`, but exclude `server/uploads/*` and `server/node_modules/*` so you don’t delete images or wipe installed dependencies
- Restart backend using the Passenger restart mechanism, usually `touch tmp/restart.txt` inside the server app directory

> TIP: Avoid “git pull on the server” for beginners. Your server already contains files (uploads), and `git checkout` can fail with “untracked working tree files would be overwritten”. SCP upload is safer and deterministic.

Your repo already contains an older workflow; update it so it matches your latest working approach.

---

## 7) Verification checklist (after every deploy)

### 7.1 Confirm the frontend actually changed

Do a visible test:
- change some hero text in `client/src/components/home/Hero.jsx`
- push to GitHub

Then open:
- `https://visitkirehe.cypadi.com`

Hard refresh:
- Ctrl + F5

### 7.2 Confirm the backend is responding (must return JSON)

Open:
- `https://api.visitkirehe.cypadi.com/api/health`

If you see Apache Passenger 500, go to “Passenger 500” section.

### 7.3 Confirm database data appears (optional but good)

If `/api/attractions` returns empty:
- check DB connection and DB_NAME in `.env`

---

## 8) Troubleshooting playbook (high priority: fix root cause, not CORS)

### 8.1 CORS errors in browser (but backend is failing)

Typical browser error:
- `blocked by CORS policy: No 'Access-Control-Allow-Origin' header`

What this usually means:
- the browser did not receive your Express response
- it received an Apache error page (Passenger 500)
- Express never ran CORS middleware, so the CORS header is missing

How to confirm in 30 seconds:

1. Run in cPanel terminal:
```bash
curl -i https://api.visitkirehe.cypadi.com/api/health
```
2. If you see:
`server: Apache`, `Phusion Passenger`, and `Internal Server Error`

Then CORS is not the real problem.

Go to “Passenger 500” below.

### 8.2 Passenger 500 / “Web application could not be started”

You will see an Error ID like:
- `Error ID: e1535aa2`

What to do:

1. Find the Passenger log entries for that Error ID.
Try one of these locations (depends on host): cPanel “Errors” UI (if available), `~/logs`, or Apache error logs (often under `/var/log/...` but cPanel differs).

2. Search for the Error ID in your cPanel logs.
Example idea (your host may restrict search; use “Errors” UI if needed):
```bash
grep -R "e1535aa2" ~/logs 2>/dev/null
```

3. If logs mention DB connection, you must fix `.env`.
If logs mention missing files/modules, you must ensure backend dependencies are installed.

### 8.3 SSH step says `npm: command not found`

This happens when GitHub Actions (or your SSH session) doesn’t have the correct Node environment in PATH.

Common fix:
1. Activate the correct cPanel nodevenv before running npm.

From your server SSH (you already checked your nodevenv), you have:
- `/home/cypadico930/nodevenv/visitkirehe/server`

So the correct activate script is usually:
- `/home/cypadico930/nodevenv/visitkirehe/server/bin/activate`

Manual test:
```bash
source /home/cypadico930/nodevenv/visitkirehe/server/bin/activate
npm -v
```

If `npm -v` works, your workflow should also source the same path before running installs.

> TIP: If your workflow skips npm install, the app can still run if dependencies already exist on server, but if you update backend code or dependencies, you must install again.

### 8.4 Git errors on server (“destination path already exists” / “untracked files would be overwritten”)

This happened because the server folder already contains:
- uploads files
- other untracked files

When `git checkout` or `git pull` tries to overwrite, Git blocks.

Beginner-safe fix:
- Do not run `git clone/pull` on the server in CI.
- Instead upload backend source using SCP and exclude `server/uploads/*` and `server/node_modules/*`.

### 8.5 Broken images (files exist, but URLs show broken)

There are two separate causes:

Cause A: Frontend requests images from the wrong domain.
- Example: frontend HTML uses `src="/uploads/filename.jpg"`
- Browser then loads `https://visitkirehe.cypadi.com/uploads/...`
- But uploads are served by API server: `https://api.visitkirehe.cypadi.com/uploads/...`

Fix:
- ensure the frontend converts `/uploads/...` into `https://api.visitkirehe.cypadi.com/uploads/...`
- your project uses a helper approach (media URL resolver)

Cause B: Node app cannot read the uploads files or doesn’t serve them correctly.
- Then direct browser/curl to:
`https://api.visitkirehe.cypadi.com/uploads/<file>`; will show 500 or 403.

Fix:
- confirm `UPLOADS_DIR` in server `.env`
- confirm permissions on `server/uploads`

### 8.6 DB credentials wrong (API returns errors or empty lists)

You requested this approach (it’s a good practice).

From cPanel terminal:
```bash
mysql -h localhost -u cypadico930_visitkirehe -p
```

Then:
```sql
USE cypadico930_visitkirehe;
SHOW TABLES;
SELECT COUNT(*) FROM attractions;
```

If these fail, the issue is DB credentials.
If they succeed but the API still fails, the API `.env` may be wrong or not being loaded by Passenger.

> TIP: Always validate the DB via mysql CLI before assuming Node code is broken.

---

## 9) Examples you can reuse (copy/paste)

### Example 1: Confirm API returns JSON
```bash
curl -i https://api.visitkirehe.cypadi.com/api/health
```

Expected:
- status `200`
- content-type JSON

### Example 2: Confirm uploads file returns image
```bash
curl -I https://api.visitkirehe.cypadi.com/uploads/1773620834998-WhatsApp-Image-2026-03-12-at-5.01.32-PM97.jpeg
```

Expected:
- status `200`
- content-type image/jpeg (or similar)

### Example 3: Check DB connectivity quickly
```bash
mysql -h localhost -u cypadico930_visitkirehe -p -e "USE cypadico930_visitkirehe; SELECT 1;"
```

---

## 10) “Never skip these” tips (most important)

> TIP 1: When you see CORS errors, always verify the API response using `curl -i`. If it’s Apache/Passenger 500, CORS is not the root cause.

> TIP 2: If Passenger says “application could not be started”, open Passenger logs using the Error ID. Fix startup first.

> TIP 3: In CI (GitHub Actions), prefer uploading files via SCP over running git operations on the server.

> TIP 4: Never upload `node_modules` from your computer. Always install on server (or exclude node_modules so you preserve them).

> TIP 5: For API/upload URLs, always test both: `/api/health` (backend logic) and `/uploads/<file>` (static file serving + permissions)

---

## 11) Where to look in this repo (so you don’t get lost)

Important files you should remember:
- `client/.env.production` (sets `VITE_API_BASE_URL`)
- `server/.env` (on the server) (sets DB credentials + `UPLOADS_DIR`)
- `.github/workflows/deploy.yml` (your auto-deploy logic)
- `CPANEL_SETUP.md` (high-level cPanel options and secrets overview)

