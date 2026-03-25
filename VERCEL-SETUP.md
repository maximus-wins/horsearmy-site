# Vercel Environment Variables Setup

## Required Environment Variables

The GoHighLevel integration needs two environment variables to work:

1. `GHL_API_KEY` - Your GoHighLevel API key
2. `GHL_LOCATION_ID` - Your GoHighLevel Location ID (currently: `7btYBBgZ5wdhJGIBYN4n`)

## How to Add Environment Variables in Vercel

1. Go to https://vercel.com
2. Open your **horsearmy-site** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Add each variable:
   - **Key**: `GHL_API_KEY`
   - **Value**: [Your new GoHighLevel API key from the dashboard]
   - **Environments**: Check all three (Production, Preview, Development)
   - Click **Save**
6. Repeat for:
   - **Key**: `GHL_LOCATION_ID`
   - **Value**: `7btYBBgZ5wdhJGIBYN4n`
   - **Environments**: Check all three
   - Click **Save**
7. **Redeploy** the site (Deployments tab → click the three dots → "Redeploy")

## Getting a New GoHighLevel API Key

1. Log into GoHighLevel
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it "HORSEARMY.COM Website"
5. Copy the key and paste it into Vercel as described above

## Security

- ✅ API keys are now stored securely in Vercel's environment variables
- ✅ They are NOT in the code or GitHub repository
- ✅ They are encrypted and only accessible server-side

---

After setting up the environment variables and redeploying, test the email form to confirm contacts are being created in GoHighLevel.
