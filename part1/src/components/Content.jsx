import React from 'react'
import Part from './Part'

const Content = (props) => {
  return (
    <div>
     {props.course.parts.map(part => {
       return <Part key ={part.name} part={part} />
     })}
    </div>
  )
}

export default Content