// FILE: assets/js/main.js
(function () {
    // Smooth reveal on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealTargets = document.querySelectorAll(
        '.problem-card, .feature, .pyramid-level, .phase-card, .metric, .advantage, .target-row'
    );

    revealTargets.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stagger animation for grid items
    const grids = document.querySelectorAll(
        '.problem-grid, .solution-features, .market-pyramid, .investment-grid, .metrics-grid, .advantages-grid, .market-targets'
    );

    grids.forEach((grid) => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
})();

