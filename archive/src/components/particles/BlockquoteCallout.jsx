const BlockquoteCallout = ({innerHTML}) => {
    return (
        <blockquote
          className='t-redactor__callout'
          dangerouslySetInnerHTML={{ __html: innerHTML }}></blockquote>
      )
}

export default BlockquoteCallout