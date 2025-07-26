# Pudit Portfolio

A personal portfolio website built with React.

## 🚀 Auto-Deployment

This project is configured with GitHub Actions for automatic deployment to GitHub Pages. Every time you push changes to the `main` or `master` branch, the site will automatically:

1. Build the React application
2. Deploy to GitHub Pages

## 📦 Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run deploy` - Manually deploy to GitHub Pages
- `npm test` - Launches the test runner

## 📁 Project Structure

- `src/` - React source code
- `public/` - Static assets
- `.github/workflows/` - GitHub Actions configuration
- `build/` - Production build output (generated)

## 🔧 Deployment

The deployment is handled automatically by GitHub Actions. The workflow:
- Triggers on pushes to main/master branch
- Installs Node.js dependencies
- Builds the React application
- Deploys to GitHub Pages using the `gh-pages` package

No manual intervention required! 🎉 