import '../App.css';

type props = {
    topic: string | null,
    handleEvent: any | null,
    copy: string | null,
    button: string | null,
    setPopup: any
}


function Popup({setPopup, topic, handleEvent, copy, button}: props) {
    
  function handleCopy() {
    navigator.clipboard.writeText((copy as string));
  }

  function handleClose() {
    setPopup(<></>)
  }

  return (
    <div className='popup'>
        <p className='topic'>{topic}</p>
        {copy && (
            <span style={{cursor: 'pointer'}} onClick={() => {
                handleCopy();
            }} className='copy'>{copy}</span>
        )}
        <div>
          {button && (
              <button onClick={() => {
                  handleEvent();
              }} className='button'>{button}</button>
          )}
            <button onClick={() => {
                handleClose();
            }} className='close'>close</button>
        </div>
    </div>
  )
}

export default Popup;