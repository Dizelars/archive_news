import React, { useEffect } from "react"
import "./Loader.css"

const Loader = () => {
  useEffect(() => {
    const logoSVG = document.querySelector("#hellopreloader_logo-svg")

    const listenerSVG = () => {
      logoSVG.style.animation = "none"
      logoSVG.style.animation =
        "heart-beating 1500ms cubic-bezier(0,-0.2,1,1.2) alternate infinite both"
      logoSVG.removeEventListener("animationend", listenerSVG)
    }

    logoSVG.addEventListener("animationend", listenerSVG)

    return () => {
      logoSVG.removeEventListener("animationend", listenerSVG)
    }
  }, [])

  return (
    <div id='hellopreloader'>
      <div id='hellopreloader_preload'>
        <div id='hellopreloader_logo'>
          <svg
            id='hellopreloader_logo-svg'
            xmlns='http://www.w3.org/2000/svg'
            width='66'
            height='80'
            viewBox='0 0 66 80'
            fill='none'>
            <path
              d='M29.2134 76.1977L33 80L56.3632 56.5398C60.9702 51.9022 64.1051 45.9976 65.3718 39.5719C66.6386 33.1462 65.9803 26.4876 63.4803 20.4373C60.9802 14.387 56.7505 9.21653 51.3254 5.57898C45.9003 1.94143 39.5233 0 33 0C26.4767 0 20.0997 1.94143 14.6746 5.57898C9.24955 9.21653 5.01981 14.387 2.51974 20.4373C0.0196702 26.4876 -0.638557 33.1462 0.628187 39.5719C1.89493 45.9976 5.02982 51.9022 9.63685 56.5398C10.0118 56.9207 10.4911 57.1811 11.0138 57.2878C11.5365 57.3944 12.0789 57.3425 12.5722 57.1386C13.0654 56.9348 13.4871 56.5883 13.7837 56.1431C14.0802 55.6979 14.2382 55.1742 14.2375 54.6386C14.2146 53.9245 13.9239 53.2454 13.4234 52.7375C9.56097 48.8543 6.93164 43.9084 5.86777 38.525C4.80391 33.1417 5.35326 27.5624 7.4464 22.4925C9.53954 17.4225 13.0825 13.0895 17.6275 10.041C22.1725 6.99254 27.5154 5.36547 32.9811 5.36547C38.4467 5.36547 43.7897 6.99254 48.3347 10.041C52.8796 13.0895 56.4226 17.4225 58.5157 22.4925C60.6089 27.5624 61.1583 33.1417 60.0944 38.525C59.0305 43.9084 56.4012 48.8543 52.5387 52.7375L29.2134 76.1977Z'
              fill='white'
            />
            <path
              d='M19.5956 40.2848H15.241L30.747 24.9995H35.1016L19.5956 40.2848Z'
              fill='white'
            />
            <path
              d='M27.8882 40.2848H23.5336L39.0396 24.9995H43.3942L27.8882 40.2848Z'
              fill='white'
            />
            <path
              d='M36.6162 40.2848H32.2616L47.7866 24.9995H52.1222L36.6162 40.2848Z'
              fill='white'
            />
          </svg>
        </div>
        <div id='hellopreloader_loading-bar'>
          <svg
            width='138'
            height='138'
            viewBox='0 0 138 138'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='border-svg'>
            <path
              d='M65 2 H108 A28 28 0 0 1 136 30 V108 A28 28 0 0 1 108 136 H30 A28 28 0 0 1 2 108 V30 A28 28 0 0 1 30 2 Z'
              className='border-static'
            />
            <path
              d='M65 2 H108 A28 28 0 0 1 136 30 V108 A28 28 0 0 1 108 136 H30 A28 28 0 0 1 2 108 V30 A28 28 0 0 1 30 2 Z'
              className='border-filling'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Loader
