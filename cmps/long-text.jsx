export class LongText extends React.Component {
    state = {
        isShortTxtShow: true,
        text: this.props.text.substring(0, 100),
        btnTxt: 'Show more',
        isBtnShow:true,
    }

    componentDidMount(){
        if(this.props.dontShowBtn){
            this.setState({isBtnShow:false})
        }
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
        return <span className="longTxt">
            <span>{this.state.text}</span>
            {this.state.isBtnShow&&<span onClick={this.toggleTxtLng} className="showTxt">{this.state.btnTxt}</span>}
            
        </span>
    }
}