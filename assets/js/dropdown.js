document.addEventListener("DOMContentLoaded", () => {
    const dropdownButton = document.getElementById("profileDropdownButton");
    const dropdownMenu = document.getElementById("profileDropdownMenu");

    // Toggle dropdown visibility
    dropdownButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });
});
