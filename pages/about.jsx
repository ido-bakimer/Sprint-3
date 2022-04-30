import { eventBusService } from '../services/event-bus-service.js'
const {useEffect} = React
export function About() {
useEffect(()=>{
    eventBusService.emit('changeHeader',`About`)
})
    return <section className="about">
        <h3>We are all about Books!</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam cupiditate sequi blanditiis dicta debitis mollitia nesciunt consectetur quo atque aperiam totam eligendi, explicabo, nihil, inventore earum obcaecati placeat voluptatum vero.</p>
    </section>
}