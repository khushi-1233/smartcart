# SmartCart - Project Structure

## 📁 Directory Structure

```
smartcart/
│
├── css/
│   └── style.css                 # Main consolidated stylesheet
│
├── js/
│   └── main.js                   # Core utility functions
│
├── home.html                     # Landing page
├── auth.html                     # Login/Signup page
├── dashboard.html                # AI Meal Planning
├── inventory.html                # Grocery Inventory Management
├── suggestions.html              # AI Recipe Suggestions
├── profile.html                  # Spending Analytics
├── config.js                     # Supabase configuration
└── README.md                     # Project documentation
```

## 🎯 Active Files (Production Ready)

### HTML Pages
- **home.html** - Landing page with hero, features, CTA
- **auth.html** - Authentication (login/signup tabs)
- **dashboard.html** - AI meal planner with diet preferences
- **inventory.html** - Grocery tracking with budget monitoring
- **suggestions.html** - Recipe suggestions with ingredient filtering
- **profile.html** - Spending analytics and insights

### Styles
- **css/style.css** - Complete stylesheet with:
  - CSS variables for theming
  - Dark mode support
  - Responsive grid layouts
  - Component styles (buttons, cards, forms)
  - Utility classes
  - Animations

### Scripts
- **js/main.js** - Centralized utilities:
  - Authentication helpers
  - Loading/Toast notifications
  - Dark mode toggle
  - Form validation
  - Date/Currency formatting
  - Modal controls
  - LocalStorage helpers

- **config.js** - Supabase initialization:
  - Project URL configuration
  - Anonymous key
  - Client creation

## 🗄️ Database Schema (Supabase)

### Tables

#### 1. **plans**
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- budget (numeric)
- budget_type (text) -- 'weekly' or 'monthly'
- diet_type (text) -- 'veg', 'non-veg', 'protein', 'weight-loss'
- preferences (jsonb) -- Array of preferences
- status (text)
- saved (boolean)
- created_at (timestamp)
```

#### 2. **grocery_items**
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- name (text)
- quantity (integer)
- price (numeric)
- expiry (date)
- status (text)
- created_at (timestamp)
```

#### 3. **budgets**
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users, unique)
- amount (numeric)
- created_at (timestamp)
```

#### 4. **recipes**
```sql
- id (uuid, primary key)
- name (text)
- summary (text)
- ingredients (jsonb) -- Array of ingredients
- steps (jsonb) -- Array of cooking steps
- created_at (timestamp)
```

#### 5. **user_ingredients**
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- ingredients (jsonb) -- Array of user's available ingredients
- created_at (timestamp)
```

#### 6. **spending_analytics**
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- week (text)
- amount (numeric)
- created_at (timestamp)
```

## 🔐 Authentication Flow

1. User visits **home.html**
2. Clicks "Get Started" → **auth.html**
3. Signs up with email/password
4. Supabase sends confirmation email
5. User confirms email
6. Redirects to **dashboard.html**
7. Session persists via Supabase Auth

## 🌙 Dark Mode Implementation

- **Storage**: localStorage key `darkMode`
- **Toggle**: Button in navbar on all pages
- **CSS**: `.dark-mode` class on body
- **Variables**: CSS custom properties switch automatically
- **Icons**: 🌙 (light mode) / ☀️ (dark mode)

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  - Single column layouts
  - Hamburger menu
  - Stacked forms
  - Full-width cards
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  - 2-column grids
  - Visible navigation
}

/* Desktop */
@media (min-width: 1025px) {
  - Multi-column layouts
  - Full navigation
  - Sidebar layouts
}
```

## 🎨 Design Tokens

### Colors
```css
--primary-color: #10b981 (Green)
--secondary-color: #3b82f6 (Blue)
--success: #10b981
--warning: #f59e0b
--danger: #ef4444
--gray-[50-900]: Neutral scale
```

### Spacing
```css
--spacing-xs: 0.5rem
--spacing-sm: 0.75rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-2xl: 3rem
```

### Border Radius
```css
--radius-sm: 0.375rem
--radius-md: 0.5rem
--radius-lg: 0.75rem
--radius-xl: 1rem
--radius-full: 9999px
```

## 🔧 Component Library

### Buttons
- `.btn` - Base button
- `.btn-primary` - Green filled
- `.btn-secondary` - Outlined
- `.btn-large` / `.btn-small` - Size variants

### Cards
- `.card` - Base card with shadow
- `.card-header` - Card header section
- `.card-content` - Card body

### Forms
- `.form-group` - Form field wrapper
- `.form-label` - Input label
- `.form-input` - Text input
- `.form-select` - Dropdown
- `.form-textarea` - Textarea

### Navigation
- `.navbar` - Fixed top navbar
- `.nav-brand` - Logo/brand section
- `.nav-links` - Navigation menu
- `.nav-item` - Menu link

## 🚀 Deployment Checklist

- [x] Supabase project created
- [x] Database tables set up
- [x] RLS policies enabled
- [x] Email templates customized
- [x] Environment variables configured
- [x] All pages linked correctly
- [x] Dark mode working
- [x] Mobile responsive
- [x] Forms validated
- [x] Error handling implemented

## 📊 Feature Completeness

### Landing Page (home.html)
- [x] Hero section with CTA
- [x] Feature showcase (6 cards)
- [x] Statistics display
- [x] How-it-works section
- [x] Responsive footer
- [x] Dark mode support

### Authentication (auth.html)
- [x] Login form
- [x] Signup form
- [x] Tab switching
- [x] Password visibility toggle
- [x] Email validation
- [x] Error messaging
- [x] Forgot password link
- [x] Supabase integration

### Dashboard (dashboard.html)
- [x] Budget input
- [x] Budget type selector (weekly/monthly)
- [x] Diet preference buttons (4 types)
- [x] Additional preferences checkboxes
- [x] AI plan generation
- [x] Plan display with meals
- [x] Save to database
- [x] Loading states

### Inventory (inventory.html)
- [x] Budget card with progress
- [x] Summary statistics (total, expiring, expired)
- [x] Add item form
- [x] Items table with status badges
- [x] Delete functionality
- [x] Real-time budget calculation
- [x] Expiry date tracking
- [x] Database persistence

### Suggestions (suggestions.html)
- [x] Ingredient selector (15 options)
- [x] Multi-select functionality
- [x] Recipe filtering by ingredients
- [x] Recipe cards with details
- [x] Ingredient matching highlights
- [x] Expandable cooking steps
- [x] Database recipe loading
- [x] Empty states

### Analytics (profile.html)
- [x] Spending statistics
- [x] Budget status tracking
- [x] Average weekly calculation
- [x] Savings display
- [x] Chart placeholder
- [x] Database integration
- [x] Refresh functionality

## 🔒 Security Features

- Row Level Security (RLS) on all tables
- User-specific data isolation
- Password strength requirements
- Email confirmation required
- Session-based authentication
- HTTPS enforced (production)
- CORS properly configured
- SQL injection protection (Supabase)

## 🎓 Usage Guide

### For Users:
1. Visit landing page
2. Sign up with email
3. Confirm email
4. Set budget and preferences in Dashboard
5. Add grocery items in Inventory
6. Browse recipes in Suggestions
7. Track spending in Analytics

### For Developers:
1. Clone repository
2. Update `config.js` with your Supabase credentials
3. Set up Supabase database (run SQL schema)
4. Enable RLS policies
5. Open `home.html` in browser or serve locally
6. All features work out of the box!

## 📦 Dependencies

- **Supabase JS SDK** - v2 (CDN)
- **No build tools required** - Pure HTML/CSS/JS
- **No npm packages** - Zero dependencies
- **Browser compatible** - Modern browsers only

## 🐛 Troubleshooting

### Supabase Not Connecting
- Check `config.js` credentials
- Verify Supabase project is active
- Check browser console for errors
- Ensure RLS policies are correct

### Dark Mode Not Persisting
- Check localStorage in browser DevTools
- Clear cache and retry
- Verify `main.js` is loaded

### Forms Not Submitting
- Check network tab for errors
- Verify user is authenticated
- Check RLS policies allow INSERT

### Styling Issues
- Verify `css/style.css` is loaded
- Check CSS variables are defined
- Clear browser cache
- Check for CSS conflicts

## 📈 Future Enhancements

- [ ] Recipe image uploads
- [ ] Barcode scanning
- [ ] Shopping list export
- [ ] Nutrition calculations
- [ ] Social sharing
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics charts
- [ ] Budget predictions
- [ ] AI-generated meal plans

---

**Version**: 2.0.0  
**Last Updated**: November 15, 2025  
**Status**: Production Ready ✅
