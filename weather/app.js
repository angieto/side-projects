window.addEventListener("load", () => {
    let lat, lon

    const api_key = "016ebd49be31c1cb5f6ce8c45975dbfd"
    const url = "api.openweathermap.org/data/2.5/weather"

    // DOM ELEMENTS
    const tempSection = document.querySelector(".temp-section")
    const tempUnit = document.querySelector(".temp-section span")
    const tempDegree = document.querySelector(".degree")
    const tempDescription = document.querySelector(".temp-desc")
    const locationTimezone = document.querySelector(".timezone")
    const degreeSymbol = "\xB0"

    // If device location detected, fetch api based on current lat long
    if (navigator.geolocation) {
        const successCallback = (pos) => {
            lat = pos.coords.latitude
            lon = pos.coords.longitude

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}${url}?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`

            fetch(api, { headers: { "Content-Type": "application/json" } })
                .then((res) => res.json())
                .then((data) => {
                    const { temp } = data.main
                    const { description } = data.weather[0]
                    const { name } = data

                    // set icon
                    setIcons(description, "icon")

                    // Celsius formula
                    const celsius = (temp - 32) * (5 / 9)

                    // add listener to toggle temperature unit
                    tempSection.addEventListener("click", () => {
                        if (tempUnit.textContent.includes("F")) {
                            tempDegree.textContent = Math.floor(celsius)
                            tempUnit.textContent = degreeSymbol + "C"
                        } else {
                            tempDegree.textContent = temp
                            tempUnit.textContent = degreeSymbol + "F"
                        }
                    })

                    tempDegree.textContent = temp
                    tempUnit.textContent = degreeSymbol + "F"
                    tempDescription.textContent = description
                    locationTimezone.textContent = name
                })
        }

        const errorCallback = (err) => {
            console.log(err)
        }

        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
            { timeout: 10000 }
        )
    }

    function setIcons(desc, id) {
        const iconName = getIconName(desc)
        const skycons = new Skycons({ color: "white" })
        skycons.play()
        return skycons.set(id, Skycons[iconName])
    }

    function getIconName(desc) {
        if (desc.includes("partly") || desc.includes("broken"))
            return "PARTLY_CLOUDY_DAY"
        if (desc.includes("cloud")) return "CLOUDY"
        if (desc.includes("rain")) return "RAIN"
        if (desc.includes("snow")) return "SNOW"
        if (desc.includes("wind")) return "WIND"
        if (desc.includes("fog")) return "FOG"
        return "CLEAR_DAY"
    }
})
