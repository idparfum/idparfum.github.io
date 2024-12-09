import { endpointRegisterCust } from "./url.js";

document
  .getElementById("registButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const data = {
      nama: username,
      email: email,
      phone: phone,
      password: password,
    };

    fetch(endpointRegisterCust, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Pendaftaran gagal. Silakan coba lagi.");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Tambahkan logging untuk debugging
        console.log("Response Data:", data);

        if (data?.message === "Registrasi Berhasil!") {
          Swal.fire({
            icon: "success",
            title: "Pendaftaran Berhasil",
            text: "Anda berhasil mendaftar. Silakan login untuk melanjutkan.",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/fume/login.html";
            }
          });
        } else {
          // Hanya tampilkan error jika ada pesan selain "Berhasil Register!"
          Swal.fire({
            icon: "error",
            title: "Gagal Mendaftar",
            text: data.message || "Pendaftaran gagal. Silakan coba lagi.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal Mendaftar",
          text: error.message || "Terjadi kesalahan pada server.",
        });
      });
  });
