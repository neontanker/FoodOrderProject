import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useCallback, useEffect, useState } from "react";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMealHandler = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://react-http-c6a81-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          desc: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false)

      // setMeals(Object.keys(data).map((key) => (
      //   [Number(key), data[key]]
      // <MealItem
      //   id={key}
      //   name={data[key].name}
      //   desc={data[key].description}
      //   price={data[key].price}
      //   key={data[key].id}
      // />
      // )));
    } catch (error) {
      setError(error.message);
    }
  }, []);
  
  useEffect(() => {
    fetchMealHandler();
  }, [fetchMealHandler]);
  
  const mealList = meals.map((item) => (
    
    <MealItem
      id={item.id}
      name={item.name}
      desc={item.desc}
      price={item.price}
      key={item.id}
    />
  ));
  
  let content = "";
  
  if (!error && isLoading) {
    content = <p className={classes["loading-text"]}>Loading..</p>;
    
  } else if (error && isLoading) {
      content = <p className={classes.error}>{error}</p>;
      console.log(error)
  }
   else {
      content = <ul>{mealList}</ul>;
    }

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
