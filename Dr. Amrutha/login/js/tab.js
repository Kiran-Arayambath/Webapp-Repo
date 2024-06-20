document.addEventListener('DOMContentLoaded', (event) => {
    const selectElement = document.getElementById('colours');

    selectElement.addEventListener('change', function() {
        const selectedGradient = selectElement.value;
        selectElement.style.background = selectedGradient;
    });

    // Trigger change event on load to set initial gradient
    const eventInit = new Event('change');
    selectElement.dispatchEvent(eventInit);
});
