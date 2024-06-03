// const Image = ({ src, zoomable = false }) => {
//   const zoomHandler = () => {
//     console.log("zoom!")
//   }
//   if (zoomable) {
//     return (
//       <div className="zooming_chart">
//         <img src={src} alt='' onClick={zoomable ? zoomHandler : null} />
//       </div>
//     )
//   } else {
//     return <img src={src} alt='' onClick={zoomable ? zoomHandler : null} />
//   }
//   // return (
//   //     <img src={src} alt='' onClick={zoomable ? zoomHandler : null} />
//   // )
// }

// export default Image

import { useState, useEffect } from 'react';

const Image = ({ src, zoomable = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [isZoomEnabled, setIsZoomEnabled] = useState(true); // Новое состояние

  const zoomHandler = () => {
    if (!isZoomEnabled) return; // Игнорируем вызов, если зум не разрешен
    setIsActive(true);
    openPopup();
    setIsZoomEnabled(false); // Отключаем зум после его активации
  };

  const closeHandler = () => {
    setIsActive(false);
    closePopup();
    setIsZoomEnabled(true); // Включаем зум после закрытия
  };

  // useEffect(() => {
  //   if (isActive) {
  //     openPopup();
  //   } else {
  //     closePopup();
  //   }
  // }, [isActive]);

  return (
    <div>
      {zoomable && (
        <div className={`zooming_chart ${isActive ? 'active' : ''}`} onClick={zoomHandler}>
          <img src={src} alt='' />
        </div>
      )}
      {!zoomable && <img src={src} alt='' />}

      {isActive && (
        <div className="zoom-close" onClick={closeHandler} style={closeButtonStyle}>
          <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="#000000"></path>
            <path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="#000000"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

const closeButtonStyle = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  zIndex: 1000000,
  padding: '10px',
  height: '20px',
  width: '20px'
};

let bodyOverflow = document.querySelector('body');
let scrollPosition = 0;

function closePopup() {
  bodyOverflow.style.removeProperty("overflow");
  bodyOverflow.style.removeProperty("position");
  bodyOverflow.style.removeProperty("top");
  bodyOverflow.style.removeProperty("width");
  window.scrollTo(0, scrollPosition);
}

function openPopup() {
  scrollPosition = window.scrollY;
  bodyOverflow.style.overflow = "hidden";
  bodyOverflow.style.position = "fixed";
  bodyOverflow.style.top = `-${scrollPosition}px`;
  bodyOverflow.style.width = "100%";
}

export default Image;

