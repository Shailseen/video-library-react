import React from 'react'
import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2'
const Loader = () => {
  return (
    <UseAnimations animation={loading2} size={80} fillColor='var(--primary-color)' /> 
  )
}

export default Loader