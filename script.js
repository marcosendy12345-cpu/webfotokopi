/* =========================================
   MENU MOBILE
========================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("show");

});


/* =========================================
   CLOSE MENU SETELAH LINK DIKLIK
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

    });

});


/* =========================================
   DARK MODE
========================================= */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


/* =========================================
   CEK THEME YANG TERSIMPAN
========================================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}


/* =========================================
   HARGA LAYANAN
========================================= */

const prices = {

    fotokopi: 300,

    print: 500,

    warna: 1000,

    scan: 1000,

    jilid: 5000,

    laminasi: 3000

};


/* =========================================
   ELEMENT FORM
========================================= */

const service = document.getElementById("service");

const quantity = document.getElementById("quantity");

const totalPrice = document.getElementById("totalPrice");


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* =========================================
   HITUNG TOTAL HARGA
========================================= */

function calculateTotal() {

    const selectedService = service.value;

    const jumlah = parseInt(quantity.value) || 0;

    if (!selectedService) {

        totalPrice.textContent = "Rp0";

        return;

    }


    const harga = prices[selectedService];

    const total = harga * jumlah;

    totalPrice.textContent = formatRupiah(total);

}


/* =========================================
   UPDATE HARGA
========================================= */

service.addEventListener(
    "change",
    calculateTotal
);


quantity.addEventListener(
    "input",
    calculateTotal
);


/* =========================================
   FORM PESAN
========================================= */

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;

    const selectedService =
        service.value;

    const jumlah =
        quantity.value;

    const note =
        document.getElementById("note").value;


    if (!selectedService) {

        alert("Silakan pilih layanan terlebih dahulu.");

        return;

    }


    const harga =
        prices[selectedService];

    const total =
        harga * parseInt(jumlah);


    /* =====================================
       NAMA LAYANAN
    ===================================== */

    const serviceNames = {

        fotokopi: "Fotokopi",

        print: "Print Hitam Putih",

        warna: "Print Warna",

        scan: "Scan",

        jilid: "Jilid",

        laminasi: "Laminasi"

    };


    const serviceName =
        serviceNames[selectedService];


    /* =====================================
       PESAN WHATSAPP
    ===================================== */

    const message =

        `Halo CopyKita 👋

Saya ingin melakukan pemesanan.

Nama: ${name}

Layanan: ${serviceName}

Jumlah: ${jumlah}

Perkiraan total: ${formatRupiah(total)}

Catatan:
${note || "-"}

Mohon informasi selanjutnya. Terima kasih.`;


    /* =====================================
       NOMOR WHATSAPP TOKO

       GANTI NOMOR INI
    ===================================== */

    const phoneNumber =
        "6281234567890";


    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }
);


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================
   ACTIVE NAVBAR
========================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener(
    "scroll",
    function () {

        let current = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 100;

            const sectionHeight =
                section.clientHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }
);