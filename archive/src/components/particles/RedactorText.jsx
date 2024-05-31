const RedactorText = ({ innerHTML, paragraph = false }) => {
  if (paragraph)
    return (
      <p
        className='t-redactor__text'
        dangerouslySetInnerHTML={{ __html: innerHTML }}></p>
    )

  return (
    <div
      className='t-redactor__text'
      dangerouslySetInnerHTML={{ __html: innerHTML }}></div>
  )
}

export default RedactorText
