import React from 'react';
import Loading from '../../components/Loading';

const Loader = () => {
    return (
        <div className='h-[80vh] w-full flex justify-center items-center'>
            <Loading/>
        </div>
    );
};

export default Loader;