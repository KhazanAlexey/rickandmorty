import ContentItem from '../ContentItem/ContentItem'
import React from 'react'


const ContentList = React.memo(

    ({content}) => {


        return (

            <ul>
                {content.map(con => <ContentItem key={con.id}
                                                 name={con.name}
                                                 image={con.image}
                                                 status={con.status}
                                                 species={con.species}
                                                 gender={con.gender}
                                                 id={con.id}
                />)}
            </ul>
        );
    }
)

export default ContentList;



