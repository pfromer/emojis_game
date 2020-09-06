export interface Icon {
    getName(): string;
}


// NOTE: this whole class is an implementation detail and is not exported
class IconImpl implements Icon {

    name: string;

    constructor(_name: string) {
        this.name = _name;
    }


    getName() {
        return this.name;
    }
}

// this is exported and is publicly available for creating Cats
export default function createIcon(name: string): Icon {
    return new IconImpl(name);
}