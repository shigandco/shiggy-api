import EventEmitter from "./utils/EventEmitter";

interface Events {
  UPDATE_SHIGGIES: [];
}

const emitter = new EventEmitter<Events>();

export default emitter;
