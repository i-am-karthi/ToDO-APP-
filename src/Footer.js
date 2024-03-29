import React from 'react'
const Footer = ({length}) => {
  return (
    <footer>
   <h2>{length} List {length >=2?"Items":"Item"}</h2>
    </footer>
  )
}

export default Footer