import React from 'react'
import Link from 'next/link'


export const Navigation = () => {
  return (
    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <Link href="/">Home</Link>
            </li>
        </ul>
    </nav>
  )
}
export default Navigation;