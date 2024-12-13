// Map the pain levels to their corresponding degree ranges
const painLevelDegrees = {
    0: { min: 152, max: 208 },
    1: { min: 93, max: 148 },
    2: { min: 32, max: 88 },
    3: { min: 332, max: 388 },
    4: { min: 272, max: 328 },
    5: { min: 212, max: 268 }
};

// List of predefined angles
const angles = [
    32, 37, 42, 46, 51, 55, 60, 65, 69, 74, 79, 83, 88, 93, 97, 101,
    106, 111, 115, 120, 125, 129, 134, 139, 143, 148, 152, 157, 162, 167,
    171, 176, 181, 185, 190, 194, 199, 203, 208, 212, 217, 222, 226, 231,
    236, 240, 245, 250, 254, 259, 263, 268, 272, 277, 282, 286, 291, 295,
    300, 305, 310, 314, 319, 323, 328, 332, 337, 342, 346, 351, 356, 360,
    365, 370, 374, 378, 383, 388
];

// Update displayed values
document.getElementById('painLevelSelect').addEventListener('input', function() {
    document.getElementById('painLevelOutput').value = this.value;
});
document.getElementById('rotationSlider').addEventListener('input', function() {
    document.getElementById('rotationOutput').value = this.value;
});

// Cache the rotating number element
const rotatingNumber = document.querySelector('.number-rotating');
const rotationSlider = document.getElementById('rotationSlider');

// Function to get angles within the range for the selected pain level
function getAnglesForPainLevel(painLevel) {
    const range = painLevelDegrees[painLevel];
    return angles.filter(angle => angle >= range.min && angle <= range.max);
}

// Function to find the closest angle in a specific range
function getClosestAngle(value, angleRange) {
    return angleRange.reduce((a, b) => Math.abs(b - value) < Math.abs(a - value) ? b : a);
}

// Modified function to set rotation based on the nearest angle in the pain level range
function setRotationForPainLevel(painLevel, sliderValue) {
    const level = painLevelDegrees[painLevel];
    const rotationRange = level.max - level.min;
    const targetDegree = level.min + (rotationRange * sliderValue / 100);

    // Find the nearest angle within the pain level's range
    const angleRange = getAnglesForPainLevel(painLevel);
    const closestAngle = getClosestAngle(targetDegree, angleRange);

    // Apply the calculated rotation (snapped to nearest angle) to the element
    rotatingNumber.style.transform = `rotate(${closestAngle}deg)`;
}

// Function to update slider based on selected pain level
function updateSliderForPainLevel(painLevel) {
    // Reset the slider to 0 when switching levels
    rotationSlider.value = 0;

    // Store the selected pain level in a data attribute for future reference
    rotationSlider.dataset.painLevel = painLevel;

    // Immediately set rotation to reflect the first angle in the range
    setRotationForPainLevel(painLevel, 0);
}

// Handle slider input for real-time rotation update
rotationSlider.addEventListener('input', function() {
    const sliderValue = rotationSlider.value; // Get the slider value (0 to 100)
    const selectedLevel = parseInt(rotationSlider.dataset.painLevel); // Get the current pain level

    // Update rotation based on the current slider value and pain level
    setRotationForPainLevel(selectedLevel, sliderValue);
});

document.querySelectorAll('.range-slider input[type="range"]').forEach((slider) => {
    slider.addEventListener('input', (e) => {
        const label = e.target.nextElementSibling; // Select the label
        label.textContent = e.target.value; // Update label content
        const percent = ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100;
        label.style.left = `calc(${percent}% - ${label.offsetWidth / 2}px)`; // Center the label dynamically
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const painLevelSlider = document.getElementById('painLevelSelect');
    const painLevelLabel = document.getElementById('painLevelLabel');
    const painLevelNumbers = document.querySelectorAll('.pain-level-numbers span');

    function updateSelectedPainLevel(value) {
        // Remove the 'selected' class from all numbers
        painLevelNumbers.forEach((number, index) => {
            number.classList.toggle('selected', index === parseInt(value));
        });
    }

    // Reset pain level slider to 0 on page load
    painLevelSlider.value = 0;
    painLevelLabel.textContent = `Pain Level: 0`;
    updateSelectedPainLevel(0);

    painLevelSlider.addEventListener('input', (event) => {
        const value = event.target.value;
        painLevelLabel.textContent = `Pain Level: ${value}`;
        updateSliderForPainLevel(value);
        updateSelectedPainLevel(value);
    });

    // Initialize to pain level 0
    updateSliderForPainLevel(0);
});

document.addEventListener('DOMContentLoaded', () => {
    const ticksContainer = document.querySelector('.range-slider-ticks');
    const painLevels = 6; // Number of pain levels (0-5)

    for (let i = 0; i < painLevels; i++) {
        const tick = document.createElement('div');
        ticksContainer.appendChild(tick);
    }
});


// Initialize to pain level 0 on page load
updateSliderForPainLevel(0);
