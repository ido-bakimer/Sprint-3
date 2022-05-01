import { eventBusService } from '../services/event-bus-service.js'
const { useEffect } = React


export function About() {
    useEffect(() => {
        eventBusService.emit('changeHeader', `About`)
    })
    return <section className="about">
        <h3>Meet the team!</h3>
        <div className="team-container">
            <div className="member-container">
                <div className="about-container">
                    <img className="profile-pic" src={'https://i.ibb.co/NxJBnft/ido.png'} alt="" /></div>
                    <h4>Ido Bakimer</h4>
                    <div className="member-details"><p>Known for his legendery CSS skills and hunger for all things code, this react developer wants nothing short of unique, tailor made perfection. And to play D&#38;D and Elden-Ring.</p></div>
            </div>
            <div className="member-container">
                <div className="about-container"><img className="profile-pic" src={'https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.6435-9/62022410_1250832561754465_1224251505415028736_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_ohc=8P0S2nzHo-EAX8T7xK3&_nc_oc=AQnVYMYgr125jMzSqk1P3b0ltsizWGtOeHFurUmNSJ6bBYDx2lStwX79sBhNWHMIPAE&_nc_ht=scontent.fsdv2-1.fna&oh=00_AT-wXthkqZfg3iy99sQyieY34AcAJMd56HGhax4XE-bZ8g&oe=6294224B'} alt="" /></div>
                <h4>Reem Kraus</h4>
                <div className="member-details"><p>Once a warrior in a far away land, now Reem fight his battles as a react ninja: utilising cutting edge developing skills in react to destroy all opposition. He really like beer, and fart jokes.</p></div>
            </div>
        </div>
        <div><img className="forest-container" src={'https://i.ibb.co/RjGcxbv/forest2.png'} alt="" /></div>
    </section>
}