import React from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  const course = { // This is the structure you had after 1.1/1.2 initially
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      {/* Pass parts of the course object as needed */}
      <Header course={course} /> {/* Header now receives the full course object */}
      <Content course={course} /> {/* Content now receives the full course object */}
      <Total course={course} />   {/* Total now receives the full course object */}
    </div>
  )
}

export default App