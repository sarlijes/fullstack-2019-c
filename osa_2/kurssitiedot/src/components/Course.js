import React from 'react';

export const Course = ({ courses }) => {
  return (
    <div>
      <Header name={courses.name} />
      <Content parts={courses.parts} />
      <Total exercises={courses.parts.map(part => (
        part.exercises
      ))} />
    </div>
  )
};

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};


const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
};

const Total = ({ exercises }) => {
  const total = exercises.reduce((total, amount) => {
    return (total + amount)
  })
  return (
    <div>
      yhteensä {total} tehtävää
    </div>
  )
};