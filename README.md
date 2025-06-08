# Jekyll Portfolio - Lê Hiếu

A professional portfolio website built with Jekyll, featuring a Linux Terminal interface design. This portfolio showcases DevOps/SRE expertise and is optimized for GitHub Pages deployment.

## Features

- 🖥️ **Linux Terminal Interface**: Authentic terminal-style design with interactive commands
- 📱 **Responsive Design**: Mobile-friendly layout that works on all devices
- ⚡ **Fast Loading**: Optimized for performance with Jekyll static site generation
- 🔍 **SEO Optimized**: Proper meta tags and structured data
- 🎨 **Modern Styling**: Clean, professional appearance with terminal aesthetics
- 🤖 **Interactive Terminal**: Real terminal commands for exploring the portfolio

## Technology Stack

- **Jekyll 4.3.2**: Static site generator
- **GitHub Pages**: Hosting and deployment
- **Liquid Templating**: Dynamic content generation
- **YAML Data Files**: Structured content management
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript ES6**: Interactive terminal functionality

## Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   # Install Ruby and Bundler first
   bundle install
   ```

2. **Run Development Server**
   ```bash
   bundle exec jekyll serve
   ```

3. **View the Site**
   Open `http://localhost:4000` in your browser

### GitHub Pages Deployment

1. **Fork/Clone this repository**
2. **Enable GitHub Pages** in repository settings
3. **Configure the source** to deploy from the main branch
4. **Update `_config.yml`** with your GitHub Pages URL

## Configuration

### Site Configuration

Edit `_config.yml` to customize:

```yaml
title: "Your Name - Your Title"
description: "Your professional description"
url: "https://yourusername.github.io"
baseurl: ""
```

### Profile Data

All profile information is stored in `_data/profile.yml`:

- **Personal Information**: Name, title, contact details
- **Skills**: Technical skills organized by category
- **Experience**: Professional work history
- **Achievements**: Certifications and accomplishments
- **Projects**: Notable projects and contributions
- **Social Links**: Professional social media profiles

### Customization

1. **Update Profile Data**: Edit `_data/profile.yml` with your information
2. **Customize Styling**: Modify `style.css` for visual changes
3. **Add Features**: Extend `script.js` for additional terminal commands
4. **Update Resume**: Replace the resume file referenced in the profile data

## File Structure

```
├── _config.yml          # Jekyll configuration
├── _data/
│   └── profile.yml      # Profile data
├── _includes/
│   ├── achievements.html # Achievements section
│   ├── experience.html   # Experience section
│   └── terminal.html     # Main terminal interface
├── _layouts/
│   └── default.html     # Main layout template
├── _site/               # Generated site (ignored)
├── index.html           # Homepage
├── script.js            # Interactive terminal
├── style.css            # Styling
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```

## Terminal Commands

The interactive terminal supports these commands:

- `help` - Show available commands
- `about` - Display profile information
- `skills` - Show technical skills
- `experience` - Display work experience
- `achievements` - Show achievements & certifications
- `projects` - Show project portfolio
- `contact` - Get contact information
- `social` - Show social media links
- `resume` - Download resume
- `hire` - Why you should hire me
- `clear` - Clear terminal screen
- `whoami` - Display current user
- `pwd` - Print working directory
- `ls` - List directory contents
- `date` - Show current date and time
- `uptime` - Show system uptime
- `neofetch` - Display system information
- `cat [file]` - Display file contents
- `echo [text]` - Display text

## GitHub Pages Setup

1. **Repository Settings**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)

2. **Custom Domain** (optional):
   - Add CNAME file with your domain
   - Configure DNS settings

3. **SSL/HTTPS**:
   - Automatically enabled for github.io domains
   - Configure SSL for custom domains

## Performance Optimizations

- **Lazy Loading**: Animations load when elements come into view
- **Minified Assets**: CSS and JS are optimized for production
- **Image Optimization**: Properly sized and compressed images
- **Caching**: Browser caching headers for static assets

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: HIEULP@1DEVOPS.IO
- **Phone**: (084) 975-669-775
- **LinkedIn**: [linkedin.com/in/googlesky](https://linkedin.com/in/googlesky)
- **GitHub**: [github.com/googlesky](https://github.com/googlesky)

---

**Built with ❤️ using Jekyll and GitHub Pages**