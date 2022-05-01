import { eventBusService } from '../services/event-bus-service.js'
const { useEffect } = React

export function Home() {

    useEffect(() => {
        eventBusService.emit('changeHeader', ``)
    })

    return <section className="home">
        <h2 className="animate__animated animate__fadeInRight">Welcome to YAWHO?</h2>
        <p>If you ever wanted to find <span>EVERY BOOK THAT EVER EXISTED ONLINE</span>, or <span>STORE YOUR VERY OWN PERSONILISED NOTES</span> and even <span>SENDING AND RECIEVEING* MAILS, NO PASSWORD OR ACOUNT NEEDED</span>, then you have come to the right place! Here at YAWHO™ we pride ourselved with cutting edge react technology, and we hope you may find some use of our vast application list.</p>
    
        <div className="mount"><img className="mountain-container" src={'./../assets/img/mountains.png'} alt="" /></div>
        

    </section>


}
