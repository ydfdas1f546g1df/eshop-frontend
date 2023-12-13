<script lang="ts">
    import {onMount} from 'svelte';


    let items = [];



    onMount(() => {

    });
</script>

{#each items as item}
    <div class-="item" on:click={
    () => {
        window.location.href = `/item/${item.id}`;
    }
    }>
        <img src="{item.thumbnailUrl}" alt="Picture of {item.name}">
        <h3>{item.name}</h3>
        <p>{item.category}</p>
    </div>
{/each}