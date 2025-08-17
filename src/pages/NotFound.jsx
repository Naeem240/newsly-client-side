import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

const NotFound = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Helmet>
                <title>404 Not Found</title>
            </Helmet>
            <div className='pt-20 min-h-screen m-auto flex flex-col justify-center items-center'>
                <h1 className='text-center text-7xl'>404 Not Found!</h1>
                <Link viewTransition to='/' className='btn mt-4 btn-outline w-1/3'>Back to Home</Link>
                <img src="/loading.gif" alt="" />
            </div>
        </>
    );
};

export default NotFound;