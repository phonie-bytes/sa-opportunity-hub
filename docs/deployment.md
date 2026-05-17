# Deployment Guide: GitHub Pages

GitHub Pages is a highly viable, zero-cost hosting solution for this tool because the application is a static site (Next.js Static Export).

## 1. Automatic CI/CD
The repository is pre-configured with a GitHub Action (`.github/workflows/ci-cd.yml`).
- **How it triggers:** Every time you `git push` to the `main` branch, the workflow starts automatically.
- **What it does:** It installs dependencies, runs unit tests, builds the static site, and deploys it to GitHub Pages.

## 2. One-Time Setup in GitHub
To enable the deployment, you must perform these steps in your GitHub repository settings:

1. Go to your repository on GitHub.
2. Click on **Settings** (top tab).
3. Select **Pages** from the left sidebar.
4. Under **Build and deployment > Source**, ensure **GitHub Actions** is selected from the dropdown (instead of "Deploy from a branch").
5. Your site will be live at `https://<your-username>.github.io/<your-repo-name>/` once the first workflow finishes.

## 3. Why GitHub Pages is "Zero Cost"
- **Hosting:** Free forever for public repositories.
- **Bandwidth:** Sufficient for thousands of monthly visitors.
- **Maintenance:** Zero. The site is served as static files, so there is no server to crash or maintain.

## 4. Troubleshooting CI/CD
You can monitor the status of your deployments by clicking the **Actions** tab at the top of your GitHub repository. If a build fails, the logs there will tell you exactly which step (e.g., Tests or Build) failed.
