import React from 'react'
import Part from './Part'

const Content = (props) => {
  return (
    <div>

      <Part part = {props.part1}/>
      <Part part = {props.part2}/>
      <Part part = {props.part3}/>
    {/* <p>{props.part1} {props.exercises1}</p>
    <p>{props.part2} {props.exercises2}</p>
    <p>{props.part3} {props.exercises3}</p> */}
    </div>
  )
}

export default Content