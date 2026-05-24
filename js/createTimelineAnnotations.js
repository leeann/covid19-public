/**
 * Creates timeline annotations for major COVID-19 events in Malaysia
 */

function createTimelineAnnotations() {
    // Major COVID-19 events in Malaysia timeline
    const events = [
        {
            date: '2020-01-25',
            label: 'First Case',
            description: 'First COVID-19 case confirmed in Malaysia'
        },
        {
            date: '2020-03-18',
            label: 'MCO Begins',
            description: 'Movement Control Order (MCO) implemented nationwide'
        },
        {
            date: '2020-06-10',
            label: 'Phase 1 Opens',
            description: 'Conditional Movement Control Order (CMCO) begins, Phase 1 recovery'
        },
        {
            date: '2021-02-24',
            label: 'Vaccination Starts',
            description: 'COVID-19 vaccination program begins in Malaysia'
        },
        {
            date: '2021-06-01',
            label: 'Vaccination Peak',
            description: 'Vaccination rate reaches high coverage across states'
        }
    ];

    // Create annotation sidebar
    const annotationContainer = document.createElement('div');
    annotationContainer.id = 'timeline-annotations';
    annotationContainer.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 250px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 20px;
        max-height: 70vh;
        overflow-y: auto;
        font-family: 'Roboto', sans-serif;
        z-index: 100;
        border-left: 4px solid #dc2626;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Major Events';
    title.style.cssText = `
        margin: 0 0 15px 0;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        border-bottom: 2px solid #dc2626;
        padding-bottom: 10px;
    `;
    annotationContainer.appendChild(title);

    events.forEach((event, idx) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.style.cssText = `
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        `;

        if (idx === events.length - 1) {
            eventElement.style.borderBottom = 'none';
        }

        const dateElement = document.createElement('div');
        dateElement.style.cssText = `
            font-size: 11px;
            color: #dc2626;
            font-weight: 500;
            margin-bottom: 3px;
        `;
        dateElement.textContent = event.date;

        const labelElement = document.createElement('div');
        labelElement.style.cssText = `
            font-size: 12px;
            font-weight: 500;
            color: #333;
            margin-bottom: 3px;
        `;
        labelElement.textContent = event.label;

        const descElement = document.createElement('div');
        descElement.style.cssText = `
            font-size: 11px;
            color: #666;
            line-height: 1.4;
        `;
        descElement.textContent = event.description;

        eventElement.appendChild(dateElement);
        eventElement.appendChild(labelElement);
        eventElement.appendChild(descElement);
        annotationContainer.appendChild(eventElement);
    });

    document.body.appendChild(annotationContainer);

    // Hide on mobile
    if (window.innerWidth < 1024) {
        annotationContainer.style.display = 'none';
    }

    // Responsive
    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            annotationContainer.style.display = 'none';
        } else {
            annotationContainer.style.display = 'block';
        }
    });
}

// Initialize annotations when page loads
document.addEventListener('DOMContentLoaded', function() {
    createTimelineAnnotations();
});
