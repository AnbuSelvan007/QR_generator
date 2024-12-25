import React, { createElement, useState } from 'react'
import './Display.css'

function Display() {
    const [image,setimage]=useState(false);
    const [imgsize,setimgsize]=useState('');
    const [imglink,setimglink]=useState('');
    const[loading,setloading]=useState(false);
    const[url,seturl]=useState('');
    async function generator(){
      if(imgsize==''||imglink=='')
        return alert(`fill all boxes`)
      setloading(true);
      try{
        seturl(`https://api.qrserver.com/v1/create-qr-code/?size=${imgsize}x${imgsize}&data=${imglink}`)
       
      }
      catch(error){
        <p>Some times went wrong</p>
      }
      finally{
        setimage(true);
        setloading(false);
      }
    }
 function handledownload(){
  if(imgsize==''||imglink=='')
    return alert(`fill all boxes`)
    fetch(url).then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download='QRcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    })
 }
  return (
    <div className='container'>
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>please wait...</p>}
        {image && <img src={url} alt="" /> }<br></br>
        {image && <button onClick={()=>setimage(!image)}>close QR code</button> }
        <div className=''>
        <label htmlFor="" >Data for QR Code:</label><br></br>
        <input type="text" id='linkinput' onChange={(e)=>setimglink(e.target.value)} value={imglink} placeholder='Enter data for QR Code'  />
        </div>
        <div>
        <label htmlFor=""> Image Size (i.e,150):</label><br></br>
        <input type="text" id='sizeinput'  onChange={(e)=>setimgsize(e.target.value)} value={imgsize} placeholder='Enter image size'/>
        </div>
        <div>
        <button className='gen' onClick={generator}>Generate QR Code</button>
        <button className='down' onClick={handledownload}>Download QR Code</button>
        </div>

    </div>
  )
}

export default Display
