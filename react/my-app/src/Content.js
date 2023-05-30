import React from "react"

const Content = () => {

    let styleObj = {
        backgroundColor:"#990000",
        color:"#FFFFFF",
        padding:"10px 20px",
        borderRadius:"4px"
    }

    return (
        <section className="p-5">
            <span style={styleObj}>Without Tailwind</span>
        </section>
    )
}

export default Content