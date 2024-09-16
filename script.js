const rotationSlider = document.getElementById('rotationSlider');
const rotationInput = document.getElementById('rotationInput');
const increaseButton = document.getElementById('increaseButton');
const decreaseButton = document.getElementById('decreaseButton');
const wheel = document.querySelector('.wheel');

// Function to update wheel rotation
function updateRotation(value) {
    wheel.style.transform = `rotate(${value}deg)`;
    rotationSlider.value = value;
    rotationInput.value = value;
}

// Add event listener for the slider
rotationSlider.addEventListener('input', function() {
    updateRotation(this.value);
});

// Add event listener for the input field
rotationInput.addEventListener('input', function() {
    let value = Math.min(Math.max(this.value, 0), 360); // Ensure value stays between 0 and 360
    updateRotation(value);
});

