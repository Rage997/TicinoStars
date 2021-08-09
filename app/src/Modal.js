import React from "react";

const Modal = ({ show, setShow, content }) => {
  return show ? (
    <div id='modal'>
      <div
        style={{
          //  height: '100%',
          display: "flex",
        }}
        className="card"
      >
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}></div>
          <button className='icon-btn ' onClick={() => setShow(false)}><span className="material-icons">close</span></button>
        </div>
        <div>
            <h1>{content.title}</h1>
            <p>{content.text}</p>
            {content.img ? <img width="100%" src={content.img} alt='content'></img> : ''}
          </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
