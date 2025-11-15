// =============================================
// SMARTCART - MAIN JAVASCRIPT
// AI-Powered Grocery Management System
// =============================================

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Show loading overlay
 */
function showLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Color mapping for different toast types
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// =============================================
// DARK MODE FUNCTIONALITY
// =============================================

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    // Update icon if exists
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

/**
 * Load dark mode preference
 */
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.textContent = '☀️';
        }
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', loadDarkModePreference);

// =============================================
// NAVIGATION FUNCTIONALITY
// =============================================

/**
 * Initialize navigation
 */
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
    
    // Set active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', initNavigation);

// =============================================
// USER DROPDOWN FUNCTIONALITY
// =============================================

/**
 * Toggle user dropdown
 */
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

/**
 * Load user information
 */
async function loadUserInfo() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        if (user) {
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                const fullName = user.user_metadata?.full_name || user.email;
                userNameElement.textContent = fullName;
            }
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

// =============================================
// AUTHENTICATION FUNCTIONS
// =============================================

/**
 * Check if user is authenticated
 */
async function checkAuth() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user !== null;
    } catch (error) {
        console.error('Auth check error:', error);
        return false;
    }
}

/**
 * Redirect if not authenticated
 */
async function requireAuth() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        window.location.href = 'auth.html';
    }
}

/**
 * Logout user
 */
async function handleLogout() {
    try {
        showLoading();
        const { error } = await supabase.auth.signOut();
        
        if (error) throw error;
        
        showToast('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Logout failed: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

/**
 * Change password
 */
async function handleChangePassword() {
    const newPassword = document.getElementById('new-password')?.value;
    const confirmPassword = document.getElementById('confirm-password')?.value;
    
    if (!newPassword || !confirmPassword) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        showLoading();
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        
        if (error) throw error;
        
        showToast('Password changed successfully', 'success');
        
        // Close modal
        const modal = document.getElementById('change-password-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Clear inputs
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        
    } catch (error) {
        console.error('Password change error:', error);
        showToast('Password change failed: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// =============================================
// FORM VALIDATION
// =============================================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate form input
 */
function validateInput(input, type = 'text') {
    const value = input.value.trim();
    
    switch (type) {
        case 'email':
            return isValidEmail(value);
        case 'password':
            return value.length >= 6;
        case 'required':
            return value !== '';
        case 'number':
            return !isNaN(value) && value !== '';
        default:
            return true;
    }
}

/**
 * Show input error
 */
function showInputError(input, message) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        let errorElement = formGroup.querySelector('.input-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'input-error';
            errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        input.style.borderColor = '#ef4444';
    }
}

/**
 * Clear input error
 */
function clearInputError(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        const errorElement = formGroup.querySelector('.input-error');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '';
    }
}

// =============================================
// MODAL FUNCTIONALITY
// =============================================

/**
 * Open modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

/**
 * Close modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// =============================================
// LOCAL STORAGE HELPERS
// =============================================

/**
 * Save to local storage
 */
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Local storage save error:', error);
        return false;
    }
}

/**
 * Get from local storage
 */
function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Local storage get error:', error);
        return null;
    }
}

/**
 * Remove from local storage
 */
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Local storage remove error:', error);
        return false;
    }
}

// =============================================
// EXPORT FUNCTIONS (for use in other files)
// =============================================

// Make functions available globally
window.SmartCart = {
    showLoading,
    hideLoading,
    showToast,
    formatDate,
    formatCurrency,
    toggleDarkMode,
    loadDarkModePreference,
    toggleUserDropdown,
    loadUserInfo,
    checkAuth,
    requireAuth,
    handleLogout,
    handleChangePassword,
    isValidEmail,
    validateInput,
    showInputError,
    clearInputError,
    openModal,
    closeModal,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
};
