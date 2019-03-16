import React, { Component } from 'react';
import io from 'socket.io-client'

class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            key: 0,
            textfield: '',
            textfieldUsername: '',
            username: '',
            messages: [
            ],
        }
        this.socket = io('https://mern-instant-messenger.herokuapp.com/');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            recieveMessage(data);
        });
        const recieveMessage = (data) => {
            let newMessage = {
                username: data.username,
                id: this.state.key + 1,
                content: data.content
            }
            let newList = [...this.state.messages]
            newList.unshift(newMessage)

            this.setState({
                messages: newList,
                key: this.state.key + 1
            })
        }
    }

    handleChangeInput = (input) => {
        this.setState({
            textfield: input
        })
    }

    handleChangeUsername = (input) => {
        this.setState({
            textfieldUsername: input.toUpperCase(),
        })
    }

    handleUsername = () => {
        this.setState({
            username: this.state.textfieldUsername,
        })
    }

    handleSend = e => {
        if (this.state.textfield !== '' && this.state.username !== '') {
            this.socket.emit('SEND_MESSAGE', {
                username: this.state.username,
                content: this.state.textfield

            })

        } else {
            window.alert('message cannot be empty or username')
        }
        this.setState({ textfield: '' })
    }

    onKeyPres = (event) => {
        console.log("Clicked Me");
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            window.alert('enter')
        }
        return true
    }

    render() {

        return (
            // username

            <div className="chatContainer row">
                <div className="optionsContainer col-lg-4 col-sm-12 " >
                    <div className="optionsTitle" style={this.state.username ? { display: 'none' } : {}}>What's your Username?</div>
                    <div className="optionsUsername"> {this.state.username}</div>
                    <div className="row" style={this.state.username ? { display: 'none' } : {}}>
                        <div class="input-group mb-3">
                            <form onSubmit={e => {
                                e.preventDefault()
                                console.log("On Submit")
                                this.handleUsername()
                            }}>
                                <input type="text" class="form-control" placeholder="Username" aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.textfieldUsername} onChange={e => this.handleChangeUsername(e.target.value)} ></input>
                            </form>
                            <div class="input-group-append">
                                <button class="btn btn-dark" type="button" id="button-addon2" onClick={this.handleUsername} onKeyDown={this.onKeyPres}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* chatroom */}
                <div className="chatContainer col-lg-7 col-sm-12">
                    <div classname="col-lg-7">
                        <div class="jumbotron">
                            {
                                this.state.messages.map((message) => {
                                    return (
                                        <div className="messagePaper">
                                            <div className="messageTitle">
                                                {message.username}
                                            </div>
                                            <div className="messageText">
                                                {message.content}
                                                <hr></hr>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <form class="input-group mb-3"
                            onSubmit={e => {
                                e.preventDefault()
                                console.log("On Submit")
                                this.handleSend()
                            }}>
                            <input type="text" class="form-control" placeholder="What do you want to say?" aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.textfield} onChange={e => this.handleChangeInput(e.target.value)} ></input>
                            <div class="input-group-append">
                                <button class="btn btn-dark" type="button" id="button-addon2" onClick={this.handleSend} onKeyDown={this.onKeyPres}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat