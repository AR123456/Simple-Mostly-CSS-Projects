document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".card-container");
  const deleteBtn = document.querySelector(".delete");
  const addBtn = document.querySelector(".add-new");

  function explodeCard(card) {
    const rect = card.getBoundingClientRect();
    const pieces = 12;
    const rows = 6;

    card.style.visibility = "hidden";

    for (let x = 0; x < pieces; x++) {
      for (let y = 0; y < rows; y++) {
        const fragment = document.createElement("div");

        const width = rect.width / pieces;
        const height = rect.height / rows;

        fragment.style.position = "fixed";
        fragment.style.left = rect.left + x * width + "px";
        fragment.style.top = rect.top + y * height + "px";
        fragment.style.width = width + "px";
        fragment.style.height = height + "px";
        fragment.style.background = "linear-gradient(to right, #111, #555)";
        fragment.style.borderRadius = "4px";
        fragment.style.pointerEvents = "none";
        fragment.style.zIndex = "9999";

        document.body.appendChild(fragment);

        const dx = (Math.random() - 0.5) * 600;
        const dy = (Math.random() - 0.5) * 600;
        const rotate = (Math.random() - 0.5) * 720;

        fragment.animate(
          [
            { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
            {
              transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 800,
            easing: "cubic-bezier(.17,.67,.83,.67)",
            fill: "forwards",
          }
        );

        setTimeout(() => fragment.remove(), 900);
      }
    }

    setTimeout(() => card.remove(), 300);
  }

  deleteBtn.addEventListener("click", () => {
    const card = document.querySelector(".card");
    if (card) explodeCard(card);
  });

  addBtn.addEventListener("click", () => {
    if (document.querySelector(".card")) return;

    const template = document.createElement("div");
    template.innerHTML = `
      <div class="card"
        data-dis-type="simultaneous"
        data-dis-particle-type="ExplodingParticle"
        data-dis-reduction-factor="111">
        <div class="flip">
          <div class="front">
            <div class="strip-bottom"></div>
            <div class="strip-top"></div>
            <div class="investor">Investor</div>
            <div class="card-number">
              <div class="section">5453</div>
              <div class="section">2000</div>
              <div class="section">0000</div>
              <div class="section">0000</div>
            </div>
            <div class="end">
              <span class="end-text">exp. end:</span>
              <span class="end-date">11/26</span>
            </div>
            <div class="card-holder">John Smith</div>
            <div class="master">
              <div class="circle master-red"></div>
              <div class="circle master-yellow"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    cardContainer.prepend(template.firstElementChild);
  });
});
