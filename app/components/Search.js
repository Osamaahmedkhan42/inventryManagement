'use client'
import { useState } from "react"
import axios from "axios";
export default function Search() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])

    const searchIt = async () => {

        if (!loading) {

            try {
                setLoading(true)
                setResults([])
                const res = await axios.get(`http://localhost:3000/api/search?q=${query}`)
                setResults(res.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }
        }


    }

    const handleChange = (e) => {



        setQuery(e.target.value)



    }



    return <>
        <div className="mb-4">
            <h1 className="text-2xl font-semibold mb-4">Search</h1>
            <input
                type="text"
                placeholder="Search by Product Name"
                className="border rounded-md px-3 py-2 w-1/2"
                name="search"
                value={query}
                onChange={handleChange}

            />
            <button className="bg-blue-900 mx-2 p-2 rounded font-extrabold" type="button" onClick={searchIt}  >Search</button>

        </div>
        <div>
            {loading && <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
            }
            {results.map(item => {
                return <div key={item._id} className="container space-x-14">
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>{item.price}</span>
                </div>
            })}
        </div>
    </>
}


