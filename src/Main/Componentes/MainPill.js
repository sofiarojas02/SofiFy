
function MainPill({pillName}){
    return(
        <div className="badge rounded-pill bg-transparent text-white px-3 py-2 fw-semibold m-1 border border-white">
            {pillName}
        </div>
    )
}

export {MainPill}