# Planify Frontend - AI Coding Instructions

## Project Overview
This is a React frontend for a home plan generation and cost estimation app. The app communicates with a backend API at `http://localhost:8000` to generate SVG floor plans and construction cost estimates based on user inputs.

## Tech Stack & Architecture
- **Framework**: React 18 with Vite as the build tool
- **Styling**: Inline styles (no CSS framework)
- **HTTP Client**: Axios for API communication  
- **Entry Point**: `src/main.jsx` → `src/App.jsx`
- **Build Commands**: `npm start` (dev), `npm run build` (production)

## Key Application Logic
The app consists of a single-page form that collects:
- Direction (e.g. "East") 
- Size in square feet
- Number of rooms
- City location

### Critical API Integration Points
- **Plan Generation**: `POST /generate_plan` - Returns SVG content rendered via `dangerouslySetInnerHTML`
- **Cost Estimation**: `POST /estimate` - Returns Indian Rupee costs (material, labor, total) and duration

### State Management Pattern
Uses simple React `useState` with a single form object:
```jsx
const [form, setForm] = useState({ direction: '', size_sqft: '', rooms: '', city: '' });
```
Form updates via a shared `handleChange` handler that updates the entire form state.

## Development Patterns & Conventions

### Component Structure
- **Single Component App**: Everything is in `App.jsx` - no component composition yet
- **Functional Components**: Uses modern React hooks, no class components
- **State Updates**: Always use spread operator `{ ...form, [key]: value }` for form updates

### API Call Patterns
- Use async/await with axios
- No error handling implemented yet
- API calls are triggered by button clicks, not form submission
- Both API endpoints expect the same form data structure

### Styling Approach
- Inline styles with simple margin/padding (e.g. `style={{ margin: 40 }}`)
- No CSS modules, styled-components, or external CSS files
- Indian Rupee symbol (₹) used for currency display

## Development Workflow
- **Setup**: `npm install` (installs Vite and React dependencies)
- **Start Dev Server**: `npm start` (runs on http://localhost:5173)
- **Build**: `npm run build` 
- **Backend Dependency**: Requires backend server running on localhost:8000

## File Structure Conventions
```
src/
  App.jsx         # Main application component
  main.jsx        # React DOM render entry point
index.html        # Vite HTML template with "Home Plan Estimator" title
package.json      # Named "home-plan-ui" 
vite.config.js    # Basic Vite + React setup
```

## Potential Expansion Areas
When adding features, consider:
- Adding form validation and error states
- Breaking down App.jsx into smaller components
- Adding loading states for API calls
- Implementing proper error handling for network requests
- Adding CSS modules or a styling framework for better UI
- Adding TypeScript for better type safety