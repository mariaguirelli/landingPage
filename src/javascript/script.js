$(document).ready(function () {

    //scroll para sessões
    let navBtn = $('.nav-item');
    let homeSection = $('#home-area');
    let palestrantesSection = $('#palestrantes-area');
    let apoiadoresSection = $('#apoiadores-area');
    let contatoSection = $('#contato-area');
    let scrollTo = '';

    $(navBtn).click(function () {
        let btnId = $(this).attr('id');

        if (btnId === 'home-menu') {
            scrollTo = homeSection;
        } else if (btnId === 'palestrantes-menu') {
            scrollTo = palestrantesSection;
        } else if (btnId === 'apoiadores-menu') {
            scrollTo = apoiadoresSection;
        } else if (btnId === 'contato-menu') {
            scrollTo = contatoSection;
        } else {
            scrollTo = homeSection;
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: $(scrollTo).offset().top - 70
        }, 1000);
    });

    //contador regressivo
    function iniciarContador() {
        const eventoData = new Date("2025-12-15T16:30:00"); // Data e hora do evento
        const diasElem = $("#dias");
        const horasElem = $("#horas");
        const minutosElem = $("#minutos");
        const segundosElem = $("#segundos");

        if (diasElem.length === 0) return;

        function atualizarContador() {
            const agora = new Date();
            const diferenca = eventoData - agora;

            if (diferenca <= 0) {
                diasElem.text("0");
                horasElem.text("0");
                minutosElem.text("0");
                segundosElem.text("0");
                clearInterval(contador);
                return;
            }

            const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
            const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
            const segundos = Math.floor((diferenca / 1000) % 60);

            diasElem.text(dias);
            horasElem.text(horas.toString().padStart(2, '0'));
            minutosElem.text(minutos.toString().padStart(2, '0'));
            segundosElem.text(segundos.toString().padStart(2, '0'));
        }

        atualizarContador();
        const contador = setInterval(atualizarContador, 1000);
    }

    //máscara de input
    function aplicarMascaras() {
        const telefoneInput = $('input[placeholder*="Whatsapp"]');
        const emailInput = $('input[name="email"]');
        const nomeInput = $('input[placeholder="Nome"]');
        const cidadeInput = $('input[placeholder="Cidade"]');

        // Máscara telefone
        telefoneInput.on("input", function () {
            let valor = $(this).val().replace(/\D/g, "");
            if (valor.length > 11) valor = valor.slice(0, 11);

            if (valor.length > 6) {
                $(this).val(`(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`);
            } else if (valor.length > 2) {
                $(this).val(`(${valor.slice(0, 2)}) ${valor.slice(2)}`);
            } else {
                $(this).val(valor);
            }
        });

        // Nome e cidade: bloqueia números
        nomeInput.on("input", function () {
            $(this).val($(this).val().replace(/[0-9]/g, ""));
        });

        cidadeInput.on("input", function () {
            $(this).val($(this).val().replace(/[0-9]/g, ""));
        });

        // E-mail sempre minúsculo
        emailInput.on("input", function () {
            $(this).val($(this).val().toLowerCase());
        });
    }

    //validação do formulário
    function validarFormulario() {
        const form = $("#contact-form form");
        if (form.length === 0) return;

        form.on("submit", function (e) {
            e.preventDefault();

            const nome = form.find('input[placeholder="Nome"]');
            const email = form.find('input[name="email"]');
            const cidade = form.find('input[placeholder="Cidade"]');
            const checkbox = form.find("#lgpd");

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nome.val().trim().length < 3) {
                alert("Por favor, insira um nome válido (mínimo 3 caracteres).");
                nome.focus();
                return;
            }

            if (!emailRegex.test(email.val())) {
                alert("Por favor, insira um e-mail válido.");
                email.focus();
                return;
            }

            if (cidade.val().trim().length < 2) {
                alert("Por favor, insira uma cidade válida.");
                cidade.focus();
                return;
            }

            if (!checkbox.is(":checked")) {
                alert("Você precisa aceitar os termos da LGPD para continuar.");
                return;
            }

            alert("Inscrição enviada com sucesso!");
            form[0].reset();
        });
    }

    //inicialização
    iniciarContador();
    aplicarMascaras();
    validarFormulario();


    //faq
    function faqToggle() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                item.classList.toggle('active');

                // Fecha os outros
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }

    // Adiciona à inicialização
    faqToggle();


});
