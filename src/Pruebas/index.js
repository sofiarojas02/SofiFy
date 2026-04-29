import {useEffect, useRef} from 'react';


function App(){
    const menuRef = useRef(null);

    useEffect(()=>{
        const detectarClickFuera = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                console.log('Hiciste click afueraa del menú');
            }
        };



        document.addEventListener('mousedown', detectarClickFuera);
        return () => {
            document.removeEventListener('mousedown', detectarClickFuera);
        }
    },[])


    return(
        <div className='m-5'
        ref={menuRef} 
        style={{ border: '1px solid black', padding: '20px' }}>
            Soy el Menú. Haz clic fuera de este cuadro.
    </div>
    )
    
}

export default App;