// Map the pain levels to their corresponding degree ranges
const painLevelDegrees = {
    0: { min: 152, max: 208 },
    1: { min: 92.5, max: 147.62 },
    2: { min: 32.35, max: 87.77 },
    3: { min: 332.2, max: 27.75 },
    4: { min: 272.32, max: 327.62 },
    5: { min: 212, max: 268 }
};

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

// Function to set rotation for the selected pain level
function setRotationForPainLevel(painLevel, sliderValue) {
    const level = painLevelDegrees[painLevel];

    // Calculate rotation within the pain level's degree range
    const rotationRange = level.max - level.min;
    const targetDegree = level.min + (rotationRange * sliderValue / 100);

    // Apply the calculated rotation to the element
    rotatingNumber.style.transform = `rotate(${targetDegree}deg)`;
}

// Function to update slider based on selected pain level
function updateSliderForPainLevel(painLevel) {
    // Reset the slider to the middle (50%) when switching levels
    rotationSlider.value = 0;

    // Store the selected pain level in a data attribute for future reference
    rotationSlider.dataset.painLevel = painLevel;

    // Immediately set rotation to reflect the middle of the new pain level's range
    setRotationForPainLevel(painLevel, 0);
}

// Handle slider input for real-time rotation update
rotationSlider.addEventListener('input', function() {
    const sliderValue = rotationSlider.value; // Get the slider value (0 to 100)
    const selectedLevel = parseInt(rotationSlider.dataset.painLevel); // Get the current pain level

    // Update rotation based on the current slider value and pain level
    setRotationForPainLevel(selectedLevel, sliderValue);
});

// Initialize to pain level 0 on page load
updateSliderForPainLevel(0);


// These slider range component was used in my other component:
// https://github.com/yairEO/color-picker