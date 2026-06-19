const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.toggle);
    if (!target) return;

    const isHidden = target.classList.toggle("hidden");
    button.setAttribute("aria-expanded", String(!isHidden));
    button.textContent = isHidden ? "View more" : "Hide";
  });
});
