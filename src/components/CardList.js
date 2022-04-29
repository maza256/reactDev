import React from 'react';
import Card from './Card';

const CardList = ({ robots, type }) => {
    return (
        <div>
            {
            robots.map((user, index) => {
                return (<Card key={index} 
                     id={robots[index].id} 
                     name={robots[index].name} 
                     email={robots[index].email}
                     type={type}
                     />
                );
                })
            }
        </div>
    )
}

export default CardList;