import React from 'react'

const History = ({users}) => {
  return (
    <div>
        <h4>Search history</h4>
        <ul>
            {
                users?.map((user, index) => (
                    <li key={index}>
                        <a href={`https://github.com/${user}`}>{user}</a>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default History