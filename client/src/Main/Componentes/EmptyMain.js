function EmptyMain ({valueNotFound}) {
    return(
        <div className="value-not-found__container">
            <p className="value-not-found__text">No se encontro: {valueNotFound} </p>
        </div>
    )
}

export {EmptyMain}