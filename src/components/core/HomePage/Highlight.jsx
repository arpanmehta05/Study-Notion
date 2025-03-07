import React from 'react'

export default function Highlight(props) {
    const text = props.text;
  return (
    <span className='font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-[#ffffff01] bg-clip-text'>
        {" "}{text}
    </span>
  )
}
