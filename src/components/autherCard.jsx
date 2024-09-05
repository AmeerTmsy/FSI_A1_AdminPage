import React from 'react';
import { Link } from 'react-router-dom';

function AutherCard(props) {
    const auther = props.auther
    
    return (
        <article className='autherCard text-center'>
            <Link to={`/authers/${auther._id}`}><img className='w-full object-cover object-center aspect-square rounded-full' src={auther.image} alt=""/></Link>
            <Link to={`/authers/${auther._id}`}><h3 className='p-4 font-medium'>{auther.name}</h3></Link>
            
        </article>
    );
}

export default AutherCard;