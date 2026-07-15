const dialog = document.getElementById("contact-dialog");
const form = document.getElementById("contact-form");
const status = document.getElementById("contact-status");
const submitButton = document.getElementById("contact-submit");

document.getElementById("contact-open").addEventListener("click", () => {
  dialog.showModal();
});

document.getElementById("contact-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  // Native <dialog>: clicks on the backdrop target the dialog element itself.
  if (event.target === dialog) dialog.close();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const data = Object.fromEntries(new FormData(form));
  submitButton.disabled = true;
  status.textContent = "Sending…";
  status.className = "form-status";

  try {
    const res = await fetch("/api/contact/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => ({}));

    if (res.ok && body.ok) {
      form.reset();
      status.textContent = "Thanks! Your message is on its way.";
      status.classList.add("is-success");
    } else {
      status.textContent = body.error || "Something went wrong. Please email hello@jacksoncallaway.com directly.";
      status.classList.add("is-error");
    }
  } catch {
    status.textContent = "Network error. Please email hello@jacksoncallaway.com directly.";
    status.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
  }
});
