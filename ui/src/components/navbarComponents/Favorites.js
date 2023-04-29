import React, { useState } from 'react';
import ChefCard from './ChefCard';


//authcontext ile düzenlenecek
const initialChefsData = [
  {
    id: 1,
    name: 'Chef 1',
    image:
      'https://www.themanual.com/wp-content/uploads/sites/9/2022/03/chef-tobais-dorzon.jpg?resize=1200%2C630&p=1',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Chef 2',
    image:
      'https://www.themanual.com/wp-content/uploads/sites/9/2022/03/chef-tobais-dorzon.jpg?resize=1200%2C630&p=1',
    rating: 3,
  },
  {
    id: 3,
    name: 'Chef 3',
    image:
      'https://www.themanual.com/wp-content/uploads/sites/9/2022/03/chef-tobais-dorzon.jpg?resize=1200%2C630&p=1',
    rating: 5,
  },
];

const Favorites = () => {
  const [chefsData, setChefsData] = useState(initialChefsData);

  const handleChefDelete = (chefId) => {
    setChefsData((prevChefsData) =>
      prevChefsData.filter((chef) => chef.id !== chefId)
    );
  };

  return (
    <div>
      {chefsData.map((chef) => (
        <ChefCard
          name={chef.name}
          image={chef.image}
          rating={chef.rating}
          key={chef.id}
          id={chef.id}
          onDelete={handleChefDelete}
        />
     
      ))}
         
    </div>
  );
};

export default Favorites;
