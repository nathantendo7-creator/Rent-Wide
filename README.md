<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0eb8ed94-a833-4ef5-8664-3611f5bb9c17

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment to Render

This project is configured as a Monorepo containing both a Vite Frontend and a Node/Express/Prisma Backend. It includes a `render.yaml` Blueprint to fully automate deployment.

1. **Push to GitHub:** Commit all files and push this repository to your GitHub account.
2. **Connect to Render:** Go to your [Render Dashboard](https://dashboard.render.com/) and create a new **Blueprint**.
3. **Select Repository:** Connect your GitHub account and select this repository.
4. **Deploy:** Render will automatically read `render.yaml` and provision:
   - A free PostgreSQL database (`rentwide-db`)
   - The Node.js Backend Service (`rentwide-backend`)
   - The Static Site Frontend (`rentwide-frontend`)
5. **Environment Variables:**
   - Render will inject the `DATABASE_URL` into the backend.
   - Render will inject the backend's URL (`VITE_API_URL`) into the frontend's build process.
   - If you need `GEMINI_API_KEY`, you can manually add it to the frontend settings via the Render dashboard.

That's it! Render will handle the build processes and database migrations automatically.
