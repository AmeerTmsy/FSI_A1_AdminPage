import React from 'react';
import AutherCard from '../components/autherCard';
import { useLoaderData } from 'react-router-dom';

export async function loader(params) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/authers`)
    const authers = await response.json()
    return { authers }
}

function Authers(props) {
    const { authers } = useLoaderData()
    
    return (
        <main className='pt-28'>
            <section className='container mx-auto '>
                <h1 className='text-3xl font-medium py-10 p-3'>Authers page</h1>
                <div className='flex flex-row justify-evenly flex-wrap gap-8 pt-6'>
                    {
                        authers.map(auther => {
                            return <AutherCard key={auther._id} auther={auther} fromAutherPage={false}/>
                        })
                    }
                </div>
            </section>
        </main>
    );
}

export default Authers;