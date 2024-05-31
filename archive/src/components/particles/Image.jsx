const Image = ({ src, zoomable = false }) => {
  const zoomHandler = () => {
    console.log("zoom!")
  }

  return <img src={src} alt='' onClick={zoomable ? zoomHandler : null} />
}

export default Image
