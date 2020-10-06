import React, { useState, useEffect, useContext } from "react";

const FilterContext = React.createContext([{}, () => {}]);

const FilterProvider = (props) => {
  const [state, setState] = useState({
    active: false,
    epic: false,
  });
  return (
    <FilterContext.Provider value={[state, setState]}>
      {props.children}
    </FilterContext.Provider>
  );
};

const Items = ({ items }) => {
  const [state, setState] = useContext(FilterContext);
  const displayedItems = items
    .filter(
      (item) =>
        (state.active ? item.isActive : true) &&
        (state.epic ? item.isEpic : true)
    )
    .map((item) => <Item key={item._id} item={item} />);

  return (
    <section>
      <p>
        Showing {displayedItems.length} out of {items.length} available!
      </p>
      {displayedItems}
    </section>
  );
};

const Item = ({ item }) => (
  <div style={{ background: "#eee", padding: "1em", margin: "1em" }}>
    <p>{item.name}</p>
    <p>{item.email}</p>
    <p>{item.age}</p>
    <p>{item.registered}</p>
  </div>
);

const FilterSection = () => {
  const [active, setActive] = useState(false);
  const [epic, setEpic] = useState(false);

  const [state, setState] = useContext(FilterContext);

  useEffect(() => {
    setState({ active, epic });
  }, [active, epic]);

  return (
    <section>
      <h1>Filter stuff</h1>
      <form>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setActive(!active);
            }}
            checked={active}
          />
          Active
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setEpic(!epic);
            }}
            checked={epic}
          />
          Epic
        </label>
      </form>
    </section>
  );
};

export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/hello")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <section>
      <FilterProvider>
        <FilterSection />
        <Items items={items} />
      </FilterProvider>
    </section>
  );
}
