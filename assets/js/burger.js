document.getElementById('hamburgerBtn').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    // Toggle visibility of the mobile menu
    mobileMenu.classList.toggle('hidden');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
    } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
    }
});