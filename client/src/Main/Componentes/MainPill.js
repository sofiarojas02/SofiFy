
function MainPill({pillName, value, onSelect, mainFilter}){
    return(
        <div 
        className={`${mainFilter === value ? "pillActive": ""} main__pill badge rounded-pill fw-semibold m-1 `}
        onClick={() => onSelect(value)}
        >
            {pillName}
        </div>
    )
}

export {MainPill}