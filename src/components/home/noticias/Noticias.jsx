import React, {useState} from 'react'
import {noticiasdata} from '../../../data'
import Card from './Card';
import  './noticias.css';

const Noticias = () => {
    const [items, setItem] = useState(noticiasdata);
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

