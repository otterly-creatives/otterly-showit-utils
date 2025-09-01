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
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;

                // Look for the inner <span> (the actual number holder)
                const numberSpan = counter.querySelector("span");
                const maxCount = parseInt(counter.getAttribute("data-val")) 
                               || parseInt(numberSpan ? numberSpan.innerText : counter.innerText);

                let count = 0;

                function updateCounter() {
                    if (numberSpan) {
                        numberSpan.innerText = count;
                    } else {
                        counter.innerText = count;
                    }
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

                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    for (let i = 0; i < counterItems.length; i++) {
        observer.observe(counterItems[i]);
    }
});
