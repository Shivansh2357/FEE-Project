const initSlider1 = () => {
    const imageList1 = document.querySelector(".slider-wrapper1 .image-list1");
    const slideButtons1 = document.querySelectorAll(".slider-wrapper1 .slide-button1");
    const sliderScrollbar1 = document.querySelector(".container2 .slider-scrollbar1");
    const scrollbarThumb1 = sliderScrollbar1.querySelector(".scrollbar-thumb1");
    const maxScrollLeft1 = imageList1.scrollWidth - imageList1.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb1.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb1.offsetLeft;
        const maxThumbPosition = sliderScrollbar1.getBoundingClientRect().width - scrollbarThumb1.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft1;
            
            scrollbarThumb1.style.left = `${boundedPosition}px`;
            imageList1.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons1.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide1" ? -1 : 1;
            const scrollAmount = imageList1.clientWidth * direction;
            imageList1.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons1[0].style.display = imageList1.scrollLeft <= 0 ? "none" : "flex";
        slideButtons1[1].style.display = imageList1.scrollLeft >= maxScrollLeft1? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList1.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft1) * (sliderScrollbar1.clientWidth - scrollbarThumb1.offsetWidth);
        scrollbarThumb1.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList1.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);