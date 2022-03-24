

export const Bg = () => {
  return (
    <div className="video-bg">
        <video width="320" height="240" autoPlay loop muted>
          <source
            src="/video/bg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div> 
  )
}
