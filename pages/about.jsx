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
                    <img className="profile-pic" src={'./../assets/img/ido.png'} alt="" /></div>
                    <h4>Ido Bakimer</h4>
                    <div className="member-details"><p>Known for his legendery CSS skills and hunger for all things code, this react developer wants nothing short of unique, tailor made perfection. And to play D&#38;D and Elden-Ring.</p></div>
            </div>
            <div className="member-container">
                <div className="about-container"><img className="profile-pic" src={'./../assets/img/Reem.jpg'} alt="" /></div>
                <h4>Reem Kraus</h4>
                <div className="member-details"><p>Once a warrior in a far away land, now Reem fight his battles as a react ninja: utilising cutting edge developing skills in react to destroy all opposition. He really like beer, and fart jokes.</p></div>
            </div>
        </div>
        <div><img className="forest-container" src={'./../assets/img/forest2.png'} alt="" /></div>
    </section>
}