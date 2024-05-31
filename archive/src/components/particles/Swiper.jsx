import { useEffect, useRef } from "react"

const Swiper = ({ images }) => {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiperContainer = swiperRef.current
    const params = {
      navigation: true,
      pagination: true,
      injectStyles: [
        `
            .swiper-button-next,
            .swiper-button-prev {
              background-color: white;
              padding: 8px 16px;
              border-radius: 100%;
              color: #62a744;
            }
            .swiper-pagination-bullet{
              width: 5px;
              height: 5px;
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
