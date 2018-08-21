import React, { Fragment } from 'react'

const Avatar = ({ name, avatar }) => (
  <Fragment>
    <h5 className='center fighter'>
      {name}
     </h5>
     <img className='avatar' src={avatar} />
  </Fragment>
)

export default Avatar
