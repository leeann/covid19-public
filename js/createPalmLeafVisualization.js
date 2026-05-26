/**
 * Creates Palm Oil Leaf visualization for COVID-19 data
 * Inspired by Malaysia's iconic palm oil industry
 * 
 * Design principles:
 * - Each state = one frond (radial arrangement)
 * - Leaflets (pinnae) branch from central rachis
 * - Each leaflet = one time period
 * - Three colored layers per leaflet = cases, deaths, vaccination
 */

function createPalmLeafVisualization(data) {
    // Configuration
    const config = {
        width: document.getElementById('covid-chart').clientWidth || 1000,
        height: document.getElementById('covid-chart').clientHeight || 800,
        centerX: 0,
        centerY: 0,
        frondLength: 350,
        leafletCount: 6,
        stateCount: 15
    };

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const chartWidth = config.width - margin.left - margin.right;
    const chartHeight = config.height - margin.top - margin.bottom;

    // Create main SVG
    const svg = d3.select('#covid-chart')
        .append('svg')
        .attr('width', config.width)
        .attr('height', config.height)
        .attr('class', 'palm-visualization');

    // Main group centered
    const g = svg.append('g')
        .attr('transform', `translate(${chartWidth / 2 + margin.left},${chartHeight / 2 + margin.top})`)
        .attr('class', 'palm-group');

    // Add decorative background circle (plantation pattern)
    g.append('circle')
        .attr('r', config.frondLength + 50)
        .attr('fill', 'none')
        .attr('stroke', '#e8f4e8')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.3);

    // Color scales for metrics
    const casesScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['#93c5fd', '#1e40af']); // Light to dark blue

    const deathScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['#fca5a5', '#991b1b']); // Light to dark red

    const vaccinationScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['#86efac', '#15803d']); // Light to dark green

    // Malaysian states
    const states = [
        'Selangor', 'Kuala Lumpur', 'Johor', 'Sabah', 'Sarawak', 
        'Penang', 'Perak', 'Pahang', 'Kedah', 'Terengganu', 
        'Kelantan', 'Negeri Sembilan', 'Melaka', 'Perlis', 'Putrajaya'
    ];

    const angleSlice = (2 * Math.PI) / states.length;

    // Sample time periods
    const timePeriods = [
        { period: 'Q1 2020', cases: 0.1, deaths: 0.0, vaccination: 0.0 },
        { period: 'Q2 2020', cases: 0.3, deaths: 0.05, vaccination: 0.0 },
        { period: 'Q3 2020', cases: 0.5, deaths: 0.15, vaccination: 0.0 },
        { period: 'Q4 2020', cases: 0.7, deaths: 0.3, vaccination: 0.05 },
        { period: 'Q1 2021', cases: 0.9, deaths: 0.5, vaccination: 0.2 },
        { period: 'Q2 2021', cases: 0.8, deaths: 0.4, vaccination: 0.6 }
    ];

    // Create fronds for each state
    states.forEach((state, stateIdx) => {
        const frondAngle = stateIdx * angleSlice;
        const frondGroup = g.append('g')
            .attr('class', 'frond')
            .attr('data-state', state)
            .attr('transform', `rotate(${frondAngle * 180 / Math.PI})`);

        // Draw central rachis (stem)
        frondGroup.append('line')
            .attr('class', 'rachis')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -config.frondLength)
            .attr('stroke', '#2d5016')
            .attr('stroke-width', 3)
            .attr('opacity', 0.6)
            .attr('stroke-linecap', 'round');

        // Create leaflets along rachis
        timePeriods.forEach((period, leafletIdx) => {
            const leafletPosition = (leafletIdx + 1) / (timePeriods.length + 1);
            const rachisY = -config.frondLength * leafletPosition;
            const leafletLength = 40 * (1 + leafletIdx * 0.15); // Longer toward tip
            const leafletAngle = 35; // Angle from rachis in degrees

            // Normalize data values (0-1)
            const casesNorm = period.cases;
            const deathNorm = period.deaths;
            const vaccNorm = period.vaccination;

            // Calculate leaflet dimensions
            const baseWidth = 6;
            const caseWidth = baseWidth + (casesNorm * 8);
            const deathWidth = baseWidth + (deathNorm * 8);
            const vaccWidth = baseWidth + (vaccNorm * 8);

            // Create leaflet group (left side of rachis)
            const leafletLeft = frondGroup.append('g')
                .attr('class', 'leaflet-group left')
                .attr('data-period', period.period)
                .attr('data-index', leafletIdx);

            // Left leaflet - Cases (blue)
            createLeaflet(leafletLeft, rachisY, leafletLength, caseWidth, -leafletAngle, 
                          casesScale(casesNorm), 'cases', period, state);

            // Left leaflet - Deaths (red, inside)
            createLeaflet(leafletLeft, rachisY, leafletLength * 0.85, deathWidth, -leafletAngle,
                          deathScale(deathNorm), 'deaths', period, state);

            // Left leaflet - Vaccination (green, innermost)
            createLeaflet(leafletLeft, rachisY, leafletLength * 0.7, vaccWidth, -leafletAngle,
                          vaccinationScale(vaccNorm), 'vaccination', period, state);

            // Create leaflet group (right side of rachis) - Mirror
            const leafletRight = frondGroup.append('g')
                .attr('class', 'leaflet-group right')
                .attr('data-period', period.period)
                .attr('data-index', leafletIdx);

            // Right leaflet - Cases (blue)
            createLeaflet(leafletRight, rachisY, leafletLength, caseWidth, leafletAngle,
                          casesScale(casesNorm), 'cases', period, state);

            // Right leaflet - Deaths (red, inside)
            createLeaflet(leafletRight, rachisY, leafletLength * 0.85, deathWidth, leafletAngle,
                          deathScale(deathNorm), 'deaths', period, state);

            // Right leaflet - Vaccination (green, innermost)
            createLeaflet(leafletRight, rachisY, leafletLength * 0.7, vaccWidth, leafletAngle,
                          vaccinationScale(vaccNorm), 'vaccination', period, state);
        });

        // Add state label
        const labelRadius = config.frondLength + 60;
        const labelX = labelRadius * Math.sin(frondAngle);
        const labelY = -labelRadius * Math.cos(frondAngle);

        frondGroup.append('text')
            .attr('class', 'state-label')
            .attr('x', labelX)
            .attr('y', labelY)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.3em')
            .attr('font-size', '11px')
            .attr('font-weight', '500')
            .attr('fill', '#1f2937')
            .text(state)
            .style('pointer-events', 'none');
    });

    // Helper function to create individual leaflets
    function createLeaflet(group, startY, length, width, angle, color, metric, period, state) {
        const angleRad = angle * Math.PI / 180;
        
        // Leaflet tip position
        const tipX = length * Math.sin(angleRad);
        const tipY = startY - length * Math.cos(angleRad);

        // Leaflet base positions (left and right edges)
        const baseLeftX = (width / 2) * Math.cos(angleRad);
        const baseLeftY = startY + (width / 2) * Math.sin(angleRad);
        
        const baseRightX = -(width / 2) * Math.cos(angleRad);
        const baseRightY = startY - (width / 2) * Math.sin(angleRad);

        // Create path for leaflet with taper toward tip
        const leafletPath = `
            M ${baseLeftX} ${baseLeftY}
            Q ${tipX * 0.6} ${startY + (tipY - startY) * 0.5} ${tipX} ${tipY}
            Q ${tipX * 0.6} ${startY + (tipY - startY) * 0.5} ${baseRightX} ${baseRightY}
            Z
        `;

        const leaflet = group.append('path')
            .attr('class', `leaflet ${metric}`)
            .attr('d', leafletPath)
            .attr('fill', color)
            .attr('opacity', 0.8)
            .attr('stroke', 'rgba(255,255,255,0.3)')
            .attr('stroke-width', 0.5)
            .style('cursor', 'pointer')
            .on('mouseover', function(event) {
                showPalmTooltip(event, state, period, metric);
                d3.select(this).attr('opacity', 1).attr('filter', 'drop-shadow(0 0 3px rgba(0,0,0,0.3))');
            })
            .on('mouseout', function() {
                hidePalmTooltip();
                d3.select(this).attr('opacity', 0.8).attr('filter', 'none');
            });
    }

    // Tooltip functions
    function showPalmTooltip(event, state, period, metric) {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.add('active');
        
        const metricLabels = {
            'cases': `COVID-19 Cases: ${(period.cases * 1000).toFixed(0)}`,
            'deaths': `Deaths: ${(period.deaths * 100).toFixed(0)}`,
            'vaccination': `Vaccination Rate: ${(period.vaccination * 100).toFixed(1)}%`
        };

        tooltip.querySelector('.tooltip-state').textContent = `State: ${state}`;
        tooltip.querySelector('.tooltip-metric').textContent = `Period: ${period.period}`;
        tooltip.querySelector('.tooltip-rule').textContent = '─'.repeat(30);
        tooltip.querySelector('#tooltip-cases').innerHTML = `<strong>Estimated Cases:</strong> ${(period.cases * 1000).toFixed(0)}`;
        tooltip.querySelector('#tooltip-deaths').innerHTML = `<strong>Estimated Deaths:</strong> ${(period.deaths * 100).toFixed(0)}`;
        tooltip.querySelector('#tooltip-vaccination').innerHTML = `<strong>Vaccination Coverage:</strong> ${(period.vaccination * 100).toFixed(1)}%`;
        tooltip.querySelector('#tooltip-period').innerHTML = `<strong>Metric:</strong> ${metric.charAt(0).toUpperCase() + metric.slice(1)}`;

        const x = event.pageX + 10;
        const y = event.pageY + 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    function hidePalmTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('active');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    createPalmLeafVisualization(null);
});
