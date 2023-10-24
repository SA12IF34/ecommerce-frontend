import '../App.css';

type props = {
    topic: string | null,
    handleEvent: any | null,
    copy: string | null,
    button: string | null
}


function Popup({topic, handleEvent, copy, button}: props) {
    
  function handleCopy() {
    navigator.clipboard.writeText((copy as string));
  }

  function handleClose() {
    const popup = document.querySelector('.popup') as HTMLElement;
    popup.remove();
  }

  return (
    <div className='popup'>
        <p className='topic'>{topic}</p>
        {copy && (
            <span onClick={() => {
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