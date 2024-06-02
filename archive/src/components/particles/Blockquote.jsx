const Blockquote = ({innerHTML}) => {
    return (
        <blockquote
          className='t-redactor__quote'
          dangerouslySetInnerHTML={{ __html: innerHTML }}></blockquote>
      )
}

export default Blockquote