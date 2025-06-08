# GitHub Actions Deployment Setup

This repository has been configured with automated GitHub Actions deployment for Jekyll to GitHub Pages.

## What's Included

### 1. Workflow File
- **Location**: `.github/workflows/deploy.yml`
- **Trigger**: Automatic deployment on push to main/master branch
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

### Step 2: Push to Main Branch
Once you push code to the main branch, the workflow will:
1. Automatically checkout your code
2. Setup Ruby 3.1 environment with bundler cache
3. Configure GitHub Pages settings
4. Build Jekyll site with production environment
5. Deploy to GitHub Pages automatically

### Step 3: Access Your Site
Your site will be available at: `https://googlesky.github.io/landing-page`

## Workflow Benefits

✅ **Automatic Deployment**: No manual commands needed
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
3. Push to main branch to trigger first deployment
4. Your Jekyll portfolio will be live automatically!

## Troubleshooting

If deployment fails:
1. Check the **Actions** tab for error details
2. Ensure GitHub Pages is enabled with "GitHub Actions" source
3. Verify all files are committed and pushed
4. Check Jekyll configuration with `bundle exec jekyll doctor` locally

---

**Workflow Status**: ✅ Ready for deployment
**Last Updated**: $(date)