import React from 'react';
import { useQuery } from 'react-query';
import EmptyCard from './EmptyCard';

const getUser = async(user) => {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    return data;
}


const DetailCard = ({ user }) => {

  const { isLoading, isError, data } = useQuery( ["GET_USER", user], () => getUser(user) );

  if(isLoading){
    return <EmptyCard text="Loading..." />
  }

  if(isError){
    return <EmptyCard text="Error. Try again, please." />
  }


  return (
    <div className='detail'>
        <div className='left'>
            <img
                className='avatar' 
                src={data.avatar_url}
                alt={`avatar de ${data.name}`}
            />
        </div>
        <div className='right'>
            <div className='title'>
                <h2>{data.name}</h2>
                <a href="https://">@{data.login}</a>
            </div>
            <div className='stats'>
                <div className='item'>
                    <small>Repos</small>
                    <span>{data.public_repos}</span>
                </div>
                <div className='item'>
                    <small>Followers</small>
                    <span>{data.followers}</span>
                </div>
                <div className='item'>
                    <small>Following</small>
                    <span>{data.following}</span>
                </div>
            </div>
            <ul>
                <li>
                    <i className="fas fa-map-marker-alt"></i> {data.location ?? "Not available"}
                </li>
                <li>
                    <i className="fab fa-twitter"></i> {data.twitter_username ?? "Not available"}
                </li>
                <li>
                    <i className="fas fa-link"></i> {data.blog?.split("//")[1] ?? "Not available"}
                </li>
                <li>
                    <i className="fas fa-building"></i> {data.company ?? "Not available"}
                </li>
            </ul>
        </div>
    </div>
  )
}

export default DetailCard