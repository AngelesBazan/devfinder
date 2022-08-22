import React from 'react';
import { useQuery } from 'react-query';
import EmptyCard from './EmptyCard';

/* 1ero Uso useQuery para el fetch */
const getUser = async(user) => {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    return data;
}
/* 2do En App tengo que proveer el cliente del useQuery */


const DetailCard = ({ user }) => {

  /* 3ero usar useQuery, con un string y una key */
  /* El segundo parámetro es la petición pasada como función anónima porque necesito pasarle el user por parámetro */
  const { isLoading, isError, data } = useQuery( ["GET_USER", user], () => getUser(user) );
  /* useQuery retorna un objeto con un montón de propiedades que desestructuro arriba */

  /* uso isLoading para comprobar si se está cargando la data, lo mismo con isError*/
  if(isLoading){
    return <EmptyCard text="Loading..." />
  }

  if(isError){
    return <EmptyCard text="Error. Try again, please." />
  }

  /* 4to Acá ya puedo acceder a data y toda la info para renderizarla en el return
  console.log(data); */

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