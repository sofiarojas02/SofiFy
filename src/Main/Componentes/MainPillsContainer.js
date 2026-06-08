function MainPillsContainer(props){

    return(
        <div className="recent__pills d-flex justify-content-between ">
            <div 
            className="d-flex"
            >
                {props.children}
            </div>

            <div 
            className="pill-add badge rounded-pill px-3 py-2 fw-semibold m-1 border"
            onClick={props.addRecent}
            >
                <p className="m-0 p-0">Add</p>
            </div>
        </div>
    )
}

export {MainPillsContainer}