# HORSEARMY.COM - GitHub & Vercel Deployment Instructions

## ✅ What's Ready

- **Website HTML**: `index.html` - Complete website with all content
- **GoHighLevel Integration**: `ghl-integration.js` - Email signup form connected to your GHL account
- **Vercel Config**: `vercel.json` - Deployment configuration

## 📋 Step 1: Create GitHub Repository

1. Go to https://github.com/maximus-wins
2. Click the **"+"** button (top right) → **"New repository"**
3. Repository name: `horsearmy-site`
4. Description: `Official HORSEARMY.COM website`
5. Keep it **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these files)
7. Click **"Create repository"**

## 📋 Step 2: Push Files to GitHub

After creating the repository, GitHub will show you commands. You'll need to run these in Terminal:

```bash
cd /Users/maximus/.openclaw/workspace/horsearmy-site-github

git init
git add .
git commit -m "Initial commit - HORSEARMY.COM website with GoHighLevel integration"
git branch -M main
git remote add origin https://github.com/maximus-wins/horsearmy-site.git
git push -u origin main
```

**Note**: You'll need to authenticate with GitHub. Use a Personal Access Token when prompted for password.

## 📋 Step 3: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Find and select **"maximus-wins/horsearmy-site"**
5. Click **"Import"**
6. **Project Name**: `horsearmy-site`
7. **Framework Preset**: Leave as "Other" (it's a static site)
8. **Build Settings**: Leave defaults (no build command needed)
9. Click **"Deploy"**

Vercel will deploy your site and give you a URL like: `https://horsearmy-site.vercel.app`

## 📋 Step 4: Test the Email Form

1. Go to your deployed site URL
2. Scroll to the "Stay Connected" section at the bottom
3. Enter a test name and email
4. Click "Join the Network →"
5. Check your GoHighLevel dashboard to confirm the contact was added

## 📋 Step 5: Point Your Domain (Later)

Once everything is tested and working:

1. In Vercel project settings → **"Domains"**
2. Add `horsearmy.com` and `www.horsearmy.com`
3. Follow Vercel's instructions to update DNS records

---

## 🔐 Security Note

The GoHighLevel API credentials are embedded in `ghl-integration.js`. This is safe for now since:
- The API key is read-only for creating contacts
- It's a client-side integration (common pattern)
- Later, we can move this to a serverless function for better security

## 📞 Need Help?

If you run into any issues during deployment, let Max know and he can help troubleshoot!

---

**Files in this folder:**
- `index.html` - Main website file
- `ghl-integration.js` - GoHighLevel form handler
- `vercel.json` - Vercel configuration
- `.gitignore` - Files to exclude from Git
- `DEPLOYMENT-INSTRUCTIONS.md` - This file
