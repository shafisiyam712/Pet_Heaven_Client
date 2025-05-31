import React from 'react';

const Newsletter = () => {
    return (
        <div className='w-11/12 mx-auto my-20 '>
            <div className="w-11/12 mx-auto h-72 md:h-64 border rounded-xl pl-4 pr-4 gap-2">
        <div className="rounded-xl flex flex-col justify-center items-center text-center gap-3 border h-60  md:h-52 mt-5">

            <h1 className="text-xl md:text-3xl font-extrabold text-[#121212] dark:text-white">Subscribe to our Newsletter</h1>
        <p className="text-[#121212] dark:text-white">Get heartwarming pet stories, adoption tips, and exclusive pet care deals delivered right to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3 w-3/2 max-w-md">
                        <input
                            className="p-3 rounded-xl border border-[#121212] w-full text-[#121212] placeholder-[#121212]"
                            placeholder="Your email address"
                            type="email"
                        />
                        <button className="px-6 py-3 rounded-xl font-semibold btn border border-[#04738C] bg-white text-[#04738C] hover:text-white hover:bg-[#04738C]">
                            Subscribe
                        </button>
                    </div>
        </div>
        </div>
        
        
    </div>
    );
};

export default Newsletter;

