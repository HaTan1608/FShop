import React  from "react";
const ProductContents=({name,price})=>{
    const formate = (price)=>{
        return `${price}.000`;
    }
    return(
        <div className="cities__body__contents">
        <div className="cities__body__contents__top">
            <div className="cities__body__contents__top__name">{name}</div>
          
         </div> 
         <div className="cities__body__contents__price">
            {formate(price)}
            
            <span className="cities__body__contents__price__dollor">VNĐ</span>
         </div> 
        <div className="cities__body__contents__button">
            <button className='btn-dark-sm'>boy now</button>
        </div>
    </div> 
    )
}
export default ProductContents;