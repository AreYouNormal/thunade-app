# THuNade App 🏆

ThuNFC (Thursday Night Football) stats tracker — season 2025/26.
Pun on FC Thun (Switzerland). 27 games baked in through 02/07.

## Publish it so anyone can use it (free, ~5 min)

1. Go to **vercel.com** and sign up (free — GitHub, Google or email)
2. Click **Add New… → Project**
3. Select the **Upload** / drag-and-drop option
4. Drag in this whole `thunade` folder (unzipped)
5. Leave all settings default → click **Deploy**
6. After ~1 min you get a URL like `thunade.vercel.app`

Share that link with the group. On a phone: open it, tap the Share icon →
**"Add to Home Screen"** — it installs like a real app with the mascot icon.

## Who can do what
- **Everyone** can view all stats, insights, rankings, form, etc.
- **Only the admin** (password `LegendAde93`) can log/edit games in the ➕ Log tab.

Each person's data lives in their own browser. For one shared central dataset,
you'd need a backend database (ask if you want to go that route later).

## Updating each week
Just log the game in the ➕ Log tab — on the live site it persists properly.
Then hit 💾 Backup now and then to keep a safety copy.

## Run locally
```
npm install
npm run dev
```
