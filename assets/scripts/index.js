(function () {
    'use strict';

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = href ? document.querySelector(href) : null;
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            heroBg.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach((element) => {
            if (element.getBoundingClientRect().top < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const contactForm = document.getElementById('contactForm');
    const numeroWhatsApp = '573142243377';

    function cerrarOverlay() {
        const el = document.getElementById('whatsappOverlay');
        if (el) {
            el.remove();
            document.body.style.overflow = '';
            if (contactForm) {
                contactForm.reset();
            }
        }
    }

    function mostrarOverlayWhatsApp(urlWhatsApp, mensajePlano) {
        const overlay = document.createElement('div');
        overlay.id = 'whatsappOverlay';
        overlay.innerHTML = `
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div class="relative bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-lg p-6 max-w-md mx-4">
                <div class="text-center mb-6">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 rounded-full mb-4">
                        <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.507 14.307l-.009.075c-2.199-1.096-2.429-1.242-2.713-.816-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.05-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"/>
                            <path d="M20.52 3.449C12.05-2.867 2.089-.968 2.089-.968c-.9.205-1.92.825-2.02 1.785C.045 2.148 0 2.6 0 3.064 0 3.527.045 3.98.07 4.434c.4 6.643 3.217 11.586 7.875 14.512L6.38 23.544c.27.49.63.919 1.065 1.265.45.346.96.6 1.5.75.54.15 1.11.195 1.665.135.555-.06 1.095-.225 1.59-.495l3.93-2.265c3.106.75 6.33.225 9.12-1.5 5.25-3.3 7.8-9.75 6.075-15.6-.705-2.43-2.205-4.5-4.245-5.985z"/>
                        </svg>
                    </div>
                    <h3 class="font-display text-xl text-white mb-2">¡Listo para enviar!</h3>
                    <p class="text-gray-300 mb-4">Su mensaje ha sido preparado para WhatsApp</p>
                </div>
                <div class="space-y-4">
                    <button type="button" id="btnWhatsAppWeb"
                            class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.507 14.307l-.009.075c-2.199-1.096-2.429-1.242-2.713-.816-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.05-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"/>
                        </svg>
                        Abrir WhatsApp Web
                    </button>
                    <button type="button" id="btnWhatsAppMobile"
                            class="w-full bg-[#D4AF37] hover:bg-[#c19b2c] text-[#1a1a1a] py-3 rounded-lg font-semibold transition">
                        Abrir WhatsApp en Móvil
                    </button>
                    <div class="text-center mt-4">
                        <button type="button" id="btnCopiarMensaje"
                                class="text-gray-400 hover:text-[#D4AF37] text-sm">
                            Copiar mensaje para enviar manualmente
                        </button>
                    </div>
                </div>
                <button type="button" id="btnCerrarOverlay"
                        class="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Cerrar">
                    ✕
                </button>
            </div>
        </div>`;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const backdrop = overlay.firstElementChild;
        document.getElementById('btnWhatsAppWeb').addEventListener('click', () => {
            window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
            cerrarOverlay();
        });
        const encoded = encodeURIComponent(mensajePlano);
        document.getElementById('btnWhatsAppMobile').addEventListener('click', () => {
            window.location.href = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encoded}`;
            cerrarOverlay();
        });
        document.getElementById('btnCopiarMensaje').addEventListener('click', () => {
            navigator.clipboard.writeText(mensajePlano).then(() => {
                alert('Mensaje copiado al portapapeles. Pégalo en WhatsApp.');
            });
        });
        document.getElementById('btnCerrarOverlay').addEventListener('click', cerrarOverlay);
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                cerrarOverlay();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                nombre: document.getElementById('nombre').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                tipoEvento: document.getElementById('tipoEvento').value,
                mensaje: document.getElementById('mensaje').value.trim(),
            };

            const errores = [];
            if (!formData.nombre) errores.push('• Nombre completo');
            if (!formData.email) errores.push('• Correo electrónico');
            if (!formData.telefono) errores.push('• Teléfono');
            if (!formData.tipoEvento) errores.push('• Tipo de evento');

            if (errores.length > 0) {
                alert(`Por favor complete los siguientes campos:\n\n${errores.join('\n')}`);
                return;
            }

            const mensajePlano = [
                '*NUEVA SOLICITUD - MAISON AMYULES*',
                '',
                `*Nombre:* ${formData.nombre}`,
                `*Email:* ${formData.email}`,
                `*Teléfono:* ${formData.telefono}`,
                `*Tipo de Evento:* ${formData.tipoEvento}`,
                `*Mensaje:* ${formData.mensaje || 'No especificado'}`,
                '',
                `*Fecha:* ${new Date().toLocaleDateString('es-ES')}`,
            ].join('\n');

            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajePlano)}`;
            mostrarOverlayWhatsApp(urlWhatsApp, mensajePlano);
        });
    }

    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryImage');
    const closeGallery = document.getElementById('closeGallery');
    const nextBtn = document.getElementById('nextImage');
    const prevBtn = document.getElementById('prevImage');

    if (!modal || !modalImage || !closeGallery || !nextBtn || !prevBtn) {
        return;
    }

    let currentGallery = [];
    let currentIndex = 0;

    function updateImage() {
        modalImage.classList.remove('opacity-100');
        modalImage.classList.add('opacity-0');

        const img = new Image();
        img.src = currentGallery[currentIndex];

        img.onload = () => {
            setTimeout(() => {
                modalImage.src = img.src;
                modalImage.classList.remove('opacity-0');
                modalImage.classList.add('opacity-100');
            }, 100);
        };
    }

    function preloadGallery(images) {
        images.forEach((src) => {
            const pre = new Image();
            pre.src = src;
        });
    }

    const galleries = {
        boda: [
            'https://picsum.photos/1200/800?1',
            'https://picsum.photos/1200/800?2',
            'https://picsum.photos/1200/800?3',
            'https://picsum.photos/1200/800?4',
            'https://picsum.photos/1200/800?5',
        ],
        15: [
            'https://picsum.photos/1200/800?6',
            'https://picsum.photos/1200/800?7',
            'https://picsum.photos/1200/800?8',
            'https://picsum.photos/1200/800?9',
            'https://picsum.photos/1200/800?10',
        ],
        gala: [
            'https://picsum.photos/1200/800?11',
            'https://picsum.photos/1200/800?12',
            'https://picsum.photos/1200/800?13',
            'https://picsum.photos/1200/800?14',
            'https://picsum.photos/1200/800?15',
        ],
        aniversario: [
            'https://picsum.photos/1200/800?16',
            'https://picsum.photos/1200/800?17',
            'https://picsum.photos/1200/800?18',
            'https://picsum.photos/1200/800?19',
            'https://picsum.photos/1200/800?20',
        ],
        detalles: [
            'https://picsum.photos/1200/800?21',
            'https://picsum.photos/1200/800?22',
            'https://picsum.photos/1200/800?23',
            'https://picsum.photos/1200/800?24',
            'https://picsum.photos/1200/800?25',
        ],
        graduacion: [
            'https://picsum.photos/1200/800?26',
            'https://picsum.photos/1200/800?27',
            'https://picsum.photos/1200/800?28',
            'https://picsum.photos/1200/800?29',
            'https://picsum.photos/1200/800?30',
        ],
    };

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const key = item.dataset.gallery;
            const set = galleries[key];
            if (!set || !set.length) {
                return;
            }
            currentGallery = set;
            currentIndex = 0;
            preloadGallery(currentGallery);
            updateImage();
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    });

    nextBtn.addEventListener('click', () => {
        if (!currentGallery.length) {
            return;
        }
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateImage();
    });

    prevBtn.addEventListener('click', () => {
        if (!currentGallery.length) {
            return;
        }
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateImage();
    });

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    closeGallery.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
})();
