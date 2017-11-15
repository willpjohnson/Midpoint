import { markers } from '../entry';

const removeMarker = (item) => {
  let idx = getIndex(item);
  markers[idx].setMap(null);
  markers.splice(idx, 1);
  item.parentElement.removeChild(item);
}

const getIndex = (item) => {
  let list = item.parentElement.childNodes;
  let idx;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === item) idx = i;
  }
  return idx;
}

export default removeMarker;
