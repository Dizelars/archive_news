const Video = ({ src, poster }) => {
  return (
    <div className='video_wrapper'>
      <video src={src} poster={poster} controls playsInline />
    </div>
  )
}

export default Video
