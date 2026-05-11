const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

function LibraryItem({ item, selectItem, menuPosition, deleteItemRef, onDeleteItem, setSelectItem, setMenuPosition, userName }){
    return (
        <li
            key={item.title}
            onContextMenu={(e)=>{
                    e.preventDefault()
                    setSelectItem(item.title)
                    setMenuPosition({x: e.clientX, y: e.clientY})
                }}
            className='list__item  d-flex p-2 pt-2 pb-2 align-items-center gap-2 rounded-3  bg-transparent text-white'
            >
                

                <div className='d-flex align-items-center'>
                    <img 
                    className={`list__item--img ${item.type === 'artista' ? 'rounded-circle' : 'rounded-3'}`}
                    src={item.img ? item.img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg'} 
                    alt={item.title} />
                </div>

                <div 
                className=''>
                    <h3 className='list__item--title m-0 mb-1'> {capitalize(item.title)} </h3>
                    <p className='list__item--subtitle m-0'> {capitalize(item.type) + ' • ' + (item.subtitle ? item.subtitle: userName)} </p>
                    {selectItem === item.title && (
                    <div 
                    ref={deleteItemRef}
                    className='deleteItem__option bg-dark'
                    style={{
                        position: 'fixed',
                        left: menuPosition.x,
                        top: menuPosition.y,
                    }}>
                        <p
                        onClick={onDeleteItem}
                        className='m-0'>X Eliminar</p>
                    </div>
                )}
                </div>

                

            </li>
    )
}

export {LibraryItem}