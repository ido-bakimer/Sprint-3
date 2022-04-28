import { BookApp } from './pages/book-app.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { BookDetails } from './pages/book-details.jsx'

import { KeepApp } from './pages/keep-app.jsx'
import { EmailApp } from './pages/email-app.jsx'
import { EmailDetails } from './pages/email-details.jsx'
import { EmailCompose } from './pages/email-compose.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/email/compose" component={EmailCompose} />
                <Route path="/email/:emailId" component={EmailDetails} />
                <Route path="/email" component={EmailApp} />
                <Route path="/keep" component={KeepApp} />
                <Route path="/book/:bookId" component={BookDetails} />
                <Route path="/book" component={BookApp} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
