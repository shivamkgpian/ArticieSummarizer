import { logo } from '../assets'
const Hero = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col">
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <img src={logo} alt="sumz_logo" className='w-28 object-contain' />
                <button type='button' onClick={() => window.open('https://github.com/shivamkgpian')} className='rounded-full border border-black bg-black py-1.5 px-5 text-sm text-white transition-all '>GitHub</button>
            </nav>
            <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'>

                Article Summarization Enhanced with <br className='max-md:hidden' /> <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>OpenAI GPT-4</span>
            </h1>
            <h2 className='mt-5 text-lg text-gray-600 sm:text-xl text-center max-w-2xl'>Streamline your reading experience with Summize, an open-source article summarizer. This powerful tool condenses lengthy articles into concise and easily digestible summaries.</h2>
        </header>
    );
}

export default Hero;