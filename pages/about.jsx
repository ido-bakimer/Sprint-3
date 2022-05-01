import { eventBusService } from '../services/event-bus-service.js'
const {useEffect} = React


export function About() {
useEffect(()=>{
    eventBusService.emit('changeHeader',`About`)
})
    return <section className="about">
        <h3>Meet the team!</h3>
        <p>here at YAWHO?TM</p>
<div className="team-container">    
<div className="about-container"><img className ="profile-pic" src={'../assets/img/ido.png'} alt="" /></div>
<div className="about-container"><img className ="profile-pic" src={'../assets/img/Reem.jpg'} alt="" /></div>
</div> 
    </section>
}