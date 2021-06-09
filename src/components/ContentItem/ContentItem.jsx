import React from 'react'
import style from './ContentItem.module.css'

const ContentItem = React.memo(
    ({name, image, status,species,gender,id}) => {
        return (<div className={style.itemWrapper}>
            <li>
                <img className={style.image} alt={'empty'} src={image}/>
                <ul className={style.infoWrapper}>
                   <li>  name: {name}</li>
                   <li>  status: {status}</li>
                   <li>   species: {species}</li>
                   <li>   gender: {gender}</li>
                   <li>   id: {id}</li>
                </ul>

            </li>


        </div>)


    }
)
export default ContentItem



