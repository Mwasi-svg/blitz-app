# Blitz Website - Refactored Structure

This project has been refactored from a monolithic HTML file into a maintainable, component-based structure.

## File Structure

```
milima-tech/
├── index.html              # Main entry point (76 lines)
├── index.html.backup       # Original file (895 lines)
├── styles/
│   ├── main.css           # Global styles, scrollbar
│   ├── components.css     # Reusable component classes
│   └── animations.css     # Animation keyframes
├── scripts/
│   └── app.js             # All React components (700+ lines)
└── components/
    ├── header.html        # Header component reference
    ├── hero.html          # Hero carousel reference
    ├── features.html      # Features section reference
    ├── platform-cta.html  # Platform CTA reference
    └── footer.html        # Footer component reference
```

## What Changed

### Before
- **Single file**: 895 lines of HTML, CSS, and JavaScript mixed together
- **Hard to navigate**: Finding specific styles or components required scrolling through the entire file
- **Difficult to maintain**: Changes to one section could accidentally affect another

### After
- **Separated concerns**: HTML, CSS, and JavaScript are in separate files
- **Easy to locate**: Each file has a single, clear responsibility
- **Maintainable**: Make changes to styles, logic, or structure independently

## Key Improvements

1. **CSS Organization**
   - `main.css`: Body styles, scrollbar customization
   - `components.css`: Reusable classes (`.glass`, `.premium-card`, `.card-glow`)
   - `animations.css`: Keyframe definitions and animation classes

2. **JavaScript Separation**
   - All React components moved to `scripts/app.js`
   - Easy to add new components or modify existing ones
   - Clear component structure with comments

3. **Component References**
   - HTML files in `components/` folder document the structure of each section
   - Useful for understanding the layout without diving into React code
   - Serves as a quick reference for developers

## How to Use

Simply open `index.html` in a browser. All dependencies are loaded via CDN, and the external CSS/JS files are automatically included.

## Running the Project

> **Important**: Because this project now uses external JavaScript files loaded via Babel, browser security policies (CORS) prevent it from running directly from the file system (`file:///`).

To run the project:

1. Double-click **`start.bat`** in this folder.
   - This will start a local server and open the site in your browser automatically.

Alternatively, if you have VS Code:
- Install the "Live Server" extension.
- Right-click `index.html` and select "Open with Live Server".

## Notes

- The original `index.html` has been backed up as `index.html.backup`
- Visual appearance and behavior are 100% preserved
- No build tools or frameworks required beyond what was already used (React via CDN)
- Component HTML files are for reference only - actual rendering is done by React in `app.js`

## Benefits

- **Easier collaboration**: Multiple developers can work on different files
- **Faster debugging**: Quickly locate where specific styles or logic live
- **Cleaner diffs**: Git changes are more focused and easier to review
- **Better IDE support**: Syntax highlighting and autocomplete work better with proper file extensions
- **Scalability**: Easy to add new components, styles, or pages

---

**Original size**: 895 lines in one file  
**Refactored size**: 76-line index.html + organized external files
