import { useEffect, useRef } from "react"

const Swiper = ({ images }) => {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiperContainer = swiperRef.current
    const params = {
      navigation: true,
      pagination: {
        clickable: true
      },
      loop: true,
      centerInsufficientSlides: true,
      centeredSlides: true,
      injectStyles: [
        `
            .swiper-button-next,
            .swiper-button-prev {
              background-color: white;
              width: 50px;
              height: 50px;
              border-radius: 100%;
              color: #62a744;
            }
            .swiper-button-next svg,
            .swiper-button-prev svg {
              width: 60%;
              height: 60%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
              background-color: #62a744;
            }
        `,
      ],
    }

    Object.assign(swiperContainer, params)
    swiperContainer.initialize()
  }, [])

  return (
    <div data-block='gallery'>
      <swiper-container ref={swiperRef} init='false'>
        {images.map((img, i) => (
          <swiper-slide key={i}>
            <img src={img} alt='' />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  )
}

export default Swiper
