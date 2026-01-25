# Navigation System Changes

## Overview
Implemented a custom multi-section collapsible navigation system for the MkDocs Material theme, similar to the navigation behavior on https://docs.fast.ai/

## Problem Solved
The default MkDocs Material theme uses accordion-style navigation where:
- Opening one section automatically closes all others
- Navigation state resets on every page load
- Clicking section headers or page links caused visible flash/flicker

## Solution Implemented

### 1. Configuration Changes (mkdocs.yml)

**Removed Features:**
- `navigation.indexes` - Was causing state reset when clicking section headers (they were navigation links)
- `navigation.instant` - Was causing navigation state reset during page transitions
- `navigation.sections` - Was preventing collapsible behavior

**Kept Features:**
- `navigation.tracking` - URL updates as you navigate

**Added Resources:**
- `javascripts/navigation.js` - Custom state management
- `stylesheets/navigation.css` - Flash prevention styling

### 2. Custom JavaScript (docs/javascripts/navigation.js)

**Features:**
- Saves navigation state to browser localStorage
- Restores state on page load (multiple times at 0ms, 10ms, 50ms for reliability)
- Saves state before any link click
- Handles page show events (back/forward navigation)
- Marks sidebar ready after state restoration

**How It Works:**
1. Immediately restores saved toggle states on page load
2. Listens for toggle changes and saves state
3. Intercepts link clicks to save state before navigation
4. Prevents race conditions with Material theme's built-in behavior

### 3. Custom CSS (docs/stylesheets/navigation.css)

**Features:**
- Hides sidebar during page load (visibility: hidden)
- Disables all CSS transitions on navigation elements
- Shows sidebar only after JavaScript restores state
- Fallback animation shows sidebar after 150ms if JavaScript fails

**Why This Works:**
- User never sees incorrect navigation state
- No visible transitions or animations during restoration
- Clean, instant appearance of navigation in correct state

## Current Behavior

### ✓ What Works
1. **Multiple sections stay open simultaneously** - No accordion behavior
2. **State persists across sessions** - localStorage remembers your preferences
3. **No flash or flicker** - Whether clicking sections or page links
4. **Clean user experience** - Works like fast.ai documentation
5. **Collapsible at all levels** - Sections and subsections both collapsible

### ✗ Trade-offs
1. **Section headers are not navigation links** - They only toggle open/closed
   - Access overview pages via "Overview" links inside sections
2. **Slightly slower page loads** - Standard page reloads instead of instant SPA navigation
   - Necessary to prevent state reset issues
3. **State is browser-specific** - Won't sync across devices/browsers
   - State lost if browser data is cleared
4. **Brief sidebar hide on load** - ~100ms while state restores
   - Prevents flash, worth the trade-off

## File Structure

```
neurosteps/
├── mkdocs.yml                          # Updated configuration
├── docs/
│   ├── javascripts/
│   │   ├── katex.js                    # Existing: Math rendering
│   │   └── navigation.js               # NEW: Multi-section navigation
│   └── stylesheets/
│       └── navigation.css              # NEW: Flash prevention
└── NAVIGATION-CHANGES.md               # This file
```

## Technical Details

### localStorage Schema
```javascript
{
  "mkdocs-nav-state": {
    "__nav_1": true,      // Section toggle ID: open/closed state
    "__nav_2": false,
    "__nav_3": true,
    // ... etc
  }
}
```

### CSS Strategy
- Initial state: `visibility: hidden` on `.md-sidebar__scrollwrap`
- After restoration: `.nav-ready` class added, `visibility: visible`
- All transitions disabled with `!important` to prevent animations

### JavaScript Execution Timeline
1. **Immediate** (script load): First restore attempt
2. **0ms setTimeout**: Second restore
3. **10ms setTimeout**: Third restore
4. **50ms setTimeout**: Fourth restore
5. **DOMContentLoaded**: Full initialization + event listeners
6. **100ms setTimeout**: Fallback to mark navigation ready

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Requires localStorage support (all modern browsers)

## Future Enhancements (Optional)
- [ ] Add option to sync state across devices (server-side or cloud storage)
- [ ] Add "Collapse All" / "Expand All" buttons
- [ ] Add keyboard shortcuts for navigation
- [ ] Make section headers linkable again with custom click handling

## Maintenance Notes
- If MkDocs Material theme updates, test navigation behavior
- The CSS uses `!important` which might conflict with future theme updates
- localStorage key is `mkdocs-nav-state` - don't change without migration
