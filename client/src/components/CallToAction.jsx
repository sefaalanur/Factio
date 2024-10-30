import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more ?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these previous facts to expand your knowledge base
            </p>
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none'>
                <a href="" target='_blank' rel='noopener noreferrer'>
                    Discover fascinating facts
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="./src/components/ui/logoFactio.png" 
            className='mx-auto'/>
        </div>
    </div>
  )
}