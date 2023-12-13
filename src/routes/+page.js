/** @type {import('./$types').PageLoad} */
import {onMount} from 'svelte';

export const ssr = false


export function load() {
    let items  = [];
    //items = getItems();

    //dummy Items
    items = dummyItem()

    return {
        items
    };
}

async function getItems(){
    const response = await fetch('/api/items');
    const recievedf = await response.json();
    var items = recievedf;

    return items;
}

/** @return Promise<> */
function dummyItem() {
    var items = [];
    for (let i = 0; i < 1000; i++) {
            items.push({
        id: 1,
        unit: "Stk.",
        name: "Item 1",
        description: "This is item 1",
        price: 1.00,
        image: "https://placehold.co/250x250",
        category: "Category 1"
    },);
    }



    return items;
}