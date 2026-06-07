function MusicCard(props){
    return(
        <div className="music__card">
            <div className="image__container">
                <img src={props.cardImage}/>
            </div>
            <div className="color-white">
                <h6>{props.cardName}</h6>
                <p>{props.cardMembers.join(", ")}</p>
            </div>
        </div>
    )
}

export {MusicCard}