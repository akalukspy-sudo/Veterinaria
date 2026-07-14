document.addEventListener("DOMContentLoaded", () => {
  // --- Hamburguesa ---
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
      });
    });
  }

  // --- Tema con slider ---
  const themeToggle = document.getElementById('theme-toggle');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.checked = false;
  }

  function toggleTheme() {
    if (themeToggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  themeToggle.addEventListener('change', toggleTheme);
});

// seccion servicios
const cards = document.querySelectorAll(".servicio-card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});


// Buscador
const buscador = document.getElementById("buscador");
const productos = document.querySelectorAll(".producto-card");

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  productos.forEach(prod => {
    const nombre = prod.querySelector("h4").textContent.toLowerCase();
    const descripcion = prod.querySelector("p").textContent.toLowerCase();
    const categoria = prod.querySelector(".categoria").textContent.toLowerCase();

    // Si el texto buscado aparece en nombre, descripción o categoría → mostrar
    if (nombre.includes(texto) || descripcion.includes(texto) || categoria.includes(texto)) {
      prod.style.display = "block";
    } else {
      prod.style.display = "none";
    }
  });
});

// Modal
const modal = document.getElementById("modal");
const cerrar = document.querySelector(".cerrar");

document.querySelectorAll(".ver-mas").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".producto-card");
    document.getElementById("modal-img").src = card.querySelector("img").src;
    document.getElementById("modal-nombre").textContent = card.querySelector("h4").textContent;
    document.getElementById("modal-descripcion").textContent = card.querySelector("p").textContent;
    document.getElementById("modal-precio").textContent = card.querySelector(".precio").textContent;
    document.getElementById("modal-categoria").textContent = card.querySelector(".categoria").textContent;
    modal.style.display = "flex";
  });
});

cerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

/*galeria */
function mostrarPreview(imgElement) {
  const previewImg = document.getElementById("preview-img");
  const caption = document.getElementById("preview-caption");

  previewImg.src = imgElement.src.replace("/300/200", "/600/400"); // versión más grande
  caption.textContent = imgElement.alt;
}

function abrirModal() {
  const modalg= document.getElementById("modalg");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const previewImg = document.getElementById("preview-img");
  const caption = document.getElementById("preview-caption");

  modal.style.display = "flex";
  modalImg.src = previewImg.src;
  modalCaption.textContent = caption.textContent;
}

function cerrarModal() {
  document.getElementById("modalg").style.display = "none";
}

// Mostrar preview
function mostrarPreview(imgElement) {
  const previewImg = document.getElementById("preview-img");
  const caption = document.getElementById("preview-caption");

  previewImg.src = imgElement.src.replace("/300/200", "/600/400");
  caption.textContent = imgElement.alt;
}

/*Seccion noticias*/
// Abrir modal
document.querySelectorAll(".btn-leer").forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

// Cerrar modal
document.querySelectorAll(".cerrar").forEach(cerrar => {
  cerrar.addEventListener("click", () => {
    cerrar.closest(".modal").style.display = "none";
  });
});

// Cerrar modal al hacer click fuera
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// preguntas frecuentes (Accordion) 
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const isOpen = body.style.display === "block";

    // Cierra todos
    document.querySelectorAll(".accordion-body").forEach(b => b.style.display = "none");

    // Abre el seleccionado
    if (!isOpen) {
      body.style.display = "block";
    }
  });
});

/*Formulario */
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();


   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_fd2vf5j';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      document.getElementById('modalf').style.display="flex";
      document.getElementById('lblresultado').innerHTML="El correo fue enviado correctamente";
      
    }, (err) => {
      btn.value = 'Send Email';
       document.getElementById('modalf').style.display="flex";
      document.getElementById('lblresultado').innerHTML="El correo no fue enviado";
      alert(JSON.stringify(err));
    });
});
/*CERRAR MODAL*/
function cerrarfor(){
document.getElementById('modalf').style.display="none";
}

/*Testimonios*/
document.getElementById("form-testimonio").addEventListener("submit", function(e) {
  e.preventDefault(); // evita recargar la página

  // Obtener valores
  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if(nombre && mensaje) {
    // Crear nuevo testimonio
    const nuevo = document.createElement("div");
    nuevo.classList.add("testimonio-card");
    nuevo.innerHTML = `<p>"${mensaje}"</p><h3>- ${nombre}</h3>`;

    // Insertar en la lista
    document.getElementById("lista-testimonios").appendChild(nuevo);

    // Limpiar formulario
    document.getElementById("form-testimonio").reset();
  }
});
