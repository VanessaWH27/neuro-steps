# From Curiosity to Research: Learning Alzheimer’s Disease & Neuroscience

A student-friendly MkDocs-based learning portal for Alzheimer's Disease research, covering foundational concepts in neuroscience, mathematics, MRI imaging, and machine learning.

## Features

### Content Areas

**AD Basics**
- What is Alzheimer's Disease
- Brain regions and memory systems
- Pathological changes in AD

**Math Foundations**
- Statistics for research
- Linear algebra fundamentals

**MRI & Machine Learning**
- MRI imaging basics
- Machine learning workflow for neuroimaging
- Practical applications in AD research

**Resources**
- Curated datasets
- Glossary of terms
- Additional learning materials

### Navigation System

**Multi-Section Collapsible Navigation**
- Multiple sections can stay open simultaneously (no accordion behavior)
- Navigation state persists across sessions using browser localStorage
- Smooth, flash-free transitions when navigating between pages
- Works like fast.ai documentation navigation

**How to Use:**
- Click section headers to expand/collapse
- Click page links to navigate
- Your open/closed state is automatically saved
- State persists across browser sessions

### Math Rendering

**KaTeX Integration**
- Fast, beautiful math rendering
- Supports LaTeX syntax
- Inline and display equations

## Technology Stack

- **Documentation Framework**: MkDocs
- **Theme**: Material for MkDocs
- **Math Rendering**: KaTeX 0.16.9
- **Custom Features**:
  - JavaScript: Multi-section collapsible navigation
  - CSS: Flash prevention and styling
  - localStorage: State persistence

## Project Structure

```
neurosteps/
├── mkdocs.yml                    # MkDocs configuration
├── docs/
│   ├── index.md                  # Home page
│   ├── ad-basics/                # Alzheimer's Disease content
│   ├── math/                     # Mathematics content
│   ├── mri-ml/                   # MRI & ML content
│   ├── resources/                # Additional resources
│   ├── javascripts/
│   │   ├── katex.js             # Math rendering setup
│   │   └── navigation.js        # Navigation state management
│   └── stylesheets/
│       └── navigation.css       # Navigation styling
├── README.md                     # This file
└── NAVIGATION-CHANGES.md         # Technical documentation

```

## Local Development

### Prerequisites
- Python 3.7+
- MkDocs
- MkDocs Material theme

### Setup
```bash
# Install dependencies
pip install mkdocs mkdocs-material

# Serve locally
mkdocs serve

# Build static site
mkdocs build
```

### Viewing the Site
After running `mkdocs serve`, visit `http://127.0.0.1:8000`

## Configuration

### Theme Features Enabled
- `navigation.tracking` - URL updates with navigation
- `toc.follow` - Table of contents follows scroll
- `content.code.copy` - Copy buttons on code blocks
- `search.highlight` - Search term highlighting
- `search.suggest` - Search suggestions

### Theme Features Disabled
- `navigation.indexes` - Removed to prevent section header link conflicts
- `navigation.instant` - Removed to prevent navigation state resets
- `navigation.sections` - Removed to enable collapsible behavior
- `navigation.expand` - Removed to allow manual section control

## Browser Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled (required for navigation state management)
- localStorage enabled (required for state persistence)

## Known Limitations

1. **Section headers are not links** - They toggle sections open/closed only
   - Access overview pages via "Overview" links inside each section

2. **Navigation state is browser-specific** - Won't sync across devices
   - Each browser maintains its own navigation preferences

3. **Brief sidebar hide on page load** - ~100ms while state restores
   - Prevents flash of incorrect navigation state

## Documentation

See [NAVIGATION-CHANGES.md](NAVIGATION-CHANGES.md) for detailed technical documentation about the navigation system implementation.

## License

[Add your license here]

## Author

Student Research Notes - AD Research Learning Portal

## Contributing

[Add contribution guidelines here]
