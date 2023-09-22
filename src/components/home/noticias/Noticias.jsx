import React, {useState} from 'react'
import {info} from '../../../data'
import Card from './Card';
import  './noticias.css';

const Noticias = () => {
    const [items, setitems] = useState(info);
  return (
    <>
        <section  className='noticias'>
            <div className='container'>
                {items.map((item)=>{
                    return <Card key={item.id} item={item}/>
                })}
            </div>
        </section>
    </>
  )
}

export default Noticias

