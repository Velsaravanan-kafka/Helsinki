import React from 'react'

const Total = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    
    <p>Number of exercises {total}</p>
  )
}

export default Total