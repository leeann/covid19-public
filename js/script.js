/**
 * Main script for COVID-19 Dashboard
 * Initializes all visualization components and handles interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('COVID-19 Malaysia Dashboard Initialized');
    
    // All components are initialized via their respective scripts:
    // - createStateFeather.js: Main radial feather visualization
    // - createLegends.js: Legend visualizations
    // - createTimelineAnnotations.js: Event timeline
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        // Redraw visualization on resize if needed
        const chart = document.getElementById('covid-chart');
        if (chart && chart.querySelector('svg')) {
            // You might want to redraw the visualization here
            console.log('Window resized');
        }
    }, 250));

    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});

// Global tooltip management
function updateTooltipPosition(event) {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.classList.contains('active')) {
        const x = event.pageX + 10;
        const y = event.pageY + 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
}

document.addEventListener('mousemove', updateTooltipPosition);

// Export functions for potential external use
window.CovidDashboard = {
    updateTooltipPosition,
    toggleAnnotations: function() {
        const annotations = document.getElementById('timeline-annotations');
        if (annotations) {
            annotations.style.display = 
                annotations.style.display === 'none' ? 'block' : 'none';
        }
    }
};

console.log('COVID-19 Dashboard ready. Use window.CovidDashboard for interactions.');
