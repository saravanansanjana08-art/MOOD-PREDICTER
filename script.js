document.addEventListener("DOMContentLoaded", function() {

    const hero = document.querySelector(".hero");

    if (!hero) {
        return;
    }

    const symbols = ["✧", "✦", "·", "♡"];

    function createSparkle() {
        const sparkle = document.createElement("span");

        sparkle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        sparkle.style.position = "absolute";
        sparkle.style.left = Math.random() * 95 + "%";
        sparkle.style.top = Math.random() * 90 + "%";
        sparkle.style.color = "#b6a66e";
        sparkle.style.fontSize =
            (10 + Math.random() * 12) + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.opacity = "0";

        sparkle.style.transition =
            "opacity 1s ease, transform 3s ease";

        hero.appendChild(sparkle);

        requestAnimationFrame(() => {
            sparkle.style.opacity = "0.75";
            sparkle.style.transform = "translateY(-20px)";
        });

        setTimeout(() => {
            sparkle.style.opacity = "0";

            setTimeout(() => {
                sparkle.remove();
            }, 1000);

        }, 2200);
    }

    setInterval(createSparkle, 900);

});