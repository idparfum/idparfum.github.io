import { endpointGetProfile } from "./url.js";

function fetchDataFromEndpoint() {
  const url = endpointGetProfile;
  const token = localStorage.getItem("Authorization") || "";

  if (token) {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
          );
        }
        return response.json();
      })
      .then((data) => {
        updateUI(data.user);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "warning",
          title: "Perhatian!",
          text: error.message,
        });
      });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Perhatian!",
      text: "Anda belum login. Silakan login terlebih dahulu.",
    }).then(() => {
      window.location.href = "../fume/login.html";
    });
  }
}

function updateUI(user) {
    const nama = document.querySelector(".nama-cust");
    if (nama) {
        nama.textContent = ` ${user.nama}` || ""; // Menambahkan nama pengguna
    }

    if (user?.nama){
        document.title = `${user.nama} | Parfum.id`;
    }
    else {
        document.title = "Parfum.id";
    }

}

fetchDataFromEndpoint();