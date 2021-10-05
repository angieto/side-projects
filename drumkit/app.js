;(function () {
    "use strict"

    // Variables
    const playingClass = "playing"

    // DOM Elements
    const crashRide = document.querySelector("#crash-ride")
    const hiHatTop = document.querySelector("#hihat-top")
    const drumKeys = Array.from(document.querySelectorAll(".key"))

    // Functions
    const animateCrashOrRide = () => {
        crashRide.style.transform = "rotate(0deg) scale(1.5)"
    }

    const animateHiHatClosed = () => {
        hiHatTop.style.top = "171px"
    }

    const playSound = (e) => {
        const keyCode = e.keyCode
        const keyElement = document.querySelector(`div[data-key="${keyCode}"]`)

        if (keyElement) {
            const audioElement = document.querySelector(
                `audio[data-key="${keyCode}"]`
            )
            // reset play time
            audioElement.currentTime = 0
            audioElement.play()

            switch (keyCode) {
                case 69:
                case 82:
                    animateCrashOrRide()
                    break
                case 75:
                    animateHiHatClosed()
                    break
            }

            keyElement.classList.add(playingClass)
        }
    }

    const removeCrashRideTransition = (e) => {
        if (e.propertyName === "transform") {
            e.target.style.transform = "rotate(-7.2deg) scale(1.5)"
        }
    }

    const removeHiHatTopTransition = (e) => {
        if (e.propertyName === "top") {
            e.target.style.top = "166px"
        }
    }

    const removeKeyTransition = (e) => {
        if (e.propertyName === "transform") {
            e.target.classList.remove(playingClass)
        }
    }

    // Event listeners
    drumKeys.forEach((key) =>
        key.addEventListener("transitionend", removeKeyTransition)
    )
    crashRide.addEventListener("transitionend", removeCrashRideTransition)
    hiHatTop.addEventListener("transitionend", removeHiHatTopTransition)
    window.addEventListener("keydown", playSound)
})()
