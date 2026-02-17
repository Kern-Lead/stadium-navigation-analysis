// Stadium Navigation Analysis - Cross-page navigation and interactions

// Navigation menu data
const navigationPages = [
    { name: 'Overview', url: 'index.html', id: 'index' },
    { name: 'Evolution', url: 'navigation-evolution-overview.html', id: 'evolution' },
    { name: 'Findings Summary', url: 'findings-summary.html', id: 'findings' },
    { name: 'Content Analysis', url: 'content-gap-analysis.html', id: 'content' },
    { name: 'User Journey Impact', url: 'user-journey-impact.html', id: 'journey' },
    { name: 'Research Insights', url: 'b2b-research-insights.html', id: 'research' },
    { name: 'Solution Design', url: 'hybrid-solution-design.html', id: 'solution' },
    { name: 'Wireframes', url: 'wireframes/index.html', id: 'wireframes' }
];

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDropdowns();
    setActivePage();
});

// Initialize main navigation
function initializeNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    navMenu.innerHTML = '';
    
    navigationPages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = page.url;
        a.textContent = page.name;
        a.setAttribute('data-page', page.id);
        li.appendChild(a);
        navMenu.appendChild(li);
    });
}

// Set active page in navigation
function setActivePage() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === fileName || 
            (fileName === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize dropdown interactions for wireframes
function initializeDropdowns() {
    const dropdownButtons = document.querySelectorAll('[data-dropdown]');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdown = document.getElementById(dropdownId);
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown.active').forEach(dd => {
                if (dd.id !== dropdownId) {
                    dd.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
    
    // Prevent dropdown from closing when clicking inside it
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// Generate breadcrumb navigation
function generateBreadcrumbs(currentPage, parentPages = []) {
    const breadcrumbContainer = document.querySelector('.breadcrumb-path');
    if (!breadcrumbContainer) return;
    
    let breadcrumbHTML = '<a href="index.html">Home</a>';
    
    // Add parent pages
    parentPages.forEach(page => {
        breadcrumbHTML += ` &gt; <a href="${page.url}">${page.name}</a>`;
    });
    
    // Add current page
    breadcrumbHTML += ` &gt; <span>${currentPage}</span>`;
    
    breadcrumbContainer.innerHTML = breadcrumbHTML;
}

// Generate page navigation (prev/next)
function generatePageNavigation(currentPageId) {
    const pageNavContainer = document.querySelector('.page-navigation');
    if (!pageNavContainer) return;
    
    const currentIndex = navigationPages.findIndex(page => page.id === currentPageId);
    if (currentIndex === -1) return;
    
    const prevPage = currentIndex > 0 ? navigationPages[currentIndex - 1] : null;
    const nextPage = currentIndex < navigationPages.length - 1 ? navigationPages[currentIndex + 1] : null;
    
    let navHTML = '';
    
    if (prevPage) {
        navHTML += `
            <a href="${prevPage.url}" class="nav-button secondary">
                ← Previous: ${prevPage.name}
            </a>
        `;
    } else {
        navHTML += '<div></div>';
    }
    
    if (nextPage) {
        navHTML += `
            <a href="${nextPage.url}" class="nav-button">
                Next: ${nextPage.name} →
            </a>
        `;
    } else {
        navHTML += '<div></div>';
    }
    
    pageNavContainer.innerHTML = navHTML;
}

// Utility function to create status badges
function createStatusBadge(status, text) {
    return `<span class="status-badge status-${status}">${text}</span>`;
}

// Utility function to create comparison tables
function createComparisonTable(data, headers) {
    let tableHTML = '<table class="comparison-table"><thead><tr>';
    
    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    
    tableHTML += '</tr></thead><tbody>';
    
    data.forEach(row => {
        tableHTML += '<tr>';
        row.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += '</tr>';
    });
    
    tableHTML += '</tbody></table>';
    
    return tableHTML;
}

// Export utility functions for use in individual pages
window.NavigationUtils = {
    generateBreadcrumbs,
    generatePageNavigation,
    createStatusBadge,
    createComparisonTable,
    navigationPages
};