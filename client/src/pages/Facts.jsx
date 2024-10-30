import CallToAction from '../components/CallToAction';
export default function Facts() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Facts</h1>
      <p className='text-md text-gray-500'>Expand your knowledge base with discovering fascinating facts !</p>
      <CallToAction />
    </div>
  )
}