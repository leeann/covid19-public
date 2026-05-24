/**
 * Creates legend visualizations for the COVID-19 feather dashboard
 */

function createFeatherLegend() {
    const svg = d3.select('#covid-chart-legend')
        .append('svg')
        .attr('width', 300)
        .attr('height', 400);

    // Create a sample feather legend
    const g = svg.append('g')
        .attr('transform', 'translate(150, 150)');

    const centerRadius = 40;
    const ringRadius = 60;
    const stateAngle = Math.PI / 6; // 30 degrees

    // Draw rings
    for (let i = 0; i < 3; i++) {
        g.append('circle')
            .attr('r', centerRadius + (i * 20))
            .attr('fill', 'none')
            .attr('stroke', '#ddd')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '2,2')
            .attr('opacity', 0.5);
    }

    // Draw radial lines
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI - Math.PI / 2;
        const x1 = Math.cos(angle) * centerRadius;
        const y1 = Math.sin(angle) * centerRadius;
        const x2 = Math.cos(angle) * ringRadius;
        const y2 = Math.sin(angle) * ringRadius;

        g.append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)
            .attr('stroke', '#ddd')
            .attr('stroke-width', 0.5)
            .attr('opacity', 0.3);
    }

    // Draw sample arcs for each metric
    const sampleArc = d3.arc()
        .innerRadius(centerRadius)
        .outerRadius(centerRadius + 8)
        .startAngle(-stateAngle / 2)
        .endAngle(stateAngle / 2);

    // Cases
    g.append('path')
        .attr('d', sampleArc)
        .attr('fill', '#3b82f6')
        .attr('opacity', 0.7);

    // Deaths
    g.append('path')
        .attr('d', d3.arc()
            .innerRadius(centerRadius + 10)
            .outerRadius(centerRadius + 18)
            .startAngle(-stateAngle / 2)
            .endAngle(stateAngle / 2))
        .attr('fill', '#dc2626')
        .attr('opacity', 0.7);

    // Vaccination
    g.append('path')
        .attr('d', d3.arc()
            .innerRadius(centerRadius + 20)
            .outerRadius(centerRadius + 28)
            .startAngle(-stateAngle / 2)
            .endAngle(stateAngle / 2))
        .attr('fill', '#16a34a')
        .attr('opacity', 0.7);

    // Add annotations
    svg.append('text')
        .attr('x', 150)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', '500')
        .text('Sample State Feather');

    // Legend
    const legendY = 300;
    const legendItems = [
        { label: 'Cases', color: '#3b82f6' },
        { label: 'Deaths', color: '#dc2626' },
        { label: 'Vaccination %', color: '#16a34a' }
    ];

    legendItems.forEach((item, i) => {
        svg.append('rect')
            .attr('x', 30)
            .attr('y', legendY + (i * 25))
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', item.color)
            .attr('opacity', 0.7);

        svg.append('text')
            .attr('x', 50)
            .attr('y', legendY + (i * 25) + 10)
            .attr('font-size', '12px')
            .text(item.label);
    });

    // Time period explanation
    svg.append('text')
        .attr('x', 150)
        .attr('y', 380)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('fill', '#999')
        .text('Rings = Time Periods');
}

function createColorLegend() {
    const svg = d3.select('#covid-color-legend')
        .append('svg')
        .attr('width', 300)
        .attr('height', 400);

    const metrics = [
        {
            title: 'COVID-19 Cases',
            description: 'Total confirmed cases per state',
            colors: ['#93c5fd', '#3b82f6', '#1e40af'],
            labels: ['Low', 'Medium', 'High']
        },
        {
            title: 'Deaths',
            description: 'Total deaths attributed to COVID-19',
            colors: ['#fca5a5', '#dc2626', '#991b1b'],
            labels: ['Low', 'Medium', 'High']
        },
        {
            title: 'Vaccination Rate',
            description: 'Percentage of population vaccinated',
            colors: ['#86efac', '#16a34a', '#15803d'],
            labels: ['Low', 'Medium', 'High']
        }
    ];

    let yOffset = 30;

    metrics.forEach((metric, idx) => {
        // Title
        svg.append('text')
            .attr('x', 20)
            .attr('y', yOffset)
            .attr('font-size', '13px')
            .attr('font-weight', '500')
            .attr('fill', '#333')
            .text(metric.title);

        yOffset += 20;

        // Description
        svg.append('text')
            .attr('x', 20)
            .attr('y', yOffset)
            .attr('font-size', '11px')
            .attr('fill', '#888')
            .text(metric.description);

        yOffset += 18;

        // Color gradient
        metric.colors.forEach((color, colorIdx) => {
            svg.append('rect')
                .attr('x', 20 + (colorIdx * 75))
                .attr('y', yOffset)
                .attr('width', 70)
                .attr('height', 20)
                .attr('fill', color)
                .attr('stroke', '#ddd')
                .attr('stroke-width', 0.5);

            svg.append('text')
                .attr('x', 20 + (colorIdx * 75) + 35)
                .attr('y', yOffset + 25)
                .attr('text-anchor', 'middle')
                .attr('font-size', '10px')
                .attr('fill', '#666')
                .text(metric.labels[colorIdx]);
        });

        yOffset += 50;
    });

    // Data period note
    svg.append('text')
        .attr('x', 20)
        .attr('y', yOffset + 20)
        .attr('font-size', '11px')
        .attr('font-style', 'italic')
        .attr('fill', '#999')
        .text('Colors represent intensity of metric');

    svg.append('text')
        .attr('x', 20)
        .attr('y', yOffset + 35)
        .attr('font-size', '11px')
        .attr('font-style', 'italic')
        .attr('fill', '#999')
        .text('within time periods');
}

// Initialize legends when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFeatherLegend();
    createColorLegend();
});
