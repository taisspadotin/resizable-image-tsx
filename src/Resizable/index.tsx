import React, { useState } from 'react';

interface Atributos {
    children: React.ReactNode,
    minWidth?: number,
    minHeight?: number,
    top?: number,
    left?: number,
    width?: number,
    height?: number
}

function Resizable(props: Atributos) {
    const [height, setHeight] = useState<number>(props.height ? props.height : 100)
    const [width, setWidth] = useState<number>(props.width ? props.width : 100)
    const [lastY, setLastY] = useState<number>(0)
    const [lastX, setLastX] = useState<number>(0)
    const [top, setTop] = useState<number>(props.top ? props.top :50)
    const [left, setLeft] = useState<number>(props.left ? props.left : 200)
    const [minWidth, setMinWidth] = useState<number>(props.minWidth ? props.minWidth : 50);
    const [minHeight, setMinHeight] = useState<number>(props.minHeight ? props.minHeight : 50);
    
    const handleDrag = (op: string, e: React.DragEvent<HTMLDivElement>) => {
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
                //Valida se o tamanho do height bate com o mimHeight 
                if(e.clientY > lastY ? (height + soma) : (height + sub) >= minHeight){
                    setHeight(e.clientY > lastY ? (height + soma) : (height + sub));
                    setLastY(e.clientY);
                }
                
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
                //Valida o tamanho com o mimWidth
                if(e.clientX > lastX ? (width + soma) : (width + sub) >= minWidth){
                    setWidth(e.clientX > lastX ? (width + soma) : (width + sub));
                    setLastX(e.clientX);
                }
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
                if(e.clientY < lastY ? (top + sub) : (top + sub) > 0 && height + soma >= minHeight)
                {
                    setHeight(height + soma);
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
                if(e.clientX < lastX ? (top + sub) : (top + sub) > 0 && width + soma >= minWidth)
                {
                    setWidth(width + soma);
                    setLeft(e.clientX < lastX ? (left - soma) : (left + sub));
                    setLastX(e.clientX);    
                }
            }
        }
    }

    const handleDragStart = async (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", "");
        const img = await new Image();
        e.dataTransfer.setDragImage(img, 0, 0);
        e.dataTransfer.effectAllowed = "all";
    }

    return(
            <div className="content-drag" onDrop={(e => {console.log(e)})}
            onDragOver={(e => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                //e.currentTarget.style.cursor = "move";
            })}
            style={{position: 'absolute', background: 'red', width: width, height: height, top: top, left: left, boxSizing: 'border-box'}}>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("top",e)}
                        style={{width: '100%', height: '5px', position: 'absolute', top: 0, cursor: 's-resize'}}>
                    </div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("rigth",e)}
                        style={{height: '100%', width: '5px', position: 'absolute', top: 0, right: 0, cursor: 'e-resize'}}>
                    </div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("left",e)}
                        style={{height: '100%', width: '5px', position: 'absolute', top: 0, left: 0, cursor: 'e-resize'}}>
                    </div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> handleDragStart(e)}
                        onDrag={(e)=> handleDrag("bottom",e)}
                        style={{width: '100%', height: '5px', position: 'absolute',  bottom: 0, cursor: 's-resize'}}>
                    </div>
                    <div style={{height: '100%', width: '100%'}}>
                        {props.children}
                    </div>
                </div>
            </div>
        )
}

export default Resizable;