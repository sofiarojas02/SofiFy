import '../LibraryCss/LoadingLibrary.css'

function LoadingLibrary({type}){
    return(
        <>
        <li        
        className='loadingLibrary__item list__item  d-flex p-2 pt-2 pb-2 align-items-center gap-2 rounded-3 '
        >
            <div className='loadingLibrary__img'></div>
            <div className=''>
                <h3 className='loadingLibrary__title m-0 mb-1'></h3>
                <p className='loadingLibrary__subtitle m-0'></p>
            </div>
        </li>
        <li        
        className='loadingLibrary__item list__item  d-flex p-2 pt-2 pb-2 align-items-center gap-2 rounded-3 '
        >
            <div className='loadingLibrary__img'></div>
            <div className=''>
                <h3 className='loadingLibrary__title m-0 mb-1'></h3>
                <p className='loadingLibrary__subtitle m-0'></p>
            </div>
        </li>
        <li        
        className='loadingLibrary__item list__item  d-flex p-2 pt-2 pb-2 align-items-center gap-2 rounded-3 '
        >
            <div className='loadingLibrary__img'></div>
            <div className=''>
                <h3 className='loadingLibrary__title m-0 mb-1'></h3>
                <p className='loadingLibrary__subtitle m-0'></p>
            </div>
        </li>
    </>
    )
}

export{LoadingLibrary}