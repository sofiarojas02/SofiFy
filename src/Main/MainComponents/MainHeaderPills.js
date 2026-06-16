function MainHeaderPills(){
    return(
        <ul className="mainPills d-flex gap-2 list-unstyled">
            <li className="">
                <button className="pills__button rounded-pill">Todo</button>
            </li>
            <li className="">
                <button className="pills__button rounded-pill">Musica</button>
            </li>
            <li className="">
                <button className="pills__button rounded-pill">Podcast</button>
            </li>
        </ul>
    )
}

export {MainHeaderPills}