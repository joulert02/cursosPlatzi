import { BasicPicker } from 'react-color-tools'
import React from 'react'

const Section = (props) => (
    <section style={{
        background: props.color,
        margin: "0",
        width: "100%",
        height: "100vh",
        textAlign: "center"

    }}>
        <h1 style={{
            margin: "0"
        }}>Jouler Talaigua</h1>
        {props.children}
    </section>
)

class Main extends React.Component {
    state = {
        color: "hotpink"
    }

    render() {
        return (
            <Section color={this.state.color}>
                <p>To surpass itself is the best way to be the best part of you</p>
                <BasicPicker color={this.state.color}
                    onChange={(color) => this.setState({ color })}>
                </BasicPicker>
            </Section>
        )
    }
}

export default Main 