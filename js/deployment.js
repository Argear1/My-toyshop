function toggleAccordion(element) {
    const content = element.querySelector('.content');
    
    if (element.classList.contains("open")) {
        element.classList.remove("open");
        content.style.maxHeight = "0";
        setTimeout(() => { 
            content.style.transition = "max-height 0.5s ease";
        }, 50);
    } else {
        element.classList.add("open");
        content.style.transition = "max-height 0.5s ease";
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
