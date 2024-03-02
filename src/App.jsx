import { useState, useCallback, useRef, useEffect } from 'react'

function App() {

  const[slider, setSlider] = useState(10)
  const[numCheck, setNumCheck] = useState(false)
  const[charCheck, setCharCheck] = useState(false)
  const[genpassword, setGenPassword] = useState("")
  const[copy,setCopy] = useState("COPY")

  const passwordRef = useRef(null)

  const passGenerator = useCallback(()=>{
    let password = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    numCheck?string+="0123456789":string
    charCheck?string+="!@#$%^&*(){}[]":string
    for (let i = 1; i <= slider; i++) {
      let passCharNum = Math.floor(Math.random()*string.length+1)
      password += string.charAt(passCharNum)
    }
    setGenPassword(password)
    setCopy("COPY")
  },[slider,numCheck,charCheck])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,21)
    window.navigator.clipboard.writeText(genpassword)
    setCopy("COPIED")
  }, [genpassword])

  useEffect(()=>{passGenerator()}
  ,[slider, numCheck, charCheck, passGenerator])

  return (
    <div className='bg-slate-600 w-full h-screen flex items-start justify-center'>
        <div className="w-full max-w-lg bg-black text-white mx-auto rounded-lg p-5 mt-10 flex flex-col gap-5">
          <h1 className='font-bold text-3xl text-center py-3'>PASSWORD GENERATOR</h1>
          <div className='flex gap-2 font-semibold'>
              <input type="text" 
              className='px-2 py-1 rounded-md w-full text-gray-800 outline-none text-lg'
              value={genpassword}
              placeholder='Password'
              ref={passwordRef}
              readOnly/>
              <button onClick={copyPassword} className='bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-500 w-28 '>{copy}</button>
          </div>
          <div className="flex justify-between text-lg gap-2">
            <div className="flex items-center gap-x-2 w-fit ">
                <input 
                className='cursor-pointer w-fit' 
                type="range" 
                min={6} 
                max={20} 
                value={slider} 
                onChange={e=>setSlider(e.target.value)} />
                <label> Length : {slider}</label>
            </div>
            <div className='flex justify-around w-1/2'>
              <div className="flex items-center  gap-x-1">
                  <input className='size-4  cursor-pointer'
                  id='number'
                  type="checkbox"  
                  defaultChecked={numCheck}
                  onChange={()=>{
                    setNumCheck(prev=>!prev)
                  }} />
                  <label htmlFor='number' className=' cursor-pointer'>Number</label>
              </div>
              <div className="flex  items-center gap-x-1">
                  <input className='size-4  cursor-pointer'
                  id='character'
                  type="checkbox"  
                  defaultChecked={charCheck}
                  onChange={()=>{
                    setCharCheck(prev=>!prev)
                  }} />
                  <label htmlFor='character' className=' cursor-pointer'>Character</label>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
