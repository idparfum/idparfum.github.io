const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('signUpBtn');

loginBtn.addEventListener('click', () => {
    window.location.href = '/fume/login.html';
});

signUpBtn.addEventListener('click', () => {
    window.location.href = '/fume/register.html';
});


// Mendapatkan semua link menu
const menuLinks = document.querySelectorAll('nav .menu a');

// Mendapatkan semua section berdasarkan ID
const sections = document.querySelectorAll('section');

// Fungsi untuk menambahkan kelas aktif pada menu
function highlightMenu() {
    let index = sections.length;

    // Periksa setiap section untuk melihat apakah sudah digulirkan
    while (--index && window.scrollY + 150 < sections[index].offsetTop) {}

    // Hapus kelas aktif dari semua item menu
    menuLinks.forEach(link => link.classList.remove('active'));

    // Tambahkan kelas aktif pada item menu yang relevan
    menuLinks[index].classList.add('active');
}

// Menambahkan event listener untuk scroll
window.addEventListener('scroll', highlightMenu);

// Jalankan fungsi sekali saat halaman dimuat untuk memastikan item pertama aktif
highlightMenu();
