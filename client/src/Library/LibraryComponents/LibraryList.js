import '../LibraryCss/LibraryList.css'

function LibraryList(props){
    return(
        <ul className="LibraryList__container">
            {props.children}
        </ul>
    )
}

export {LibraryList}