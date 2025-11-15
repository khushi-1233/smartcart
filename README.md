# SmartCart - Complete Restyle Documentation

## 🎯 Project Overview

SmartCart is a complete AI-powered grocery management system with a modern, responsive frontend built using HTML, CSS, and JavaScript. The application now features a clean, professional design with organized folder structure and modular code.

## 📁 New File Structure

```
smartcart/
├── css/
│   └── style.css          # Consolidated stylesheet with CSS variables
├── js/
│   └── main.js            # Core JavaScript utilities and functions
├── home.html              # Landing page with hero section
├── auth.html              # Login/Signup page with tabs
├── dashboard.html         # AI Meal Planning page
├── inventory.html         # Grocery inventory management
├── suggestions.html       # AI recipe suggestions
├── profile.html           # Analytics and spending (existing)
└── config.js              # Supabase configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: #10b981 (Green)
- **Secondary**: #3b82f6 (Blue)
- **Success**: #10b981
- **Warning**: #f59e0b
- **Danger**: #ef4444
- **Gray Scale**: 50-900 shades

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- **Headings**: Bold, 700 weight
- **Body**: 16px base size, 1.6 line height

### Spacing System
- XS: 0.5rem
- SM: 0.75rem
- MD: 1rem
- LG: 1.5rem
- XL: 2rem
- 2XL: 3rem

## ✨ Key Features

### 1. Landing Page (home.html)
- Modern hero section with gradient background
- Feature cards showcasing app capabilities
- Statistics display (10K+ users, 50K+ recipes, 30% savings)
- How-it-works section with 3-step process
- Call-to-action section
- Responsive footer

### 2. Authentication (auth.html)
- Tabbed interface for Login/Signup
- Password visibility toggle
- Form validation
- Forgot password functionality
- Email confirmation flow
- Beautiful gradient design

### 3. Dashboard (dashboard.html)
- AI meal plan generator
- Budget input with weekly/monthly toggle
- Diet preference selection (Vegetarian, Non-Veg, Protein, Weight Loss)
- Additional preferences checkboxes
- Real-time plan generation
- Database integration with Supabase

### 4. Inventory Management (inventory.html)
- Budget tracker with progress bar
- Summary cards (Total Items, Expiring Soon, Expired)
- Add item form with inline fields
- Items table with sorting
- Status badges (Available, Expiring Soon, Expired)
- Delete functionality
- Real-time calculations

### 5. AI Recipe Suggestions (suggestions.html)
- Ingredient selector with visual chips
- Dynamic recipe filtering based on selected ingredients
- Recipe cards with:
  - Recipe icon
  - Summary
  - Ingredient badges (highlighted if matched)
  - Expandable cooking steps
- Empty state messaging

## 🌙 Dark Mode

Full dark mode support across all pages with:
- CSS variable-based theme switching
- localStorage persistence
- Smooth transitions
- Toggle button with icon change (🌙/☀️)

## 📊 Database Integration

### Supabase Tables
1. **plans** - Stores meal plans
2. **grocery_items** - Inventory tracking
3. **budgets** - Budget management
4. **recipes** - Recipe database
5. **user_ingredients** - User's available ingredients
6. **spending_analytics** - Analytics data

### Authentication
- Email/password signup
- Email confirmation
- Session management
- Row Level Security (RLS) policies

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Unicode Emojis
- **Responsive**: Mobile-first approach

## 📱 Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Mobile optimizations:
- Hamburger menu
- Stacked layouts
- Touch-friendly buttons
- Optimized spacing

## 🔧 Utility Functions (main.js)

### Loading & Notifications
- `showLoading()` - Display loading overlay
- `hideLoading()` - Remove loading overlay
- `showToast(message, type)` - Show toast notifications

### Dark Mode
- `toggleDarkMode()` - Toggle theme
- `loadDarkModePreference()` - Load saved preference

### Authentication
- `checkAuth()` - Verify user session
- `requireAuth()` - Redirect if not authenticated
- `handleLogout()` - Sign out user
- `handleChangePassword()` - Update password

### Form Validation
- `isValidEmail(email)` - Email format check
- `validateInput(input, type)` - General validation
- `showInputError(input, message)` - Display errors
- `clearInputError(input)` - Remove errors

### Utilities
- `formatDate(dateString)` - Format dates
- `formatCurrency(amount)` - Format currency
- `openModal(modalId)` / `closeModal(modalId)` - Modal controls
- `saveToLocalStorage()` / `getFromLocalStorage()` - Storage helpers

## 🚀 Getting Started

1. **Setup Supabase**:
   - Create project at supabase.com
   - Update `config.js` with your credentials
   - Run database schema (see existing tables)

2. **Run Locally**:
   - Open `home.html` in a browser
   - Or use a local server: `python -m http.server 8000`

3. **Create Account**:
   - Click "Get Started"
   - Fill signup form
   - Confirm email
   - Login and start using

## 📝 User Flow

1. Land on **home.html**
2. Click "Get Started" → **auth.html**
3. Signup/Login
4. Redirected to **dashboard.html**
5. Navigate between:
   - Dashboard (Meal Planning)
   - Inventory (Grocery Tracking)
   - Suggestions (Recipe Ideas)
   - Analytics (Spending Data)

## 🎯 Key Improvements from Previous Version

1. ✅ Organized folder structure (/css, /js)
2. ✅ Consolidated CSS with variables
3. ✅ Modular JavaScript with utility functions
4. ✅ Modern card-based UI design
5. ✅ Consistent navigation across pages
6. ✅ Improved responsive design
7. ✅ Better form validation
8. ✅ Enhanced user feedback (toasts, loading)
9. ✅ Cleaner code architecture
10. ✅ Professional landing page

## 🔒 Security Features

- Row Level Security (RLS) on all tables
- User-specific data isolation
- Password strength requirements (min 6 chars)
- Email confirmation required
- Session-based authentication
- Secure password reset flow

## 🎨 UI Components

### Buttons
- Primary: Green background, white text
- Secondary: Transparent with border
- Sizes: Small, Default, Large
- States: Default, Hover, Disabled

### Cards
- White/Dark background based on theme
- Rounded corners (0.75rem)
- Shadow on hover
- Border: 1px solid gray

### Forms
- Labeled inputs
- Placeholder text
- Focus states with primary color
- Error messaging
- Password toggles

### Navigation
- Sticky top navbar
- Logo + Brand name
- Navigation links
- CTA button
- Mobile hamburger menu

## 📊 Analytics & Tracking

The application tracks:
- Budget spending (realtime)
- Item expiry dates
- Weekly spending trends
- Meal plan preferences
- User behavior patterns

## 🔄 Future Enhancements

Potential additions:
- AI-powered recipe generation
- Barcode scanning for items
- Shopping list integration
- Nutrition tracking
- Multi-user households
- Export/import data
- Mobile app version
- Social sharing features

## 📞 Support & Maintenance

For issues or questions:
1. Check console for errors
2. Verify Supabase connection
3. Clear browser cache
4. Check localStorage settings
5. Review RLS policies

## 🎉 Conclusion

SmartCart is now a complete, modern, production-ready grocery management application with professional UI/UX, robust functionality, and scalable architecture. All features are working with Supabase integration, dark mode, responsive design, and comprehensive user flows.
