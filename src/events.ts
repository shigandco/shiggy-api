import EventEmitter from "./utils/EventEmitter";

export interface Events {
  UPDATE_SHIGGIES: [];
}

const emitter = new EventEmitter<Events>();

export default emitter;
