<script lang="ts">
    export let data;

    import "./+page.less"
</script>

<div id="itemholder">
    {#each data.items as item}
        <div class="item" on:click={
    () => {
        window.location.href = `/item/${item.id}`;
    }
    }>
            <img src="{item.image}" alt="Picture of {item.name}">
            <div id="item-text">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <p>{item.price} CHF / {item.unit}</p>
            </div>
        </div>
    {/each}
</div>
