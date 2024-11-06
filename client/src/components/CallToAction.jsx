import { Button } from 'flowbite-react';

export default function CallToAction({fact}) {
    
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                {fact && fact.title}
            </h2>
            <p className='text-gray-500 my-2'
            dangerouslySetInnerHTML={{ __html: fact && fact.content}}
            />
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none mt-4' href="/facts">

                    Discover fascinating facts

            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src={fact && fact.image}
            className='mx-auto h-1/2 w-1/2'/>
        </div>
    </div>
  )
}