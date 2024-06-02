const Image = ({ src, zoomable = false }) => {
  const zoomHandler = () => {
    console.log("zoom!")
  }
  if (zoomable) {
    return (
      <div className="zooming_chart">
        <img src={src} alt='' onClick={zoomable ? zoomHandler : null} />
      </div>
    )
  } else {
    return <img src={src} alt='' onClick={zoomable ? zoomHandler : null} />
  }
  // return (
  //     <img src={src} alt='' onClick={zoomable ? zoomHandler : null} />
  // )
}

export default Image
