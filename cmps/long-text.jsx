export class MoreText extends React.Component {
    state = {
        isShortTxtShow: true,
        text: this.props.text.substring(0, 100),
        btnTxt: 'Show more'
    }

    toggleTxtLng = () => {

        if (this.state.isShortTxtShow) {
            this.setState({ text: this.props.text, isShortTxtShow: false, btnTxt: 'Show less' })
        }
        else {
            this.setState({ text: this.state.text.substring(0, 100), isShortTxtShow: true, btnTxt: 'Show more' })
        }

    }

    render() {
        return <section className="longTxt">
            <p>{this.state.text}  <span onClick={this.toggleTxtLng} className="showTxt">{this.state.btnTxt}</span></p>
            <span></span>
            
        </section>
    }
}