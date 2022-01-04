import React, { useState } from 'react';

interface Atributos {
    children: any,
    minWidth?: number,
    minHeight?: number
}

function Element(props: Atributos) {
    const [height, setHeight] = useState<number>(100)
    const [width, setWidth] = useState<number>(100)
    const [lastY, setLastY] = useState<number>(0)
    const [lastX, setLastX] = useState<number>(0)
    const [top, setTop] = useState<number>(50)
    const [left, setLeft] = useState<number>(200)
    const [minWidth, setMinWidth] = useState<number>(20);
    const [minHeight, setMinHeight] = useState<number>(20);
    
    const handleDrag = (op: string, e: any) => {
        let soma = 1;
        let sub = -1;

        if(op === "bottom"){
            if(lastY !== 0 && e.clientY !== 0)
            {
                soma = e.clientY - lastY;
                sub = e.clientY - lastY;
            }
            if(e.clientY !== lastY)
            {
                setHeight(e.clientY > lastY ? (height + soma) : (height + sub));
                setLastY(e.clientY);
            }
        }
        else if(op === "rigth"){
            if(lastX !== 0 && e.clientX !== 0)
            {
                soma = e.clientX - lastX;
                sub = e.clientX - lastX;
            }
            if(e.clientX !== lastX)
            {
                setWidth(e.clientX > lastX ? (width + soma) : (width + sub));
                setLastX(e.clientX);
            }
        }
        else if(op === "top")
        {
            if(lastY !== 0 && e.clientY !== 0)
            {
                soma = lastY - e.clientY;
                sub = e.clientY - lastY;
            }
            if(e.clientY !== lastY && top > 0)
            {
                //Valida se não foi arrastada pra fora da pagina (para cima).
                if(e.clientY < lastY ? (top + sub) : (top + sub) > 0)
                {
                    setHeight(e.clientY < lastY ? height + soma : height + soma);
                    setTop(e.clientY < lastY ? (top - soma) : (top + sub));
                    setLastY(e.clientY);    
                }
            }
        }
        else if(op === "left"){
            if(lastX !== 0 && e.clientX !== 0)
            {
                soma = lastX - e.clientX;
                sub = e.clientX - lastX;
            }
            if(e.clientX !== lastX && top > 0)
            {
                //Valida se não foi arrastada pra fora da pagina (para cima).
                if(e.clientX < lastX ? (top + sub) : (top + sub) > 0)
                {
                    setWidth(e.clientX < lastX ? width + soma : width + soma);
                    setLeft(e.clientX < lastX ? (left - soma) : (left + sub));
                    setLastX(e.clientX);    
                }
            }
        }
    }

    const handleDragStart = async (e: any) => {
        e.dataTransfer.setData("text/plain", "");
        const img = await new Image();
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    return(
            <div style={{position: 'absolute', background: 'green', width: width, height: height, top: top, left: left}}>
                <div style={{position: 'relative', width: width, height: height}}>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("top",e)}
                        style={{width: '100%', height: '10px', background: '#000', position: 'absolute', top: 0, cursor: 's-resize'}}>
                    </div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("rigth",e)}
                        style={{height: '100%', width: '10px', background: '#000', position: 'absolute', top: 0, right: 0, cursor: 'e-resize'}}>
                    </div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("left",e)}
                        style={{height: '100%', width: '10px', background: '#000', position: 'absolute', top: 0, left: 0, cursor: 'e-resize'}}>
                    </div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("bottom",e)}
                        style={{width: '100%', height: '10px', background: '#000', position: 'absolute',  bottom: 0, cursor: 's-resize'}}>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        )
}

export default Element;