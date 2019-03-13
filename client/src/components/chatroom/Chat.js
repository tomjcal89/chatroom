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
        this.socket = io('https://guarded-fortress-17968.herokuapp.com/');

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
            <div className="row">
                <div className="optionsContainer col-lg-5">
                    <div className="optionsTitle" style={this.state.username ? { display: 'none' } : {}}>Please enter your Username to start chatting</div>
                    <div className="optionsUsername"> {this.state.username}</div>
                    <div className="row" style={this.state.username ? { display: 'none' } : {}}>
                        <form onSubmit={e => {
                            e.preventDefault()
                            console.log("On Submit")
                            this.handleUsername()
                        }}>
                            <input type="text" className="usernameInput" value={this.state.textfieldUsername} onChange={e => this.handleChangeUsername(e.target.value)} ></input>

                            <button className="button" class="btn btn-dark" type="submit" /*onClick={() => this.handleUsername()}*/>Submit</button>
                        </form>
                    </div>
                </div>

                {/* chatroom */}
                <div className="chatContainer col-lg-7">

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

                        <div className="messageInputContainer row" >
                        <div className="row">
                        <form onSubmit={e => {
                            e.preventDefault()
                            console.log("On Submit")
                            this.handleSend()
                        }}>
                                <input type="text" className="messageInput" value={this.state.textfield} onChange={e => this.handleChangeInput(e.target.value)} ></input>
                            </form>
                            <button className="button" type="button" class="btn btn-dark" onClick={this.handleSend} onKeyDown={this.onKeyPres}>Send</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat