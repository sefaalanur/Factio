import {FaThumbsUp} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import moment from 'moment';
export default function FactCard({fact, onLike}) {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='relative w-full flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <span className='absolute top-2 left-2 text-gray-500 text-xs'>
            {moment(fact.createdAt).fromNow()}
          </span>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
            {fact && fact.title}
            </h2>
            <p className='text-gray-500 my-2'
            dangerouslySetInnerHTML={{ __html: fact && fact.content}}
            />
        </div>
        <div className="p-7 flex-1">
        <img src={fact && fact.image}
            className='mx-auto h-36'/>
        </div>
        <div>
          <div className='absolute bottom-2 left-2'>
          <button
            type='button'
            onClick={() => onLike(fact._id)}
            className={` text-gray-400 hover:text-blue-500 ${
              currentUser &&
              fact.likes.includes(currentUser._id) &&
              '!text-blue-500'
            }`}
          >
            <FaThumbsUp className='text-base' />
          </button>
          <span className='text-xs ml-2'>{fact.numberOfLikes}</span>
          </div>
          
        </div>
    </div>
    
  )}