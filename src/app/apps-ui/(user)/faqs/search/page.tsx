// app/support/search/page.tsx
"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState, useEffect } from 'react'
import { FaqsArray } from '../faqs-component/FaqsArray'

interface FaqsArrayProps {
    id: number;
    question: string;
    answer: string;
}

export default function SearchResults() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    const [searchQuery, setSearchQuery] = useState(query)
    const [results, setResults] = useState<FaqsArrayProps[]>([])

    useEffect(() => {
        const filtered = FaqsArray.filter(item => 
            item.question.toLowerCase().includes(query.toLowerCase()) ||
            item.answer.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
    }, [query])

    const handleNewSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/apps-ui/faqs/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div className="w-full min-h-screen bg-white">
            <div className="w-full h-fit pt-[15dvh] pb-[10dvh]">
                <div className="w-full md:max-w-[75%] max-w-[90%] mx-auto min-h-[40dvh] bg-shade-1 px-[5dvh] py-[5dvh] rounded-3xl">
                    <div className="w-full h-full flex flex-col gap-8">
                        {/* Header Section */}
                        <div className="flex flex-col gap-6">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-shade-8 hover:text-primary-2 transition-colors w-fit"
                            >
                                <Icon icon="eva:arrow-back-fill" width="24" height="24" />
                                <span className="font-medium">Back to Support</span>
                            </button>
                            <div>
                                <h1 className="font-extrabold text-4xl text-primary-2">
                                    Search Results
                                </h1>
                                <p className="text-xl text-shade-6 mt-2">
                                    Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                                </p>
                            </div>

                            {/* Search Input */}
                            <div className="w-full xl:max-w-md lg:max-w-xs max-w-[90%] h-fit relative text-secondary-1 rounded-2xl">
                                <input
                                    className="placeholder:text-secondary-1 text-lg font-medium rounded-full bg-quaternary-1 ring-none outline-none w-full py-3 px-14"
                                    type="text"
                                    placeholder="Search again"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleNewSearch()}
                                />
                                <Icon
                                    className="absolute top-1/2 -translate-y-1/2 left-4 text-secondary-1"
                                    icon="cil:search"
                                    width="23"
                                    height="23"
                                />
                                <Icon
                                    onClick={handleNewSearch}
                                    className="cursor-pointer -mt-1 absolute top-[55%] -translate-y-1/2 right-4 text-secondary-1"
                                    icon="iconamoon:send-thin"
                                    width="28"
                                    height="28"
                                />
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="w-full">
                            {results.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                                    <div className="w-16 h-16 bg-quaternary-1 rounded-full flex items-center justify-center">
                                        <Icon 
                                            icon="mingcute:search-line" 
                                            width="32" 
                                            height="32" 
                                            className="text-secondary-1" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary-2 mb-2">
                                            No results found
                                        </h3>
                                        <p className="text-shade-6">
                                            Try different keywords or browse our FAQ sections
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {results.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-6 bg-quaternary-1 rounded-xl hover:bg-quaternary-2 transition-colors"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-xl mb-3 text-primary-2">
                                                    {item.question}
                                                </h3>
                                                <p className="text-shade-7 leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}