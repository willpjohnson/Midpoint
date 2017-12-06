const testLocations = [
  {address: "261 Moore St", city: "Brooklyn, NY", title: "Roberta's Pizza"},
  {address: "1 Front St", city: "Brooklyn, NY", title: "Grimaldi's Pizza"},
  {address: "60 Greenpoint Ave", city: "Brooklyn, NY", title: "Paulie Gee's"},
  {address: "1424 Avenue J", city: "Brooklyn, NY", title: "Di Fara Pizza"},
  {address: "4514 13th Avenue", city: "Brooklyn, NY", title: "Benny's Famous Pizza"},
  {address: "483 5th Avenue", city: "Brooklyn, NY", title: "Joe's Pizza of the Village"}
]

export const threeRandomLocations = () => {
  const size = testLocations.length;
  const idxCollection = [];
  while (idxCollection.length < 3) {
    let idx = Math.floor(Math.random() * size);
    if (!idxCollection.includes(idx)) idxCollection.push(idx);
  }

  return [testLocations[idxCollection[0]], testLocations[idxCollection[1]], testLocations[idxCollection[2]]];
}
