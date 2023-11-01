import '../App.css';

type props = {
    topic: string | null,
    handleEvent: any | null,
    button: string | null,
    setPopup: any,
    copy: boolean
}


function Popup({setPopup, topic, handleEvent, button, copy}: props) {
    
  function handleCopy() {
    const ele = document.createElement('input') as HTMLInputElement;
    ele.value = '4242424242424242';
    ele.select()
    ele.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(ele.value);
    alert('copied text')
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
            }} className='copy'>{'4242424242424242'}</span>
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