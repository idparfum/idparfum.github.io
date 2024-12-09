import { endpointLogin } from "./url.js";

document
  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const emailOrUsername = document.getElementById("nama").value;
    const password = document.getElementById("password").value;

    const data = {
      nama: emailOrUsername,
      password: password,
    };

    fetch(endpointLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            return Swal.fire({
              icon: "error",
              title: "Login Gagal",
              text: "Password salah. Silakan coba lagi.",
            });
          } else {
            return Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
            });
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data?.token) {
          localStorage.setItem("Authorization", data.token);
          document.cookie = `Authorization=${data.token};path=/;max-age=3600`;

          return getUserDetails(data.token); // Mendapatkan data pengguna
        } else {
          return Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: "Token tidak diterima dari server.",
          });
        }
      })
      .then((user) => {
        if (user?.id_role) {
          if (user.id_role === 3) {
            Swal.fire({
              icon: "success",
              title: "Login Berhasil",
              text: "Selamat datang di dashboard customer!",
            }).then(() => {
              window.location.href = "../cust/index.html";
            });
          } else if (user.id_role === 2) {
            Swal.fire({
              icon: "success",
              title: "Login Berhasil",
              text: "Selamat datang di dashboard seller!",
            }).then(() => {
              window.location.href = "../seller/index.html";
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Role pengguna tidak ditemukan.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: error.message || "Terjadi kesalahan.",
        });
      });
  });

function getUserDetails(token) {
  return fetch("http://127.0.0.1:3000/u/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return Swal.fire({
          icon: "error",
          title: "Gagal Memuat Data Pengguna",
          text: "Tidak dapat mengambil data pengguna.",
        }).then(() => {
          throw new Error("Failed to fetch user data");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data?.user) {
        return data.user;
      } else {
        return Swal.fire({
          icon: "error",
          title: "Data Tidak Lengkap",
          text: "Data pengguna tidak lengkap.",
        }).then(() => {
          throw new Error("Incomplete user data");
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Terjadi kesalahan saat mengambil data pengguna.",
      });
      throw error;
    });
}
