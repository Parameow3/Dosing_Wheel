const numberRotating = document.querySelector('.number-rotating');
const slider = document.getElementById('rotationSlider');
const input = document.getElementById('rotationInput');

slider.addEventListener('input', (e) => {
    const rotationValue = e.target.value;
    numberRotating.style.transform = `rotate(${rotationValue}deg)`; // Apply rotation to numbers
    input.value = rotationValue;
});

input.addEventListener('input', (e) => {
    const rotationValue = e.target.value;
    numberRotating.style.transform = `rotate(${rotationValue}deg)`; // Apply rotation to numbers
    slider.value = rotationValue;
});

window.addEventListener('resize', function() {
    // Example: Adjust rotation speed based on screen size
    const wheel = document.querySelector('.number-rotating');
    const newSize = window.innerWidth;

    // Dynamically control features based on size if needed
    if (newSize < 600) {
        // Adjust rotation or other properties for smaller screens
    } else {
        // Adjust for larger screens
    }
});

// newwwwwwwwwwwwwwwwwwwwwwwww

document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.number-rotating');
    let currentAngle = 0;

    // Control Option 1: Value Input Mapping
    const valueInput = document.querySelector('#rotationInput');
    valueInput.addEventListener('input', (e) => {
        const inputValue = parseFloat(e.target.value); // Assuming value is 0-360
        currentAngle = inputValue;
        wheel.style.transform = `rotate(${currentAngle}deg)`;
    });

    // Control Option 2: Drag to Spin
    let isDragging = false;
    let startX;
    let startAngle;

    wheel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startAngle = currentAngle;
        e.preventDefault(); // Prevent text selection
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            currentAngle = startAngle + deltaX; // Adjust sensitivity if needed
            wheel.style.transform = `rotate(${currentAngle}deg)`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    // For touch devices
    wheel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startAngle = currentAngle;
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - startX;
            currentAngle = startAngle + deltaX;
            wheel.style.transform = `rotate(${currentAngle}deg)`;
        }
    });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    // Control Option 3: Spin Button (Random Spin)
    const spinButton = document.querySelector('#spinButton');
    spinButton.addEventListener('click', () => {
        const randomSpin = Math.floor(Math.random() * 3600) + 360; // 3600 ensures multiple rotations
        currentAngle += randomSpin;
        wheel.style.transition = 'transform 4s ease-out'; // Smooth spin animation
        wheel.style.transform = `rotate(${currentAngle}deg)`;

        // Reset transition after spin
        setTimeout(() => {
            wheel.style.transition = '';
        }, 4000);
    });
});
