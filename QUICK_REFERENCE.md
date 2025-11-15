# 🚀 SmartCart - Quick Reference

## 📂 File Locations

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Entry point (redirects to home) | ✅ Active |
| `home.html` | Landing page | ✅ Active |
| `auth.html` | Login/Signup | ✅ Active |
| `dashboard.html` | AI Meal Planner | ✅ Active |
| `inventory.html` | Grocery Tracker | ✅ Active |
| `suggestions.html` | Recipe Finder | ✅ Active |
| `profile.html` | Analytics | ✅ Active |
| `config.js` | Supabase config | ⚙️ Configure |
| `css/style.css` | All styles | ✅ Active |
| `js/main.js` | All utilities | ✅ Active |
| `old_files/` | Archived files | 📦 Archive |

## 🔧 Configuration Required

**Edit `config.js`:**
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

## 🗄️ Database Tables

1. `plans` - Meal plans
2. `grocery_items` - Inventory
3. `budgets` - Budget tracking
4. `recipes` - Recipe database
5. `user_ingredients` - User's ingredients
6. `spending_analytics` - Analytics data

## 🎨 Color Scheme

```css
Primary:   #10b981 (Green)
Secondary: #3b82f6 (Blue)
Success:   #10b981
Warning:   #f59e0b
Danger:    #ef4444
```

## 📱 Pages Overview

### home.html
- Hero section
- Features grid
- Statistics
- CTA buttons
- **No auth required**

### auth.html
- Login form
- Signup form
- Tab switching
- Password reset
- **Public page**

### dashboard.html
- Budget input
- Diet selector
- Generate meal plans
- **Auth required**

### inventory.html
- Add grocery items
- Track budget
- Monitor expiry
- **Auth required**

### suggestions.html
- Select ingredients
- Filter recipes
- View cooking steps
- **Auth required**

### profile.html
- View spending
- Budget analytics
- Savings tracker
- **Auth required**

## 🔐 Auth Functions (js/main.js)

```javascript
SmartCart.checkAuth()        // Check if logged in
SmartCart.requireAuth()      // Redirect if not logged in
SmartCart.handleLogout()     // Sign out user
```

## 🎨 UI Components

```javascript
SmartCart.showLoading()      // Show spinner
SmartCart.hideLoading()      // Hide spinner
SmartCart.showToast(msg, type) // Toast notification
SmartCart.toggleDarkMode()   // Switch theme
```

## 🛠️ Utility Functions

```javascript
SmartCart.formatCurrency(100)     // "$100.00"
SmartCart.formatDate("2025-11-15") // "Nov 15, 2025"
SmartCart.validateInput(input, type) // Form validation
SmartCart.openModal(id)           // Open modal
SmartCart.closeModal(id)          // Close modal
```

## 🌙 Dark Mode

- **Toggle**: Click moon/sun icon
- **Storage**: localStorage key `darkMode`
- **CSS Class**: `dark-mode` on body
- **Auto-persist**: Yes

## 📊 Database Queries

### Get User Items
```javascript
const { data } = await supabase
  .from('grocery_items')
  .select('*')
  .eq('user_id', user.id);
```

### Add Item
```javascript
const { error } = await supabase
  .from('grocery_items')
  .insert([{ user_id, name, quantity, price, expiry }]);
```

### Delete Item
```javascript
const { error } = await supabase
  .from('grocery_items')
  .delete()
  .eq('id', itemId);
```

## 🚀 Run Locally

```bash
# Option 1: Direct open
Start index.html in browser

# Option 2: Python server
python -m http.server 8000
# Open http://localhost:8000

# Option 3: Node server  
npx serve
# Open http://localhost:3000
```

## 📝 Testing Checklist

- [ ] Open index.html
- [ ] Redirects to home.html
- [ ] Click "Get Started"
- [ ] Sign up with email
- [ ] Check email confirmation
- [ ] Login successfully
- [ ] Dashboard loads
- [ ] Add grocery item
- [ ] View recipes
- [ ] Check analytics
- [ ] Test dark mode
- [ ] Test on mobile

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Supabase not defined" | Check CDN script is loaded |
| "Invalid API key" | Verify config.js credentials |
| "Table doesn't exist" | Run SQL schema |
| "Permission denied" | Check RLS policies |
| Dark mode not saving | Clear localStorage and retry |

## 🎯 Key Features Status

- ✅ Landing page with CTA
- ✅ User authentication
- ✅ Email confirmation
- ✅ Meal plan generator
- ✅ Grocery inventory
- ✅ Budget tracking
- ✅ Recipe suggestions
- ✅ Ingredient filtering
- ✅ Spending analytics
- ✅ Dark mode
- ✅ Mobile responsive
- ✅ Database integration

## 📦 Deployment Commands

### Netlify
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
# Connect to Netlify dashboard
```

### Vercel
```bash
npm install -g vercel
vercel
# Follow prompts
```

### GitHub Pages
```bash
# Push to GitHub
# Settings → Pages → Source: main branch
```

## 📞 Quick Links

- **Supabase Dashboard**: [app.supabase.com](https://app.supabase.com)
- **Docs**: See README.md
- **Setup**: See SETUP_GUIDE.md
- **Structure**: See PROJECT_STRUCTURE.md

## 🎉 You're Ready!

1. Update `config.js` with your Supabase credentials
2. Run the SQL schema in Supabase
3. Open `index.html` in browser
4. Create account and test!

---

**Version**: 2.0.0  
**Updated**: November 15, 2025  
**Status**: Production Ready ✅
