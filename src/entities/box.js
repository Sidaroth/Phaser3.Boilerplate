import getUUID from '../utils/getUUID';

export default class Box {
    id = 0;
    constructor() {
        this.id = getUUID();
    }
}
