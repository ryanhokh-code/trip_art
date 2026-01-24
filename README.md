<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/19CQ-Z_dWN3oyVD3kqKr1IMZr8tjkcLT-

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


** How to build for production: **
1. rm -rf node_modules package-lock.json
2. npm install
3. npm run build


- git rm -r --cached node_modules
- git commit -m "Remove node_modules and update .gitignore"
- git push origin main
