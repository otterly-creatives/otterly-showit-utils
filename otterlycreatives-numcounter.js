/*!
 * Otterly Creatives Animated Number Counter
 * Originally inspired by doitwithshowit (Pratik-Khaling)
 * Customized by Otterly Creatives | IG: @otterly.creatives
 */

document.addEventListener("DOMContentLoaded", function () {
    const counterItems = document.getElementsByClassName('count');
    console.log("Otterly Counter Loaded ✅");

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% visible
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const maxCount = parseInt(counter.getAttribute("data-val")) || parseInt(counter.innerText);

                let count = 0;

                function updateCounter() {
                    // Update ONLY the number, don’t reset styles
                    counter.innerText = count;
                }

                function increaseCounter() {
                    if (count < maxCount) {
                        if (maxCount >= 999) {
                            count += 21;
                            if (count > maxCount) count = maxCount;
                        } else if (maxCount >= 99) {
                            count += 3;
                            if (count > maxCount) count = maxCount;
                        } else {
                            count += 1;
                        }
                        updateCounter();
                    } else {
                        clearInterval(intervalId);
                    }
                }

                let duration = 50;
                if (maxCount >= 1000) duration = 15;
                else if (maxCount >= 100) duration = 20;

                const intervalId = setInterval(increaseCounter, duration);

                // Stop observing after animation
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    // Observe each element with class "count"
    for (let i = 0; i < counterItems.length; i++) {
        observer.observe(counterItems[i]);
    }
});
