/** @type {import('./$types').PageLoad} */

export const ssr = false


export function load() {
    let items: {
        href: string;
        image: string;
        name: string;
        line1: string;
        line2: string;
    }[] = [];
    //items = getItems();

    //dummy Items
    items = mapItems(dummyItem())

    return {
        items
    };
}

async function getItems():Promise<{
    id: number;
    unit: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    categoryId: number;
}[]> {
    const response = await fetch('/api/items');
    const recievedf = await response.json();
    var items = recievedf;

    return items;
}

/** @return Promise<> */
function dummyItem(): {
    id: number;
    unit: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    categoryId: number;
}[] {
    var items = [];
    for (let i = 0; i < 1000; i++) {
        items.push({
            id: 1,
            unit: "Stk.",
            name: "Item 2",
            description: "This is item 1",
            price: 1.00,
            image: "https://placehold.co/250x250",
            category: "Category 1",
            categoryId: 1
        },);
    }


    return items;
}

function mapItems(items: {
    id: number;
    unit: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    categoryId: number;
}[]): {
    href: string;
    image: string;
    name: string;
    line1: string;
    line2: string;
}[] {

    let ret: {
        href: string;
        image: string;
        name: string;
        line1: string;
        line2: string;
    }[] = [];

    items.forEach(function (item) {
        ret.push(
            {
                href: "/item/"+item.id,
                image: item.image,
                name: item.name,
                line1: item.category,
                line2: item.price + " CHF / " + item.unit,
            }
        )
    })

    return ret;
}