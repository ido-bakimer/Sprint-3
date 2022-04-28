export function NoteVideo({ note }) {
    return (
        <iframe width="230" height="150" src={note.info.videoUrl} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube" ></iframe>
    )
}