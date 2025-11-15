# SmartCart - Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Supabase Setup

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account

2. **Create a New Project**
   - Click "New Project"
   - Name it "SmartCart"
   - Set a strong database password
   - Select a region close to you
   - Wait for project creation (~2 minutes)

3. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy your **Project URL**
   - Copy your **anon/public** API key

4. **Update config.js**
   ```javascript
   const SUPABASE_URL = 'YOUR_PROJECT_URL_HERE';
   const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
   ```

### Step 2: Database Setup

1. **Go to SQL Editor** in Supabase dashboard

2. **Run this SQL to create tables:**

```sql
-- Create plans table
CREATE TABLE plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    budget NUMERIC,
    budget_type TEXT,
    diet_type TEXT,
    preferences JSONB,
    status TEXT,
    saved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create grocery_items table
CREATE TABLE grocery_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    quantity INTEGER,
    price NUMERIC,
    expiry DATE,
    status TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create budgets table
CREATE TABLE budgets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    amount NUMERIC,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create recipes table
CREATE TABLE recipes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    summary TEXT,
    ingredients JSONB,
    steps JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_ingredients table
CREATE TABLE user_ingredients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ingredients JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create spending_analytics table
CREATE TABLE spending_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    week TEXT,
    amount NUMERIC,
    created_at TIMESTAMP DEFAULT NOW()
);
```

3. **Enable Row Level Security (RLS)**

```sql
-- Enable RLS on all tables
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE grocery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE spending_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for plans
CREATE POLICY "Users can view own plans" ON plans
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans" ON plans
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own plans" ON plans
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for grocery_items
CREATE POLICY "Users can view own items" ON grocery_items
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own items" ON grocery_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own items" ON grocery_items
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own items" ON grocery_items
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for budgets
CREATE POLICY "Users can view own budget" ON budgets
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own budget" ON budgets
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own budget" ON budgets
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for user_ingredients
CREATE POLICY "Users can view own ingredients" ON user_ingredients
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own ingredients" ON user_ingredients
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ingredients" ON user_ingredients
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for spending_analytics
CREATE POLICY "Users can view own analytics" ON spending_analytics
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analytics" ON spending_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read for recipes (everyone can view)
CREATE POLICY "Anyone can view recipes" ON recipes
    FOR SELECT USING (true);
```

4. **Add Sample Recipes** (Optional)

```sql
INSERT INTO recipes (name, summary, ingredients, steps) VALUES
('Chicken Fried Rice', 'A delicious Asian-inspired rice dish with chicken and vegetables', 
 '["rice", "chicken", "onion", "garlic", "soy sauce", "eggs"]'::jsonb,
 '["Cook rice and let it cool", "Dice chicken and vegetables", "Stir-fry chicken until cooked", "Add vegetables and rice", "Season with soy sauce", "Push rice to side and scramble eggs", "Mix everything together"]'::jsonb),

('Vegetable Pasta', 'Healthy pasta with fresh vegetables in tomato sauce',
 '["pasta", "tomato", "onion", "garlic", "broccoli", "carrot"]'::jsonb,
 '["Boil pasta according to package", "Sauté onion and garlic", "Add diced vegetables", "Add tomato sauce and simmer", "Mix with pasta", "Serve hot"]'::jsonb),

('Beef Stir-Fry', 'Quick and easy beef stir-fry with vegetables',
 '["beef", "onion", "garlic", "broccoli", "carrot", "soy sauce"]'::jsonb,
 '["Slice beef thinly", "Heat oil in wok", "Cook beef until browned", "Remove beef and set aside", "Stir-fry vegetables", "Add beef back", "Season with soy sauce"]'::jsonb),

('Fish Tacos', 'Light and flavorful fish tacos with fresh toppings',
 '["fish", "tomato", "onion", "cheese", "tortilla"]'::jsonb,
 '["Season and grill fish", "Warm tortillas", "Dice tomatoes and onions", "Assemble tacos with fish", "Top with cheese and vegetables", "Serve with lime"]'::jsonb),

('Egg Fried Rice', 'Simple fried rice with scrambled eggs',
 '["rice", "eggs", "onion", "garlic", "soy sauce"]'::jsonb,
 '["Cook rice and cool", "Scramble eggs separately", "Sauté onion and garlic", "Add rice and stir-fry", "Mix in eggs", "Season with soy sauce"]'::jsonb),

('Cheese Omelette', 'Classic cheese omelette for breakfast',
 '["eggs", "cheese", "milk", "onion"]'::jsonb,
 '["Beat eggs with milk", "Heat pan with butter", "Pour egg mixture", "Add cheese and onions", "Fold omelette", "Cook until golden"]'::jsonb),

('Potato Curry', 'Hearty vegetarian curry with potatoes',
 '["potato", "onion", "garlic", "tomato", "spinach"]'::jsonb,
 '["Dice potatoes", "Sauté onions and garlic", "Add spices and tomatoes", "Add potatoes and water", "Simmer until tender", "Add spinach at end"]'::jsonb),

('Chicken Salad', 'Fresh and healthy chicken salad',
 '["chicken", "spinach", "tomato", "carrot", "onion"]'::jsonb,
 '["Grill chicken breast", "Slice chicken thinly", "Mix greens and vegetables", "Top with chicken", "Dress with vinaigrette", "Serve fresh"]'::jsonb);
```

### Step 3: Run the Application

1. **Option A: Open Directly**
   - Simply double-click `index.html` or `home.html`
   - Works immediately in modern browsers

2. **Option B: Use Local Server** (Recommended)
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx serve`
   - **VS Code**: Use Live Server extension
   - Open `http://localhost:8000`

### Step 4: Create Your First Account

1. Open the app in browser
2. Click "Get Started" or "Login"
3. Switch to "Sign Up" tab
4. Enter your details:
   - Full Name
   - Email
   - Password (min 6 characters)
5. Click "Create Account"
6. Check your email for confirmation link
7. Click the confirmation link
8. Login with your credentials
9. Start using SmartCart! 🎉

## 📧 Email Configuration (Optional)

### Customize Email Templates

1. Go to **Authentication → Email Templates** in Supabase
2. Customize the confirmation email:
   - Add your branding
   - Customize colors
   - Add custom messages

### Example Email Template

```html
<h2>Welcome to SmartCart!</h2>
<p>Thanks for signing up. Click the button below to confirm your email:</p>
<a href="{{ .ConfirmationURL }}" style="background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
  Confirm Email
</a>
```

## 🔧 Configuration Options

### Enable Dark Mode by Default

In `js/main.js`, change:
```javascript
// Set dark mode as default
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('darkMode')) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }
});
```

### Change Color Theme

In `css/style.css`, modify:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Adjust Budget Defaults

In `inventory.html`, change default budget:
```javascript
budget = data?.amount || 500; // Change 500 to your default
```

## 🐛 Common Issues & Fixes

### "Supabase is not defined"
**Fix**: Make sure Supabase CDN is loaded before config.js
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="config.js"></script>
```

### "Invalid API Key"
**Fix**: 
- Verify you copied the **anon/public** key (not service_role)
- Check for extra spaces in config.js
- Make sure project URL starts with `https://`

### "Email not confirmed"
**Fix**:
- Check spam folder
- Resend confirmation from Supabase dashboard
- In Auth settings, disable email confirmation for testing

### Tables don't exist
**Fix**:
- Run the SQL schema again
- Check table names are lowercase
- Verify you're in the correct project

### RLS Blocking Queries
**Fix**:
- Verify RLS policies are created
- Check user is authenticated
- Temporarily disable RLS for debugging

## 📱 Mobile Testing

Test on mobile devices:
1. Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Run local server: `python -m http.server 8000`
3. On mobile, visit: `http://YOUR_IP:8000`
4. Test all features on mobile browser

## 🚀 Deployment Options

### Option 1: Netlify (Easiest)
1. Push to GitHub
2. Connect to Netlify
3. Deploy automatically
4. Custom domain supported

### Option 2: Vercel
1. Push to GitHub
2. Import to Vercel
3. Auto-deploy on push
4. Free SSL included

### Option 3: GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages
3. Set source to main branch
4. Access via username.github.io/smartcart

## ✅ Final Checklist

- [ ] Supabase project created
- [ ] config.js updated with credentials
- [ ] All tables created
- [ ] RLS policies enabled
- [ ] Sample recipes added
- [ ] Email confirmation working
- [ ] App opens in browser
- [ ] Can create account
- [ ] Can login successfully
- [ ] Dashboard loads
- [ ] Can add grocery items
- [ ] Recipes display
- [ ] Dark mode works
- [ ] Mobile responsive

## 🎉 You're All Set!

SmartCart is now fully configured and ready to use. Enjoy managing your groceries with AI-powered suggestions!

---

**Need Help?** Check:
- Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Browser console for errors (F12)
- Network tab for failed requests
