import React from "react";
import UserDetails from "./UserDetails";

class User extends React.Component{
    render(){

        const datas = {
            name:"Adisivan",
            email:"adisivanc@gmail.com",
            dob:"25/10/1990"
        }

        return <>
            <div className="bg-slate-300 px-4 py-3">
                <h1 className="text-xl font-bold">ADISIVAN</h1>
                <h2>User Details</h2>
                <p className="text-red-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquid quam sed cumque, voluptatum magni, corporis doloremque rerum voluptate illum aspernatur id eveniet nam vel eaque iure harum, fugit amet.illum aspernatur id eveniet nam vel eaque iure harum, fugit amet.</p>
                <p className="font-semibold">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ipsa illo voluptatum autem eligendi doloremque vitae amet ad animi distinctio, mollitia maxime nostrum itaque ducimus quaerat molestias ullam. Ipsum, doloribus.</p>
                <UserDetails datas={datas} />
            </div>
        </>
    }
}

export default User;