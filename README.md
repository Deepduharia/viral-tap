# ViralTap - One Link. Every Platform.

## Premium Social Link Utility Platform

**ViralTap** is a React-based website offering essential tools for managing and optimizing social media links. Built with modern web technologies, it provides a clean, dark-themed interface with premium violet and electric-blue accents.

## Features

### Core Tools

- **Social Smart Link Helper** - Detect and normalize social media URLs across platforms (YouTube, Instagram, TikTok, Facebook, X/Twitter)
- **Social URL Cleaner** - Remove tracking parameters (UTM, fbclid, gclid, etc.) from URLs while preserving the core path
- **QR Code Generator** - Generate QR codes locally in the browser (no data transmitted to external servers)
- **Link Validator** - Validate URLs for HTTPS requirement and detect recognized social platforms
- **Platform Detector** - Identify the social platform from a given hostname, with protection against deceptive hostnames

### Informational Pages

- **About** - Brand information and platform philosophy
- **Contact** - Contact form and social links
- **Privacy Policy** - AdSense-compliant privacy policy
- **Terms of Service** - Terms and conditions
- **Disclaimer** - Legal disclaimer
- **Guides** - Usage guides and best practices

## Design

- **Color Scheme**: Dark navy/charcoal base with violet (#8b5cf6) and electric-blue accents
- **Typography**: Clean, readable sans-serif with strong contrast
- **Theme**: Consistent dark theme throughout with subtle styling
- **Responsive**: Fully responsive layout matching GitHub Pages base path

## Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment with the following settings:

1. **Base Path**: Set via `GITHUB_PAGES_BASE` environment variable in the repository settings
2. **Build**: `npm run build` generates a production build in `dist/`
3. **Deployment**: GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically deploys to the `gh-pages` branch

#### Manual Deployment

```bash
# Set the base path for your repository
export GITHUB_PAGES_BASE=/your-repo-name/

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist
```

### Required Repository Settings

1. Go to your repository Settings > Pages
2. Set **Source** to `Deploy from a branch` and `Branch: gh-pages`
3. Ensure the `GITHUB_PAGES_BASE` secret is set if needed

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain name
2. Configure DNS records to point to GitHub Pages
3. Update the `sitemap.xml` with your custom domain

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/viral-tap.git
cd viral-tap

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

This project is licensed under the MIT License.