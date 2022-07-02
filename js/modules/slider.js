function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.getElementById(currentCounter),
        total = document.getElementById(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        indicators = document.createElement('ol'),
        dots = [];

    let slideIndex = 1,
        offset = 0;

    function showSlideIndex(text, index) {
        if (index < 10) {
            text.textContent = `0${index}`;
        } else {
            text.textContent = index;
        }
    }

    function showDot() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deletNoDigits(string) {
        return +string.replace(/\D/g, '');
    }

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    slider.style.position = 'relative';

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    showSlideIndex(total, slides.length);
    showSlideIndex(current, slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all ease';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });


    next.addEventListener('click', () => {
        if (offset == deletNoDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deletNoDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showSlideIndex(current, slideIndex);

        showDot();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deletNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deletNoDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length; 
        } else {
            slideIndex--;
        }

        showSlideIndex(current, slideIndex);

        showDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deletNoDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            showDot();
            showSlideIndex(current, slideIndex);
        });
    });

    return {
        
    };
}

export default slider;