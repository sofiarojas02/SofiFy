import './right-panel.css'

function RightPanel({ title, type, podcastName, author, description, coverImage, authorImage, onClose }) {
    return (
        <aside className="right-panel__container">
            {/* Encabezado del panel */}
            <header className="right-panel__header">
                <h5>{title} — {type}</h5>
                <button 
                className="right-panel__close-btn"
                onClick={onClose}
                >×</button>
            </header>

            {/* Contenido scrolleable */}
            <div className="right-panel__content">
                {/* Portada Principal */}
                <div className="right-panel__cover-wrapper">
                    <img src={coverImage} alt={title} className="right-panel__cover" />
                </div>

                {/* Información del capítulo/canción */}
                <div className="right-panel__track-info">
                    <div className="track-info__text">
                        <h4>{title}</h4>
                        <p>{podcastName}</p>
                    </div>
                    <div className="track-info__actions">
                        <button className="btn-add">+</button>
                        <button className="btn-options">•••</button>
                    </div>
                </div>

                {/* Sección Acerca del Podcast / Artista */}
                <section className="right-panel__about-card">
                    <h6>Acerca del {type.toLowerCase()}</h6>
                    <p className="about-card__description">{description}</p>
                    
                    {/* Fila del autor/creador */}
                    <div className="about-card__author-row">
                        <img src={authorImage} alt={author} className="author-row__img" />
                        <div className="author-row__text">
                            <h6>{podcastName}</h6>
                            <p>{author}</p>
                        </div>
                        <button className="btn-follow">Seguir</button>
                    </div>
                </section>
            </div>
        </aside>

    );
}

export { RightPanel };