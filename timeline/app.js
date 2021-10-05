;(function () {
    "use strict"

    // DOM elements
    var listItems = document.querySelectorAll(".timeline-block-item")

    // check if an element is in viewport
    function isElementInViewport(el) {
        const bbox = el.getBoundingClientRect()
        return (
            bbox.top >= 0 &&
            bbox.left >= 0 &&
            bbox.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            bbox.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    function callBackFunc() {
        const className = "in-view"
        for (let i = 0; i < listItems.length; i++) {
            var el = listItems[i]
            if (isElementInViewport(el)) {
                el.classList.add(className)
            }
            // else {
            //     el.classList.remove(className)
            // }
        }
    }

    // listen for events
    window.addEventListener("load", callBackFunc)
    window.addEventListener("resize", callBackFunc)
    window.addEventListener("scroll", callBackFunc)
})()
