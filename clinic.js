$(function () {
    const $serviceSearch = $("#service-search");
    const $serviceCards = $(".service-card");
    const $serviceSearchStatus = $("#service-search-status");
    const $clearServiceSearch = $("#clear-service-search");
    const $readingModeToggle = $("#reading-mode-toggle");

    function updateServiceResults() {
        const terms = $.trim($serviceSearch.val().toLocaleLowerCase()).split(/\s+/).filter(Boolean);
        let visibleCount = 0;

        $serviceCards.each(function () {
            const cardText = $(this).text().toLocaleLowerCase();
            const matches = terms.every((term) => cardText.includes(term));

            $(this).toggle(matches);
            if (matches) {
                visibleCount += 1;
            }
        });

        const totalCount = $serviceCards.length;
        $serviceSearchStatus.text(
            visibleCount
                ? `Showing ${visibleCount} of ${totalCount} services.`
                : "No services match your search. Try another term."
        );
    }

    $serviceSearch.on("input", updateServiceResults);
    $clearServiceSearch.on("click", function () {
        $serviceSearch.val("").trigger("input").trigger("focus");
    });
    updateServiceResults();

    $readingModeToggle.on("click", function () {
        const isEnabled = $("body").toggleClass("reading-mode").hasClass("reading-mode");

        $(this)
            .attr("aria-pressed", String(isEnabled))
            .text(isEnabled ? "Turn off reading mode" : "Turn on reading mode");
    });

    $("#contact-form").on("submit", function (event) {
        event.preventDefault();

        if (!this.reportValidity()) {
            return;
        }

        const $form = $(this);
        const name = String($form.find("[name='name']").val() || "").trim();
        const email = String($form.find("[name='email']").val() || "").trim();
        const message = String($form.find("[name='message']").val() || "").trim();
        const $formStatus = $("#contact-form-status");

        if (!name || !email || !message) {
            $formStatus.text("Please complete each field before you continue.");
            return;
        }

        const subject = `Clinic website enquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailto = `mailto:info@ruirumaternitycare.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        $formStatus.text("Your email app should open with your message. This form does not send it directly.");
        window.location.href = mailto;
        $form[0].reset();
    });
});
