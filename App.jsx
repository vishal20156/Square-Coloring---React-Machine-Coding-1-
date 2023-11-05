import { useEffect, useState } from "react";
import ReactDOM  from "react-dom/client";
let order = 0;

const App = () => {


    const getColor = (idx,idx1) =>{
        return boxState?.find((ele) => {
            return ele.idx === idx && ele.idx1 === idx1
        })?.isClicked
    }
    const getBoxes = (init="") => {
        
        let boxes = []
        
        if(init === "I") {
             ["0","1","2"].map((ele,idx) => {
                return ["0","1","1"].map((ele1,idx1)=> {
                    if(!(idx==1 && idx1 > 0)){
                        return boxes.push({idx,idx1,"isClicked":false,"order":0})
                    }
                })
            })
            return boxes;
        }
        else {
            return <div className="container"> 
            { ["0","1","2"].map((ele,idx) => {
              
                return <div  className="row">
                    {["0","1","2"].map((ele1,idx1) => {
                        if(idx==1 && idx1 > 0){
                            return <div></div>
                        }
                        
                       
                        return <div style={{backgroundColor:getColor(idx,idx1) ? "green" : ""}} onClick={() => clickHandler(idx,idx1)}className="col"></div>
        
                    })}
                    
                </div>
            }) }
        </div>
        
        }
        
    } 

    const [boxState,setBoxes] = useState(getBoxes("I"))

    useEffect(() => {
        const isAllClicked = boxState?.some((ele) => ele.isClicked === false)
        if(!isAllClicked) {
            
            //Mistake Review


            //Set Timeout is a async function so returning or not returning from callback DOES NOT MATTER
            boxState?.forEach((ele,idx) => {
                setTimeout(() => {
                let temp = [...boxState]

                //I was trying to modify the element but i should use index to modify temp and update the CURRENT STATE
                temp[idx].isClicked = false;
                setBoxes(temp)
               },1000 *(idx + 1))  // I took timer of 1000 + idx which was wrong so correct way is 1000 * idx + 1 to run it every 1000 sec to see difference
            })

        }   

    
       
    },[boxState])


    const clickHandler = (i,j) => {
        // Take a shallow copy of OG state
        let temp = [...boxState]

        //Find the object to change
        const findBox = temp.find((ele) => {   
            return ele.idx === i && ele.idx1 === j
        })
        
        //Change Object Properties
        findBox.isClicked = !findBox.isClicked
        findBox.order = ++order;

        temp.sort((a,b) => (a.order > b.order ? 1 : -1 ))
        //Note that the change we made above changed the temp arrays one of the object

        //Attch the temp object back to the state because we have made necessary updates.
        setBoxes(temp);
        
    } 
    return (
        getBoxes("")
    )

}




ReactDOM.createRoot(document.getElementById("root")).render(<App/>);