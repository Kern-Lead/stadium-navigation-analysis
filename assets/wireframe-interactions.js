// Wireframe Interaction Scripts for Stadium Navigation Analysis

// Initialize wireframe interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWireframeDropdowns();
});

// Initialize dropdown interactions for wireframes
function initializeWireframeDropdowns() {
    const dropdownButtons = document.querySelectorAll('[data-dropdown-wireframe]');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownId = this.getAttribute('data-dropdown-wireframe');
            const dropdown = document.getElementById(dropdownId);
            
            // Close all other dropdowns
            document.querySelectorAll('.wireframe-dropdown.active').forEach(dd => {
                if (dd.id !== dropdownId) {
                    dd.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            if (dropdown) {
                dropdown.classList.toggle('active');
                
                // Update button state
                const isActive = dropdown.classList.contains('active');
                this.style.backgroundColor = isActive ? '#e5e7eb' : '';
                this.style.borderColor = isActive ? '#9ca3af' : '#d1d5db';
            }
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.style.backgroundColor) {
                this.style.backgroundColor = '#f3f4f6';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const dropdown = document.getElementById(this.getAttribute('data-dropdown-wireframe'));
            if (!dropdown || !dropdown.classList.contains('active')) {
                this.style.backgroundColor = '';
                this.style.borderColor = '#d1d5db';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.wireframe-dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Reset button states
        document.querySelectorAll('[data-dropdown-wireframe]').forEach(button => {
            button.style.backgroundColor = '';
            button.style.borderColor = '#d1d5db';
        });
    });
    
    // Prevent dropdown from closing when clicking inside it
    document.querySelectorAll('.wireframe-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// Utility function to highlight demo interactions
function highlightDemo(elementId, duration = 2000) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.boxShadow = '0 0 0 3px #fbbf24';
        element.style.transition = 'box-shadow 0.3s ease';
        
        setTimeout(() => {
            element.style.boxShadow = '';
        }, duration);
    }
}

// Demo interaction functions for guided tours
function demoEnterpriseFlow() {
    highlightDemo('solutions-dropdown-button');
    setTimeout(() => {
        document.getElementById('solutions-dropdown-button').click();
        setTimeout(() => {
            highlightDemo('solutions-by-team');
        }, 500);
    }, 1000);
}

function demoHRFlow() {
    highlightDemo('solutions-dropdown-button');
    setTimeout(() => {
        document.getElementById('solutions-dropdown-button').click();
        setTimeout(() => {
            highlightDemo('hr-team-link');
        }, 500);
    }, 1000);
}

function demoPlatformFeatures() {
    highlightDemo('platform-dropdown-button');
    setTimeout(() => {
        document.getElementById('platform-dropdown-button').click();
        setTimeout(() => {
            highlightDemo('enterprise-features');
        }, 500);
    }, 1000);
}

// Comparison view toggling
function toggleComparisonView() {
    const currentView = document.querySelector('.wireframe-container.active');
    const proposedView = document.querySelector('.wireframe-container.proposed');
    
    if (currentView && proposedView) {
        currentView.style.display = currentView.style.display === 'none' ? 'block' : 'none';
        proposedView.style.display = proposedView.style.display === 'none' ? 'block' : 'none';
    }
}

// Export functions for use in wireframe pages
window.WireframeUtils = {
    highlightDemo,
    demoEnterpriseFlow,
    demoHRFlow,
    demoPlatformFeatures,
    toggleComparisonView
};