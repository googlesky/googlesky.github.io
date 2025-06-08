# GitHub Actions Deployment Setup

This repository has been configured with automated GitHub Actions deployment for Jekyll to GitHub Pages.

## What's Included

### 1. Workflow File
- **Location**: `.github/workflows/deploy.yml`
- **Trigger**: Automatic deployment on push to gh-pages branch
- **Features**: Ruby 3.1, bundler cache, production build, official GitHub Pages actions

### 2. Updated Documentation
- **README.md**: Updated with GitHub Actions deployment instructions
- **DEPLOYMENT.md**: Added comprehensive GitHub Actions deployment guide
- **_config.yml**: Updated with proper GitHub Pages URL

## Enabling GitHub Actions Deployment

### Step 1: Repository Settings
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Save the settings

### Step 2: Use gh-pages Branch Workflow
The new deployment workflow uses the `gh-pages` branch for controlled deployments:

**Development Process:**
```bash
# Work on main branch (no deployment)
git add .
git commit -m "Update portfolio content"
git push origin main

# Deploy when ready
git checkout gh-pages
git merge main
git push origin gh-pages  # This triggers deployment
```

**What happens on gh-pages push:**
1. Automatically checkout your code
2. Setup Ruby 3.1 environment with bundler cache
3. Configure GitHub Pages settings
4. Build Jekyll site with production environment
5. Deploy to GitHub Pages automatically

### Step 3: Access Your Site
Your site will be available at: `https://googlesky.github.io/landing-page`

## Workflow Benefits

✅ **Manual Control**: Deployment only happens when you deliberately merge to `gh-pages`
✅ **Clean Main Branch**: No automatic commits or changes to your main development branch
✅ **Controlled Releases**: You decide exactly when to deploy by merging to `gh-pages`
✅ **Separate Concerns**: Development happens on main/feature branches, deployment on `gh-pages`
✅ **Faster Builds**: Ruby 3.1 with bundler cache
✅ **Consistent Environment**: Production settings applied
✅ **Error Handling**: Build failures are reported in Actions tab
✅ **Proper Permissions**: Configured for GitHub Pages deployment

## Monitoring Deployments

- **Actions Tab**: View deployment progress and logs
- **Build Status**: Green checkmark indicates successful deployment
- **Error Logs**: Detailed error information if builds fail

## Next Steps

1. Push this repository to GitHub
2. Enable GitHub Actions deployment in repository settings
3. Create and push to `gh-pages` branch to trigger first deployment:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```
4. Your Jekyll portfolio will be live!
5. Use the new workflow for future deployments:
   - Develop on `main` branch
   - Merge to `gh-pages` when ready to deploy

## Troubleshooting

If deployment fails:
1. Check the **Actions** tab for error details
2. Ensure GitHub Pages is enabled with "GitHub Actions" source
3. Verify all files are committed and pushed
4. Check Jekyll configuration with `bundle exec jekyll doctor` locally

---

**Workflow Status**: ✅ Ready for deployment
**Last Updated**: $(date)