/**
 * Creates the main COVID-19 feather visualization for Malaysian states
 * Inspired by the Olympic Feathers visualization
 */

function createStateFeather(data) {
    // Configuration
    const config = {
        width: document.getElementById('covid-chart').clientWidth || 1000,
        height: document.getElementById('covid-chart').clientHeight || 800,
        centerRadius: 80,
        maxRadius: 400,
        rotationOffset: Math.PI / 2
    };

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const chartWidth = config.width - margin.left - margin.right;
    const chartHeight = config.height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select('#covid-chart')
        .append('svg')
        .attr('width', config.width)
        .attr('height', config.height);

    const g = svg.append('g')
        .attr('transform', `translate(${chartWidth / 2 + margin.left},${chartHeight / 2 + margin.top})`);

    // Color scales
    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['#93c5fd', '#1e40af']); // Light blue to dark blue for cases

    const deathColorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['#fca5a5', '#991b1b']); // Light red to dark red for deaths

    const vaccinationColorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['#86efac', '#15803d']); // Light green to dark green for vaccinations

    // Draw background grid circles
    const rings = [config.centerRadius, config.centerRadius + 80, config.centerRadius + 160, 
                   config.centerRadius + 240, config.centerRadius + 320];
    
    g.selectAll('.time-ring')
        .data(rings)
        .enter()
        .append('circle')
        .attr('class', 'time-ring')
        .attr('r', d => d)
        .attr('fill', 'none')
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2');

    // Add radial grid lines (for time periods)
    const numPeriods = 12; // Months or quarters
    for (let i = 0; i < numPeriods; i++) {
        const angle = (i / numPeriods) * 2 * Math.PI - Math.PI / 2;
        const x1 = Math.cos(angle) * config.centerRadius;
        const y1 = Math.sin(angle) * config.centerRadius;
        const x2 = Math.cos(angle) * config.maxRadius;
        const y2 = Math.sin(angle) * config.maxRadius;

        g.append('line')
            .attr('class', 'time-line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)
            .attr('stroke', '#e5e7eb')
            .attr('stroke-width', 0.5)
            .attr('opacity', 0.3);
    }

    // Sample data - in production, this would come from your COVID-19 CSV data
    const states = [
        'Selangor', 'Kuala Lumpur', 'Johor', 'Sabah', 'Sarawak', 
        'Penang', 'Perak', 'Pahang', 'Kedah', 'Terengganu', 
        'Kelantan', 'Negeri Sembilan', 'Melaka', 'Perlis', 'Putrajaya'
    ];

    const numStates = states.length;
    const angleSlice = (2 * Math.PI) / numStates;

    // Create feather for each state
    states.forEach((state, idx) => {
        const startAngle = idx * angleSlice - Math.PI / 2;

        // Create a group for this state's feather
        const featherGroup = g.append('g')
            .attr('class', 'state-feather')
            .attr('data-state', state);

        // Sample arc data (in production, aggregate COVID data by state and time period)
        const timeData = [
            { period: 'Q1 2020', cases: 30, deaths: 0, vaccination: 0 },
            { period: 'Q2 2020', cases: 150, deaths: 3, vaccination: 0 },
            { period: 'Q3 2020', cases: 450, deaths: 10, vaccination: 0 },
            { period: 'Q4 2020', cases: 800, deaths: 25, vaccination: 5 },
            { period: 'Q1 2021', cases: 1200, deaths: 50, vaccination: 15 },
            { period: 'Q2 2021', cases: 900, deaths: 40, vaccination: 40 }
        ];

        // Normalize data
        const maxCases = 1200;
        const maxDeaths = 60;
        const maxVaccination = 100;

        // Create radial bars for each metric
        timeData.forEach((d, timeIdx) => {
            const ringStartRadius = config.centerRadius + (timeIdx * 60);
            const ringEndRadius = ringStartRadius + 50;

            const arcAngle = angleSlice * 0.9; // Leave gap between states
            const caseHeight = (d.cases / maxCases) * 15;
            const deathHeight = (d.deaths / maxDeaths) * 15;
            const vaccinationHeight = (d.vaccination / maxVaccination) * 15;

            // Cases arc
            const casesArc = d3.arc()
                .innerRadius(ringStartRadius)
                .outerRadius(ringStartRadius + caseHeight)
                .startAngle(startAngle)
                .endAngle(startAngle + arcAngle);

            featherGroup.append('path')
                .attr('class', 'feather-segment cases-segment')
                .attr('d', casesArc)
                .attr('fill', colorScale(d.cases / maxCases))
                .attr('data-period', d.period)
                .attr('data-cases', d.cases)
                .attr('data-deaths', d.deaths)
                .attr('data-vaccination', d.vaccination)
                .on('mouseover', function(event) {
                    showTooltip(event, state, d);
                })
                .on('mouseout', hideTooltip);

            // Deaths arc (offset slightly)
            const deathsArc = d3.arc()
                .innerRadius(ringStartRadius + caseHeight + 2)
                .outerRadius(ringStartRadius + caseHeight + 2 + deathHeight)
                .startAngle(startAngle)
                .endAngle(startAngle + arcAngle);

            featherGroup.append('path')
                .attr('class', 'feather-segment deaths-segment')
                .attr('d', deathsArc)
                .attr('fill', deathColorScale(d.deaths / maxDeaths))
                .attr('data-period', d.period)
                .attr('data-cases', d.cases)
                .attr('data-deaths', d.deaths)
                .attr('data-vaccination', d.vaccination)
                .on('mouseover', function(event) {
                    showTooltip(event, state, d);
                })
                .on('mouseout', hideTooltip);

            // Vaccination arc
            const vaccinationArc = d3.arc()
                .innerRadius(ringStartRadius + caseHeight + deathHeight + 4)
                .outerRadius(ringStartRadius + caseHeight + deathHeight + 4 + vaccinationHeight)
                .startAngle(startAngle)
                .endAngle(startAngle + arcAngle);

            featherGroup.append('path')
                .attr('class', 'feather-segment vaccination-segment')
                .attr('d', vaccinationArc)
                .attr('fill', vaccinationColorScale(d.vaccination / maxVaccination))
                .attr('data-period', d.period)
                .attr('data-cases', d.cases)
                .attr('data-deaths', d.deaths)
                .attr('data-vaccination', d.vaccination)
                .on('mouseover', function(event) {
                    showTooltip(event, state, d);
                })
                .on('mouseout', hideTooltip);
        });

        // Add state label
        const labelAngle = startAngle + angleSlice / 2;
        const labelRadius = config.maxRadius + 50;
        const labelX = Math.cos(labelAngle) * labelRadius;
        const labelY = Math.sin(labelAngle) * labelRadius;

        featherGroup.append('text')
            .attr('class', 'feather-label')
            .attr('x', labelX)
            .attr('y', labelY)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.3em')
            .attr('font-size', '11px')
            .attr('fill', '#666')
            .text(state);
    });

    // Tooltip functions
    function showTooltip(event, state, data) {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.add('active');
        
        tooltip.querySelector('.tooltip-state').textContent = `State: ${state}`;
        tooltip.querySelector('.tooltip-metric').textContent = `Period: ${data.period}`;
        tooltip.querySelector('.tooltip-rule').textContent = '─'.repeat(30);
        tooltip.querySelector('#tooltip-cases').innerHTML = `<strong>Cases:</strong> ${data.cases.toLocaleString()}`;
        tooltip.querySelector('#tooltip-deaths').innerHTML = `<strong>Deaths:</strong> ${data.deaths.toLocaleString()}`;
        tooltip.querySelector('#tooltip-vaccination').innerHTML = `<strong>Vaccinated:</strong> ${data.vaccination}%`;

        const x = event.pageX + 10;
        const y = event.pageY + 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    function hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('active');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // In production, load your COVID-19 CSV data here
    // For now, createStateFeather will use sample data
    createStateFeather(null);
});
