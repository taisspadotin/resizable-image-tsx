import React from 'react';
import { useState } from 'react';

function Element(props: any) {
    const [height, setHeight] = useState<number>(100)
    const [width, setWidth] = useState<number>(100)
    const [lastY, setLastY] = useState<number>(0)
    const [top, setTop] = useState<number>(50)
    
    const handleDrag = (op: string, e: any) => {
        let soma = 1;
        let sub = -1;
        
        console.log("e.clientY > lastY", e.clientY, lastY)

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
        /*else if(op === "rigth"){

        }*/
        else if(op === "top")
        {
            if(lastY !== 0 && e.clientY !== 0)
            {
                soma = lastY - e.clientY;
                sub = e.clientY - lastY;
            }
            console.log("soma", soma)
            console.log("sub", sub)
            if(e.clientY !== lastY && top > 0)
            {
                /*console.log("e.clientY", e.clientY)
                console.log("novo top", e.clientY < lastY ? (top - soma) : (top + sub))
                console.log("novo height", e.clientY < lastY ? (height + soma) : (height + sub))
                console.log("direção", e.clientY, lastY, top, soma, sub, height)*/
                //Valida se não foi arrastada pra fora da pagina (para cima).
                if(e.clientY < lastY ? (top + sub) : (top + sub) > 0)
                {
                    if(e.clientY < lastY){
                        setHeight(height + soma);
                    }
                    else{
                        console.log('HEIGHT', height + sub)
                        setHeight(height + soma);
                    }
                    
                    setTop(e.clientY < lastY ? (top - soma) : (top + sub));
                    setLastY(e.clientY);    
                }
            }
        }
        /*else if(op === "left"){

        }*/
    }

    const handleDragStart = async (e: any) => {
        e.dataTransfer.setData("text/plain", "");
        const img = await new Image();
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    return(
            <div style={{position: 'absolute', background: 'green', width: width, height: height, top: top}}>
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