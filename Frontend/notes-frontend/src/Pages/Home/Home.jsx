import React, { useState } from "react";
import Navbar from "../../component/Navbar"
import NotesCard from "../../component/NotesCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal"

export const Home = () => {

    const [openModel, setOpenModel] = useState({
        isShown: false,
        type: "add",
        data: null
    })
    return (
        <>
           <Navbar />

           <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-2 mt-5">
                <NotesCard
                    title="Meeting on 2 Apr 2025 for project KT"
                    date="2 April 2025"   
                    content="WS1 project KT for new commers from japan side"
                    tags="#meeting"
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
            </div>
           </div>

           <button className="w-18 h-10 flex items-center justify-center rounded-lg bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {
            setOpenModel({isShown: true, type: "add", data: null})
           }}>
               <MdAdd className="text-[32px] text-white"/>
           </button>

           <Modal
             isOpen={openModel.isShown}
             onRequestClose={() => {}}
             style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.2)"
                }
             }}
            contentLabel=""
            className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
              <AddEditNotes 
              type={openModel.type}
              noteData={openModel.data}
              onClose={() => {
                setOpenModel({isShown: false, type:"add", data: null})
              }} />
              
            </Modal>
          
        </>
    )
}

export default Home;