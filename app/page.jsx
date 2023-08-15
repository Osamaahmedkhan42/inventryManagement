'use client'

import Header from './components/Header';
import Search from './components/Search';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios'

export default function Home() {
  const router = useRouter();
  const [stockData, setStockData] = useState([]);
  const [addProduct, setAddProduct] = useState({
    name: '',
    quantity: '',
    price: ''

  });


  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value
    })
  }

  const add = async (e) => {

    e.preventDefault()

    try {
      const res = await axios.post('/api/product', addProduct)

      if (res) {

        setAddProduct({
          name: '',
          quantity: '',
          price: ''
        })
      }
    } catch (error) {
      console.log(error)
      console.log('some thing went wrong!!')
    }
  }

  //GET DATA


  useEffect(() => {

    const getData = async () => {

      try {
        const res = await axios.get('/api/product')
        setStockData(res.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    getData()

  }, [addProduct])


  return (
    <>

      <Header />
      <div className="container bg-red-50 mx-auto space-y-2">


        <Search />

        <h1 className="text-2xl font-bold">Add a Product</h1>
        <h1>Name</h1>
        <input className="w-full border border-black rounded-md p-2" type="text" value={addProduct.name} onChange={handleChange} name="name" />
        <h1>Quantity</h1>
        <input className="w-full border border-black rounded-md p-2" type="text" value={addProduct.quantity} onChange={handleChange} name="quantity" />
        <h1>Price</h1>
        <input className="w-full border border-black rounded-md p-2" type="text" value={addProduct.price} onChange={handleChange} name="price" />


        <button className="bg-blue-900 mx-2 p-2 rounded font-extrabold" type="button" onClick={add}>ADD DATA</button>

        {/* TABLE */}

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Display Current Stock</h1>
          <table className="min-w-full border bg-white">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map(product => (
                <tr key={product._id} className="text-center">
                  <td className="border px-4 py-2">{product._id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">${product.price} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



      </div>
    </>
  );
}
