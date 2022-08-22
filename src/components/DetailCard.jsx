import React from 'react'

const DetailCard = () => {
  return (
    <div className='detail'>
        <div className='left'>
            <img
                className='avatar' 
                src="https://avatars.githubusercontent.com/u/583231?v=4"
                alt="avatar"
            />
        </div>
        <div className='right'>
            <div className='title'>
                <h2> </h2>
                <a href="https://"> </a>
            </div>
            <div className='stats'>
                <div className='item'>
                    <small>Repos</small>
                    <span>1</span>
                </div>
                <div className='item'>
                    <small>Followers</small>
                    <span>2</span>
                </div>
                <div className='item'>
                    <small>Following</small>
                    <span>3</span>
                </div>
            </div>
            <ul>
                <li>
                    <i className="fas fa-map-marker-alt"></i> Ad lorem
                </li>
                <li>
                    <i className="fas fa-twitter"></i> Ad lorem
                </li>
                <li>
                    <i className="fas fa-link"></i> Ad lorem
                </li>
                <li>
                    <i className="fas fa-building"></i> Ad lorem
                </li>
            </ul>
        </div>
    </div>
  )
}

export default DetailCard