import React from 'react'
import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2'
export const Loader = () => {
  return (
    <UseAnimations animation={loading2} size={80} fillColor='var(--primary-color)' /> 
  )
}

