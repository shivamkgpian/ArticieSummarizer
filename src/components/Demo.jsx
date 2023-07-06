import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from "../services/articles";

const Demo = () => {
    const [copied, setCopied] = useState("");
    const [allArticles, setallArticles] = useState([]);
    useEffect(() => {
        const articlesFromlocalStorage = JSON.parse(localStorage.getItem('articles'));
        if (articlesFromlocalStorage) {
            setallArticles(articlesFromlocalStorage)
        }
    }, [])
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    })
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary }
            const updateAllarticles = [newArticle, ...allArticles];
            console.log(newArticle)
            setArticle(newArticle);
            setallArticles(updateAllarticles)
            localStorage.setItem('articles', JSON.stringify(updateAllarticles))
        }
    }
    const handleCopy = (copyurl) => {
        setCopied(copyurl);
        navigator.clipboard.writeText(copyurl);
        setTimeout(() => setCopied(false), 3000)
    }
    return (
        <section className="mt-16 w-full max-w-xl">
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
                    <img src={linkIcon} alt="" className="absolute left-0 my-2 ml-3 w-5" />
                    <input
                        type="url"
                        placeholder="Enter a Url"
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        required
                        className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0 peer" />
                    <button type="submit" className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700">
                        Enter
                    </button>
                </form>
                {/* Browse URL histroy */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer"
                        >
                            <div className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer" onClick={() => handleCopy(item.url)}>
                                <img src={copied === item.url ? tick : copy} alt="" className="w-[40%] h-[40%] object-contain" />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="font-inter font-bold text-black text-center">error occurs, please check your link</p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                Article <span className="font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Summary</span>
                            </h2>
                            <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                                <p className="font-inter font-medium text-sm text-gray-700">
                                    {article.summary}
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}

export default Demo;