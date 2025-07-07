/*!
 * Otterly Creatives Animated Number Counter
 * Originally inspired by doitwithshowit (Pratik-Khaling)
 * Customized by Otterly Creatives | IG: @otterly.creatives
 */
document.addEventListener("DOMContentLoaded", function () {
    const counterIte = document.getElementsByClassName('count');
    console.log("LOADED");
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this threshold value as needed
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const maxCount = parseInt(counter.textContent);
                let count = 0;

                function updateCounter() {
                    counter.textContent = count;
                }

                function increaseCounter() {
                    if (count < maxCount) {
                        
                        if (maxCount >= 999) {
                            count += 21;
                            if (count > maxCount){
                                count = maxCount;
                            } // Faster animation for 4-digit numbers
                        } else if (maxCount >= 99) {
                            count += 3;
                            if (count > maxCount){
                                count = maxCount;
                            }  // Faster animation for 3-digit numbers
                        }
                        else{
                            count += 1;
                        }
                        updateCounter();
                    }
                }

                let duration = 50; // Default duration

                if (maxCount >= 1000) {
                    duration = 15; // Faster animation for 4-digit numbers
                } else if (maxCount >= 100) {
                    duration = 20; // Faster animation for 3-digit numbers
                }

                // Start the counter when the element is in the viewport
                const intervalId = setInterval(increaseCounter, duration);

                // Stop the animation when the counter reaches the maxCount
                if (count >= maxCount) {
                    clearInterval(intervalId);
                }

                // Once the counter starts, we don't need to observe it anymore
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    // Start observing each counter element
    for (let i = 0; i < counterIte.length; i++) {
        observer.observe(counterIte[i]);
    }
});
