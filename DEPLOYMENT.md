# Jekyll Portfolio Deployment Guide

This guide provides step-by-step instructions for deploying your Jekyll portfolio to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed locally
- Ruby and Bundler installed (for local development)

## Local Development Setup

### 1. Install Dependencies

```bash
# Install Bundler if not already installed
gem install bundler

# Install Jekyll and dependencies
bundle install
```

### 2. Run Local Development Server

```bash
# Start the Jekyll development server
bundle exec jekyll serve

# Or with live reload
bundle exec jekyll serve --livereload

# Or serve on all interfaces (for network access)
bundle exec jekyll serve --host 0.0.0.0
```

### 3. View Your Site

Open your browser to:
- Local: `http://localhost:4000`
- Network: `http://[your-ip]:4000` (if using --host 0.0.0.0)

## GitHub Pages Deployment

> **✨ This repository now includes automated GitHub Actions deployment!**
>
> The automated workflow provides several benefits:
> - 🚀 **Automatic deployment** on every push to main branch
> - ⚡ **Faster builds** with Ruby 3.1 and bundler cache
> - 🔒 **Consistent environment** with proper production settings
> - 🛠️ **No manual commands** needed - just push your code
> - 📦 **Proper artifact handling** with official GitHub Pages actions

Choose your preferred deployment method below:

### Method 1: Direct Repository Deployment

1. **Create/Update Repository**
   ```bash
   # If starting fresh
   git init
   git add .
   git commit -m "Initial Jekyll portfolio commit"
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   
   # If updating existing repository
   git add .
   git commit -m "Convert to Jekyll portfolio"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select "Deploy from a branch"
   - Select **main** branch and **/ (root)** folder
   - Click **Save**

3. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io`
   - GitHub will show the URL in the Pages settings

### Method 2: GitHub Actions Deployment (Recommended)

This repository includes a pre-configured GitHub Actions workflow for automated deployment. The workflow file is located at `.github/workflows/deploy.yml`.

**Automatic Setup:**
- The workflow is already configured and ready to use
- Triggers automatically on push to main/master branch
- No additional setup required - just enable GitHub Actions deployment

**Workflow Features:**
- Uses Ruby 3.1 with bundler cache for faster builds
- Builds Jekyll site with production environment settings
- Deploys using official GitHub Pages actions
- Includes proper permissions and concurrency settings

**To Enable:**
1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"**
3. Push to main branch - deployment will happen automatically!

**Workflow Configuration:**
```yaml
name: Deploy Jekyll to GitHub Pages

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Custom Domain Setup (Optional)

### 1. Add CNAME File

Create a `CNAME` file in the root directory:
```
yourdomain.com
```

### 2. Configure DNS

Add these DNS records with your domain provider:

**For apex domain (yourdomain.com):**
```
Type: A
Host: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME
Host: www
Value: yourusername.github.io
```

### 3. Enable HTTPS

- In GitHub Pages settings, check "Enforce HTTPS"
- Wait for SSL certificate provisioning (can take up to 24 hours)

## Configuration Updates

### Update Site URL

In `_config.yml`, update:
```yaml
url: "https://yourusername.github.io"  # or your custom domain
baseurl: ""  # leave empty for user pages
```

### Update Profile Data

Edit `_data/profile.yml` with your information:
- Personal details
- Skills and experience
- Social media links
- Resume file path

## Troubleshooting

### Common Issues

1. **Site not updating after push**
   - Check the Actions tab for build errors
   - Ensure GitHub Pages is enabled
   - Wait 1-2 minutes for propagation

2. **CSS/JS not loading**
   - Verify `baseurl` in `_config.yml`
   - Check file paths in `_layouts/default.html`

3. **Build failures**
   - Check `bundle exec jekyll build` locally
   - Review error messages in GitHub Actions

4. **Ruby version issues**
   ```bash
   # Check Ruby version
   ruby --version
   
   # Update Bundler
   gem update bundler
   
   # Clean and reinstall
   bundle clean --force
   bundle install
   ```

### Local Testing Commands

```bash
# Build site without serving
bundle exec jekyll build

# Build with verbose output
bundle exec jekyll build --verbose

# Clean generated files
bundle exec jekyll clean

# Check for configuration issues
bundle exec jekyll doctor
```

## Performance Optimization

### 1. Image Optimization
- Compress images before adding to repository
- Use appropriate image formats (WebP for modern browsers)
- Consider using a CDN for large assets

### 2. Jekyll Plugins
Add to `_config.yml`:
```yaml
plugins:
  - jekyll-sitemap      # SEO
  - jekyll-feed         # RSS feed
  - jekyll-compress-images  # Image compression
```

### 3. Caching
GitHub Pages automatically sets appropriate cache headers.

## Security Considerations

1. **Don't commit sensitive data**
   - No API keys or passwords in code
   - Use environment variables for sensitive configs

2. **Keep dependencies updated**
   ```bash
   bundle update
   ```

3. **Monitor for vulnerabilities**
   - GitHub will alert for security issues
   - Review and update dependencies regularly

## Maintenance

### Regular Updates

1. **Update dependencies monthly**
   ```bash
   bundle update
   git add Gemfile.lock
   git commit -m "Update dependencies"
   git push
   ```

2. **Monitor site performance**
   - Use Google PageSpeed Insights
   - Check Core Web Vitals
   - Monitor loading times

3. **Backup important data**
   - Keep local copies of important files
   - Consider automated backups of profile data

## Support Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll GitHub Pages gem](https://github.com/github/pages-gem)
- [Liquid Template Documentation](https://shopify.github.io/liquid/)

## Quick Reference Commands

```bash
# Development
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build

# Clean build files
bundle exec jekyll clean

# Update dependencies
bundle update

# Check site health
bundle exec jekyll doctor